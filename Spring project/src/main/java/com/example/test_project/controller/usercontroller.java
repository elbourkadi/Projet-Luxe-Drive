package com.example.test_project.controller;


import com.example.test_project.entities.CustomUserDetails;
import com.example.test_project.entities.User;
import com.example.test_project.entities.UserResponseDTO;
import com.example.test_project.jwtconfigtocken.JwtUtil;
import com.example.test_project.services.EmailService;
import com.example.test_project.services.userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

class JwtResponse {
    private final String jwt;
    private final String id;
    private final String email;
    private final String role;
    private String prenom;
    private String nom;
    private String image;
    private String successMessage;

    public JwtResponse(String jwt, String id, String email, String role) {
        this.jwt = jwt;
        this.id = id;
        this.email = email;
        this.role = role;
    }
    public String getSuccessMessage() {
        return successMessage;
    }

    public void setSuccessMessage(String successMessage) {
        this.successMessage = successMessage;
    }
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getJwt() {
        return jwt;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}


//    public String getJwt() {
//        return jwt;
//    }

@RestController
@RequestMapping("/api/auth")
public class usercontroller {
    @Autowired
    private userservice userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;


//    @PostMapping("/addUser")
//    public String addUser(@RequestBody User user) {
//        // Enregistrez l'utilisateur dans la base de données MongoDB
//        user.setValidated(false);  // Nouvelle ligne pour définir l'état de validation
//        userService.save(user);
//
//        // Générez le lien d'activation avec l'ID de l'utilisateur
//        String activationLink = "http://localhost:8093/api/auth/validateAccount/" + user.getId();
//
//        // Envoyez un e-mail de bienvenue avec le lien de validation
//        emailService.sendWelcomeEmail(user.getPrenom(), user.getEmail(), activationLink);
//
//        return "Utilisateur ajouté avec succès! Veuillez vérifier votre e-mail pour activer votre compte.";
//    }




    @PostMapping("/signup")
    public ResponseEntity<JwtResponse> signUp(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body(new JwtResponse("Email is already taken", null, "", ""));
        }

        String role = (user.getRole() == null || user.getRole().isEmpty()) ? "user" : user.getRole();
        user.setRole(role);

        // Enregistrez l'utilisateur dans la base de données MongoDB
        user.setValidated(false);  // Nouvelle ligne pour définir l'état de validation
        userService.save(user);

        // Générez le lien d'activation avec l'ID de l'utilisateur
        String activationLink = "http://localhost:8093/api/auth/validateAccount/" + user.getId();

        // Envoyez un e-mail de bienvenue avec le lien de validation
        emailService.sendWelcomeEmail(user.getPrenom(), user.getEmail(), activationLink);

        // Générez le token JWT après l'enregistrement et l'envoi de l'e-mail
        final UserDetails userDetails = userService.loadUserByUsername(user.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        JwtResponse response = new JwtResponse(jwt, null, "", role); // Utilisation du rôle défini

        // Ajoutez le message dans le corps de la réponse JSON
        String successMessage = "Utilisateur ajouté avec succès! Veuillez vérifier votre e-mail pour activer votre compte.";
        response.setSuccessMessage(successMessage);

        return ResponseEntity.ok(response);
    }



    @GetMapping("/validateAccount/{userId}")
    public ResponseEntity<String> validateAccount(@PathVariable String userId) {

        Optional<User> userOptional = userService.getUserById(new BigInteger(userId));

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setValidated(true);
            userService.updateUser(user);
            return ResponseEntity.ok("Votre compte a été validé avec succès. Vous pouvez maintenant accéder à votre compte.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> signIn(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            UserDetails userDetails = userService.loadUserByUsername(user.getEmail());

            if (!((CustomUserDetails) userDetails).isValidated()) {
                // User account is not validated
                String errorMessage = "Veuillez activer votre compte en vérifiant votre e-mail.";
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse(errorMessage, null, "", ""));
            }

            String jwt = jwtUtil.generateToken(userDetails);
            String role = getUserRole(userDetails);
            String username = userDetails.getUsername();
            String userId = ((CustomUserDetails) userDetails).getId();

            String prenom = ((CustomUserDetails) userDetails).getPrenom();
            String nom = ((CustomUserDetails) userDetails).getNom();
            String image = ((CustomUserDetails) userDetails).getImage();

            JwtResponse response = new JwtResponse(jwt, userId, username, role);
            response.setPrenom(prenom);
            response.setNom(nom);
            response.setImage(image);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            String errorMessage = "Invalid email or password";
            return ResponseEntity.badRequest().body(new JwtResponse(errorMessage, null, "", ""));
        }
    }




//    @PostMapping("/signin")
//    public ResponseEntity<JwtResponse> signIn(@RequestBody User user) {
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
//            );
//
//            UserDetails userDetails = userService.loadUserByUsername(user.getEmail());
//            String jwt = jwtUtil.generateToken(userDetails);
//            String role = getUserRole(userDetails);
//            String username = userDetails.getUsername();
//            String userId = ((CustomUserDetails) userDetails).getId();
//
//            String prenom = ((CustomUserDetails) userDetails).getPrenom();
//            String nom = ((CustomUserDetails) userDetails).getNom();
//            String image = ((CustomUserDetails) userDetails).getImage(); // Récupération de l'image
//
//
//            JwtResponse response = new JwtResponse(jwt, userId, username, role);
//            response.setPrenom(prenom);
//            response.setNom(nom);
//            response.setImage(image); // Utilisation de setImage() pour assigner l'image
//            return ResponseEntity.ok(response);
//        } catch (BadCredentialsException e) {
//            String errorMessage = "Invalid email or password";
//            return ResponseEntity.badRequest().body(new JwtResponse("Invalid email or password", null, "", ""));
//        }
//    }


    private String getUserRole(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null);
    }


    private Long getUserId(UserDetails userDetails) {

        return null;

}

    @PutMapping("/updateuser/{id}")
    public ResponseEntity<String> updateUser(@PathVariable BigInteger id, @RequestBody User updateUser) {
        Optional<User> existingUserOptional = userService.getUserById(id);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            // Mettre à jour les champs du user
            if (updateUser.getNom() != null) {
                existingUser.setNom(updateUser.getNom());
            }

            if (updateUser.getPrenom() != null) {
                existingUser.setPrenom(updateUser.getPrenom());
            }

            if (updateUser.getAddress() != null) {
                existingUser.setAddress(updateUser.getAddress());
            }

            if (updateUser.getTelephone() != null) {
                existingUser.setTelephone(updateUser.getTelephone());
            }

            if (updateUser.getEmail() != null) {
                existingUser.setEmail(updateUser.getEmail());
            }

            if (updateUser.getPassword() != null) {
                existingUser.setPassword(updateUser.getPassword());
            }

            userService.updateUser(existingUser); // Appel de la méthode updateUser du service
            String successMessage = "User updated successfully";
            return ResponseEntity.ok().body("{\"message\":\"" + successMessage + "\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/deleteuser/{id}")
    public void deleteUser(@PathVariable BigInteger id) {
        userService.deleteUser(id);
    }
    @GetMapping("/getallusers")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserResponseDTO> userDTOs = convertUsersToResponseDTOs(users);
        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/getuser/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable BigInteger id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            UserResponseDTO userDTO = convertUserToResponseDTO(user.get());
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    private UserResponseDTO convertUserToResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId().toString(),
                user.getNom(),
                user.getPrenom(),
                user.getAddress(),
                user.getTelephone(),
                user.getEmail(),
                user.getRole(),
                user.getImage()
        );
    }

    private List<UserResponseDTO> convertUsersToResponseDTOs(List<User> users) {
        return users.stream()
                .map(this::convertUserToResponseDTO)
                .collect(Collectors.toList());
    }


class ErrorResponse {
    private int status;
    private String message;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }


}}





package com.example.test_project.configuration;


import com.example.test_project.services.userservicelmlp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private userservicelmlp userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/auth/signup", "/api/auth/signin","/addagence","/updateagence/{id}","/deleteagence/{id}","/getagence/{id}","/getallagences","/addvoiture","/updatevoiture/{id}","/deletevoiture/{id}","/getallvoitures","/getvoiture/{id}","/api/auth/getallusers","/api/auth/getuser/{id}","/api/auth/deleteuser/{id}","/api/auth/updateuser/{id}","/addreservation","/updatereservation/{id}","/deletereservation/{id}","/getallreservations","/getreservation/{id}","/getreservationsbyuser/{userId}","/addmessage","/updatemessage/{id}","/deletemessage/{id}","/getallmessages","/getmessage/{id}","/updatestatus/{id}","/api/auth/validateAccount/{userId}","/markasimportant/{id}").permitAll() // Endpoints to register/signup and signin
                .anyRequest().authenticated()
                .and().httpBasic();

    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}



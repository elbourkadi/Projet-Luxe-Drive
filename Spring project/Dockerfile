# Utiliser l'image de base avec Java
FROM openjdk:19

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR de l'application Spring Boot
COPY ./Spring project/Spring project.jar .

# Exposer le port 5000 pour l'application Spring Boot
EXPOSE 5000

# Commande pour démarrer l'application Spring Boot
CMD ["java", "-jar", "Spring project.jar"]

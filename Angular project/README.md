# Luxe Drive
Luxe Drive est une application web conçue pour simplifier la gestion des agences de location de voitures. Cette plateforme offre des fonctionnalités étendues pour les administrateurs et les clients, garantissant une expérience fluide de location de voitures.

## Fonctionnalités

### Côté Administrateur :
L'espace administrateur de Luxe Drive offre une interface robuste et intuitive permettant aux administrateurs de gérer efficacement toutes les opérations liées à la location de voitures. Voici un aperçu des fonctionnalités offertes côté administrateur :
#### 1. Tableau de bord
Un tableau de bord centralisé offrant une vue d'ensemble des opérations clés, y compris les réservations en cours, les revenus, et d'autres indicateurs pertinents.
#### 2. Gestion des comptes
- Créer les comptes et attribuer des rôles et des droits d'accès spécifiques à chaque compte.
- Consulter la liste des comptes.
- Mettre à jour ou supprimer les informations personnelles pour chaque compte.
#### 3. Gestion des agences
- Ajouter une agence.
- Consulter la liste des agences.
- Mettre à jour ou supprimer les informations clés de chaque agence.
#### 4. Gestion des véhicules
- Ajouter une voiture.
- Consulter la liste des voitures disponibles à la location.
- Mettre à jour ou supprimer des détails sur chaque voiture.
#### 5. Gestion des réservations
- Consulter la liste des pré-réservations des clients.
- Mettre à jour ou supprimer des détails sur chaque pré-réservation.
- Consulter la liste des réservations confirmées par les clients et changer le statut de chacune.
#### 6. Boîte de réception
- Voir tous les messages envoyés par les clients.
- Marquer les messages reçus comme lus, non lus ou traités, permettant une gestion efficace des tâches à accomplir.

### Côté Client :
L'espace client de Luxe Drive offre une expérience intuitive et conviviale pour les utilisateurs qui souhaitent explorer, réserver et gérer leurs locations de voitures de luxe. Voici un aperçu des fonctionnalités offertes côté client :
#### 1. Page d'accueil
Une page d'accueil offrant une vue d'ensemble attrayante des services de Luxe Drive et permettant une navigation rapide vers les fonctionnalités clés de l'application web.
#### 2. Réservations
Une section dédiée permet aux clients de découvrir la flotte de voitures disponibles avec des détails sur chaque modèle, et de réserver facilement une voiture en sélectionnant les dates, heures, et préférences.
#### 3. Agences
Une liste détaillée affiche toutes les agences Luxe Drive avec les informations clés de chacune, permettant aux clients de choisir l'emplacement le plus pratique.
#### 4. Contact
Une section offrant aux clients un moyen simple et efficace de communiquer avec l'équipe Luxe Drive pour des questions, des demandes spéciales ou toute autre assistance.
#### 5. Profil
Un espace personnalisé des clients, offrant des fonctionnalités pour une gestion aisée de leur compte et de leurs réservations. Les clients peuvent mettre à jour leurs coordonnées et consulter un historique complet des réservations passées.

## Architecture de l'application
L'architecture de Luxe Drive repose sur une approche orientée service, où chaque composant fonctionne comme un service indépendant. Cette structure assure une expérience utilisateur optimale, une maintenance facile et une adaptabilité aux besoins changeants de l'industrie de la location de voitures.
### Côté Front-end :
L'interface utilisateur de Luxe Drive est développée en utilisant Angular, un framework JavaScript robuste. Cette solution offre une navigation fluide et réactive pour les utilisateurs, facilitant également les mises à jour et les évolutions nécessaires au fil du temps.
### Côté Back-end :
La partie backend est composée de deux parties :
#### 1. Backend Spring Boot (Gestion Métier)
Le composant principal du backend, construit avec Spring Boot en Java, intègre des outils tels que Spring Security, Spring Data, et Spring Web Services. Il gère la logique métier de l'application, incluant la gestion des comptes, des agences, des véhicules et des réservations. La base de données MongoDB assure une gestion efficace des données.
#### 2. Backend Flask (Analyse de Données)
Un composant secondaire, développé en Python avec Flask, englobe les mécanismes de l'analyse des données de l'application. Il interagit avec le backend Spring Boot pour fournir des insights exploitables à partir des données de gestion.
### Pratiques DevOps :
Afin d'optimiser le développement et le déploiement de l'application web Luxe Drive, les bons pratiques DevOps sont intégrées de manière méthodique.
#### 1. Mise en conteneurs avec Docker
Cette approche simplifie le déploiement en encapsulant les applications et assure une gestion cohérente des environnements, contribuant ainsi à maintenir la stabilité tout au long du cycle de développement.
#### 2. Orchestration via Kubernetes 
Cette orchestration automatisée permet une mise à l'échelle fluide, une répartition efficace des charges, et une gestion optimale des ressources.
#### 3. Contrôle de version avec Git
Ce qui permet de faciliter la collaboration au sein de l'équipe de développement en offrant un suivi clair des modifications et une résolution efficiente des conflits de code.
### Sécurisation de l'application :

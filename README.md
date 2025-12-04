# SportBooking Casa - Plateforme de Réservation de Terrains de Sport

Une plateforme web simple et intuitive pour réserver des terrains de sport à Casablanca.

## Description

SportBooking Casa est une solution web qui permet aux résidents de Casablanca de trouver et réserver facilement des terrains de sport. La plateforme couvre les sports les plus populaires : Football, Basketball, Volleyball, Tennis et Paddle.

## Fonctionnalités

### Pour les utilisateurs
- **Recherche et filtrage** : Recherche par nom, filtre par sport, quartier et prix
- **Détails des terrains** : Informations complètes sur chaque terrain (adresse, équipements, avis)
- **Réservation en ligne** : Sélection de date et heure avec vérification de disponibilité en temps réel
- **Confirmation** : Page de confirmation avec détails de la réservation et code QR

### Pour les propriétaires
- **Tableau de bord** : Statistiques (réservations totales, revenus, réservations à venir)
- **Gestion des réservations** : Liste complète avec possibilité de confirmer ou annuler
- **Calendrier** : Vue mensuelle des réservations
- **Paramètres** : Modification des informations du terrain (nom, prix, horaires)

## Structure du Projet

```
Website/
├── index.html              # Page d'accueil avec liste des terrains
├── venue-detail.html       # Page de détails et réservation
├── booking-confirmation.html # Page de confirmation
├── owner-dashboard.html    # Tableau de bord propriétaire
├── css/
│   ├── style.css          # Styles principaux
│   └── responsive.css     # Styles responsives
├── js/
│   ├── data.js            # Données des terrains et fonctions utilitaires
│   ├── main.js            # Logique de la page d'accueil
│   ├── venue-detail.js    # Logique de réservation
│   ├── booking.js         # Logique de confirmation
│   └── dashboard.js       # Logique du tableau de bord
└── README.md
```

## Technologies Utilisées

- **HTML5** : Structure des pages
- **CSS3** : Styles et design responsive
- **JavaScript (Vanilla)** : Fonctionnalités interactives
- **localStorage** : Stockage local des réservations et paramètres

## Installation et Utilisation

1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans un navigateur web moderne
3. Aucune installation supplémentaire n'est requise

## Fonctionnalités Techniques

### Stockage des Données
- Les réservations sont stockées dans le `localStorage` du navigateur
- Les paramètres des propriétaires sont également sauvegardés localement
- Les données des terrains sont définies dans `js/data.js`

### Disponibilité en Temps Réel
- Vérification automatique des conflits de réservation
- Affichage visuel des créneaux disponibles/occupés
- Prévention des doubles réservations

### Design Responsive
- Interface adaptée aux écrans mobiles, tablettes et ordinateurs
- Navigation intuitive sur tous les appareils

## Données de Démonstration

Le projet inclut 15 terrains de démonstration répartis dans différents quartiers de Casablanca :
- Maarif, Anfa, Ain Diab, Hay Riad, Sidi Maarouf
- Bourgogne, Oasis, Sidi Bernoussi, California
- Belvédère, Les Almohades

Chaque terrain inclut :
- Informations complètes (adresse, téléphone, horaires)
- Sports disponibles
- Prix par heure (100-300 MAD)
- Avis clients
- Équipements disponibles

## Améliorations Futures

- Intégration d'une base de données réelle
- Système d'authentification utilisateur
- Paiement en ligne
- Notifications par email/SMS
- Application mobile
- Support multilingue (Arabe/Français)
- Système de notation et avis utilisateurs
- Recherche avancée avec géolocalisation

## Auteur

Développé dans le cadre du projet Entrepreneuriat - M1 S3

## Licence

Ce projet est fourni à des fins éducatives et de démonstration.



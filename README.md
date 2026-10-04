# laBonneSalle - Frontend

Ce dépôt contient l'application cliente Web du projet **laBonneSalle**, développée en **React (TypeScript)** avec **Tailwind CSS**. 

> 💡 **Historique du dépôt** : Le projet a initialement été démarré en équipe sur un dépôt dédié, puis repris, forké et complété dans ce dépôt afin d'ajouter et finaliser l'ensemble des fonctionnalités de gestion (utilisateurs, salles, réservations, rôles et routes protégées).

---

## 🛠️ Stack Technique

- **Framework** : [React](https://react.dev/) (avec TypeScript)
- **Routage** : [React Router](https://reactrouter.com/) (v7)
- **Gestion des Formulaires & Validations** : 
  - `react-hook-form`
  - `zod` & `@hookform/resolvers/zod`
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Gestion d'état global** : React Context API (`UserContext`, `RoomContext`, `ReservationContext`) & Providers

---

## 📌 Fonctionnalités Principales

### 🔐 Authentification & Gestion des Rôles
- **Connexion** (`/login`) avec validation des identifiants et récupération du rôle utilisateur (`Administrateur`, `Formateur`, `Apprenant`).
- **Création de compte** (`/signin`) avec vérification préalable de la disponibilité de l'email via Zod.
- **Espace Tableau de bord** (`/dashboard/:role`) adapté dynamiquement selon le rôle de l'utilisateur connecté.
- **Routes Protégées** (`ProtectedRoute`) pour sécuriser l'accès aux pages restreintes.

### 🏢 Gestion des Salles (Rooms)
- **Consultation de la liste** (`/rooms`) via des cartes interactives (`RoomCard`).
- **Création de salle** (`/rooms/newroom`) avec contrôle de la capacité et du nom.
- **Mise à jour et suppression** (`/rooms/:id`) pour modifier dynamiquement la capacité ou supprimer une salle.

### 📅 Gestion des Réservations
- **Création d'une réservation** (`/createreservation`) avec sélection de la salle, du créneau (début/fin) et contrôle d'accès selon les droits utilisateur.
- **Affichage des réservations** (`/viewreservation` / `/reservations`) avec gestion des filtres.
- **Modification/Annulation** (`/reservations/:id`) pour ajuster ou supprimer un créneau réservé.

### 👥 Gestion des Utilisateurs
- **Visualisation des comptes** (`/users`) sous forme de grille.
- **Édition du profil** (`/users/:id`) pour mettre à jour les informations d'un utilisateur.

---

## 🚀 Installation et Lancement

### 1. Prérequis
S'assurer d'avoir **Node.js** (v18+) et **npm** (ou yarn) installés sur votre machine.

### 2. Cloner le projet

### 3. Installer les dépendances
npm install

### 4. Lancer l'API Backend
L'application consomme l'API REST backend. Assurez-vous que le serveur backend (laBonneSalle-backend) tourne sur http://localhost:3000.

### 5. Démarrer le serveur de développement
npm run dev
L'application sera accessible par défaut sur http://localhost:5173.

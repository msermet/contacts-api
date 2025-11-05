# API Contacts

API REST simple pour gérer des contacts avec Node.js et TypeScript.

## Installation

```bash
npm install
```

## Commandes disponibles

### Développement

```bash
npm run dev
```
Lance le serveur en mode développement avec rechargement automatique.

### Tests

```bash
npm test
```
Lance la suite de tests avec Vitest.

### Build

```bash
npm run build
```
Compile le TypeScript en JavaScript.

### Production

```bash
npm start
```
Lance le serveur en production (nécessite `npm run build` avant).

## Endpoints

### GET /
Retourne un message de bienvenue.

### GET /contacts
Retourne la liste de tous les contacts.

### GET /contacts/:id
Retourne un contact par son ID.

### POST /contacts
Crée un nouveau contact.

**Body (JSON):**
```json
{
  "nom": "John Doe",
  "tel": "0612345678"
}
```

### DELETE /contacts/:id
Supprime un contact par son ID.

## Structure du projet

```
contacts-api/
├── src/
│   ├── main.ts              # Point d'entrée
│   ├── server.ts            # Configuration du serveur
│   ├── server.test.ts       # Tests du serveur
│   ├── contactService.ts    # Logique métier
│   └── contacts.json        # Données
├── requests.http            # Tests HTTP
├── vitest.config.ts         # Configuration Vitest
├── tsconfig.json            # Configuration TypeScript
└── package.json
```

## Technologies utilisées

- Node.js
- TypeScript
- Vitest (tests)
- Supertest (tests HTTP)
- ts-node-dev (développement)

import {getAllContacts, getContactById, createContact, deleteContact, contacts} from "./contactService";
import { logger } from "./logger";

const express = require('express')
const app = express()
app.use(express.json());

app.get('/', (request, response) => {
    logger.info({ method: request.method, url: request.url }, 'Route appelée: GET /');
    response.json({message:'Hello World'})
})

app.get('/contacts', (request, response) => {
    logger.info({ method: request.method, url: request.url }, 'Route appelée: GET /contacts');
    response.json({contacts: getAllContacts()})
})

app.get('/contacts/:id', (request, response) => {
    logger.info({ method: request.method, url: request.url, params: request.params }, 'Route appelée: GET /contacts/:id');
    const id = Number(request.params.id);
    if (isNaN(id)) {
        logger.error({ id: request.params.id }, 'Erreur: ID invalide');
        return response.status(400).json({error: "ID invalide"});
    }
    const contact = getContactById(id);
    if (!contact) {
        logger.error({ id }, 'Erreur: Contact non trouvé');
        return response.status(404).json({error: "Contact non trouvé"});
    }
    response.json({contact})
})

app.post('/contacts', (request, response) => {
    logger.info({ method: request.method, url: request.url, body: request.body }, 'Route appelée: POST /contacts');
    const {nom,tel} = request.body;
    if (!nom || !tel) {
        logger.error({ body: request.body }, 'Erreur: Champs nom ou tel manquants');
        return response.status(400).json({error: "Les champs 'nom' et 'tel' sont requis"});
    }

    const contactExistant = contacts.find(c => c.tel === tel);
    if (contactExistant) {
        logger.error({ tel }, 'Erreur: Contact avec ce numéro existe déjà');
        return response.status(409).json({error: "Un contact avec ce numéro existe déjà"});
    }

    const newContact = createContact(nom,tel);
    logger.info({ contact: newContact }, 'Contact créé avec succès');
    response.status(201).json({contact: newContact});
})

app.delete("/contacts/:id", (request, response) => {
    logger.info({ method: request.method, url: request.url, params: request.params }, 'Route appelée: DELETE /contacts/:id');
    const id = Number(request.params.id);
    if (isNaN(id)) {
        logger.error({ id: request.params.id }, 'Erreur: ID invalide');
        return response.status(400).json({ error: "ID invalide" });
    }

    const deleted = deleteContact(id);
    if (!deleted) {
        logger.error({ id }, 'Erreur: Contact non trouvé pour suppression');
        return response.status(404).json({ error: "Contact non trouvé" });
    }

    logger.info({ id }, 'Contact supprimé avec succès');
    response.json({ message: "Contact supprimé avec succès" });
});

app.all("/contacts/:id", (request, response) => {
    logger.error({ method: request.method, url: request.url }, 'Erreur: Méthode non autorisée sur /contacts/:id');
    response.status(405).json({ error: "Méthode non autorisée" });
});

app.all("/contacts", (request, response) => {
    logger.error({ method: request.method, url: request.url }, 'Erreur: Méthode non autorisée sur /contacts');
    response.status(405).json({ error: "Méthode non autorisée" });
});

app.use((request, response) => {
    logger.error({ method: request.method, url: request.url }, 'Erreur: Route non trouvée');
    response.status(404).json({ error: "Route non trouvée" });
});

app.use((err: any, request: any, response: any, next: any) => {
    logger.error({
        error: err.message,
        stack: err.stack,
        method: request.method,
        url: request.url
    }, 'Erreur interne du serveur');
    response.status(err.status || 500).json({
        error: err.message || "Erreur interne du serveur"
    });
});

export const server = app;
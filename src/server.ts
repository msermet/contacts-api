import {getAllContacts, getContactById, createContact, deleteContact, contacts} from "./contactService";

const express = require('express')
const app = express()
app.use(express.json());

app.get('/', (request, response) => {
    response.json({message:'Hello World'})
})

app.get('/contacts', (request, response) => {
    response.json({contacts: getAllContacts()})
})

app.get('/contacts/:id', (request, response) => {
    const id = Number(request.params.id);
    if (isNaN(id)) {
        return response.status(400).json({error: "ID invalide"});
    }
    const contact = getContactById(id);
    if (!contact) {
        return response.status(404).json({error: "Contact non trouvé"});
    }
    response.json({contact})
})

app.post('/contacts', (request, response) => {
    const {nom,tel} = request.body;
    if (!nom || !tel) {
        return response.status(400).json({error: "Les champs 'nom' et 'tel' sont requis"});
    }
    const newContact = createContact(nom,tel);
    response.status(201).json({contact: newContact});
})

app.delete("/contacts/:id", (request, response) => {
    const id = Number(request.params.id);
    if (isNaN(id)) {
        return response.status(400).json({ error: "ID invalide" });
    }

    const deleted = deleteContact(id);
    if (!deleted) {
        return response.status(404).json({ error: "Contact non trouvé" });
    }

    response.json({ message: "Contact supprimé avec succès" });
});



export const server = app;
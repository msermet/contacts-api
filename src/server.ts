import express from "express";
import { getAllContacts, getContactById, createContact, deleteContact } from "./contactService";

const app = express();

app.use(express.json());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ error: "JSON invalide" });
    }
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.get("/contacts", (req, res) => {
    const all = getAllContacts();
    res.json({ contacts: all });
});

app.get("/contacts/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalide" });
    }

    const contact = getContactById(id);
    if (!contact) {
        return res.status(404).json({ error: "Contact non trouvé" });
    }

    res.json({ contact });
});

app.post("/contacts", (req, res) => {
    const { nom, tel } = req.body;

    if (!nom || !tel) {
        return res.status(400).json({ error: "Les champs 'nom' et 'tel' sont requis" });
    }

    const newContact = createContact(nom, tel);
    res.status(201).json({ contact: newContact });
});

app.delete("/contacts/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invalide" });
    }

    const deleted = deleteContact(id);
    if (!deleted) {
        return res.status(404).json({ error: "Contact non trouvé" });
    }

    res.json({ message: "Contact supprimé avec succès" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Not Found", path: req.path });
});

export const server = app;
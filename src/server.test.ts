import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { server } from "./server";
import { contacts } from "./contactService";

describe("API Contacts", () => {
    beforeEach(() => {
        contacts.length = 0;
        contacts.push(
            { id: 1, nom: "Alice Martin", tel: "0601020304" },
            { id: 2, nom: "Bob Dupont", tel: "0605060708" },
            { id: 3, nom: "Claire Dubois", tel: "0609101112" }
        );
    });

    describe("GET /", () => {
        it("retourne Hello World", async () => {
            const response = await request(server).get("/");
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Hello World" });
        });
    });

    describe("GET /contacts", () => {
        it("retourne tous les contacts", async () => {
            const response = await request(server).get("/contacts");
            expect(response.status).toBe(200);
            expect(response.body.contacts).toHaveLength(3);
        });
    });

    describe("GET /contacts/:id", () => {
        it("retourne un contact existant", async () => {
            const response = await request(server).get("/contacts/1");
            expect(response.status).toBe(200);
            expect(response.body.contact).toEqual({
                id: 1,
                nom: "Alice Martin",
                tel: "0601020304"
            });
        });

        it("retourne 404 pour un contact inexistant", async () => {
            const response = await request(server).get("/contacts/999");
            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Contact non trouvé");
        });

        it("retourne 400 pour un ID invalide", async () => {
            const response = await request(server).get("/contacts/abc");
            expect(response.status).toBe(400);
            expect(response.body.error).toBe("ID invalide");
        });
    });

    describe("POST /contacts", () => {
        it("crée un nouveau contact", async () => {
            const response = await request(server)
                .post("/contacts")
                .send({ nom: "Emma Dubois", tel: "0600000005" });

            expect(response.status).toBe(201);
            expect(response.body.contact).toMatchObject({
                nom: "Emma Dubois",
                tel: "0600000005"
            });
            expect(response.body.contact.id).toBeDefined();
        });

        it("retourne 400 si le nom est manquant", async () => {
            const response = await request(server)
                .post("/contacts")
                .send({ tel: "0600000006" });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Les champs 'nom' et 'tel' sont requis");
        });

        it("retourne 400 si le téléphone est manquant", async () => {
            const response = await request(server)
                .post("/contacts")
                .send({ nom: "Jean Martin" });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Les champs 'nom' et 'tel' sont requis");
        });

        it("retourne 400 pour un JSON invalide", async () => {
            const response = await request(server)
                .post("/contacts")
                .set("Content-Type", "application/json")
                .send("invalid json");

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("JSON invalide");
        });
    });

    describe("DELETE /contacts/:id", () => {
        it("supprime un contact existant", async () => {
            const response = await request(server).delete("/contacts/2");
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Contact supprimé avec succès");

            const getResponse = await request(server).get("/contacts");
            expect(getResponse.body.contacts).toHaveLength(2);
        });

        it("retourne 404 pour un contact inexistant", async () => {
            const response = await request(server).delete("/contacts/999");
            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Contact non trouvé");
        });

        it("retourne 400 pour un ID invalide", async () => {
            const response = await request(server).delete("/contacts/abc");
            expect(response.status).toBe(400);
            expect(response.body.error).toBe("ID invalide");
        });
    });

    describe("Routes inexistantes", () => {
        it("retourne 404 pour une route inconnue", async () => {
            const response = await request(server).get("/api/unknown");
            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Not Found");
        });
    });
});

import { describe, it, expect, beforeEach } from "vitest";
import { contacts, getAllContacts, getContactById, createContact, deleteContact } from "./contactService";

describe("Contact Service", () => {
    beforeEach(() => {
        contacts.length = 0;
        contacts.push(
            { id: 1, nom: "Alice Martin", tel: "0601020304" },
            { id: 2, nom: "Bob Dupont", tel: "0605060708" },
            { id: 3, nom: "Claire Dubois", tel: "0609101112" }
        );
    });

    describe("getAllContacts", () => {
        it("retourne tous les contacts", () => {
            const result = getAllContacts();
            expect(result).toHaveLength(3);
            expect(result[0].nom).toBe("Alice Martin");
        });

        it("retourne un tableau vide si aucun contact", () => {
            contacts.length = 0;
            const result = getAllContacts();
            expect(result).toHaveLength(0);
        });
    });

    describe("getContactById", () => {
        it("retourne un contact existant", () => {
            const contact = getContactById(1);
            expect(contact).toBeDefined();
            expect(contact?.nom).toBe("Alice Martin");
            expect(contact?.tel).toBe("0601020304");
        });

        it("retourne undefined pour un contact inexistant", () => {
            const contact = getContactById(999);
            expect(contact).toBeUndefined();
        });

        it("retourne undefined pour un ID négatif", () => {
            const contact = getContactById(-1);
            expect(contact).toBeUndefined();
        });
    });

    describe.only("createContact", () => {
        it("crée un nouveau contact avec un ID incrémental", () => {
            const newContact = createContact("David Leroy", "0612345678");
            expect(newContact.id).toBe(4);
            expect(newContact.nom).toBe("David Leroy");
            expect(newContact.tel).toBe("0612345678");
        });

        it("ajoute le contact à la liste", () => {
            const initialLength = contacts.length;
            createContact("Emma Dubois", "0600000005");
            expect(contacts.length).toBe(initialLength + 1);
        });

        it("génère l'ID 1 si la liste est vide", () => {
            contacts.length = 0;
            const newContact = createContact("Premier Contact", "0600000001");
            expect(newContact.id).toBe(1);
        });
    });

    describe("deleteContact", () => {
        it("supprime un contact existant", () => {
            const result = deleteContact(2);
            expect(result).toBe(true);
            expect(contacts.length).toBe(2);
            expect(getContactById(2)).toBeUndefined();
        });

        it("retourne false pour un contact inexistant", () => {
            const result = deleteContact(999);
            expect(result).toBe(false);
            expect(contacts.length).toBe(3);
        });

        it("ne modifie pas la liste si le contact n'existe pas", () => {
            const initialLength = contacts.length;
            deleteContact(999);
            expect(contacts.length).toBe(initialLength);
        });
    });
});
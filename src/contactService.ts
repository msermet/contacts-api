import contactsData from "./contacts.json";

export type Contact = { id: number; nom: string; tel: string };

export const contacts: Contact[] = contactsData;

export function getAllContacts(): Contact[] {
    return contacts;
}

export function getContactById(id: number): Contact | undefined {
    return contacts.find(c => c.id === id);
}

export function createContact(nom: string, tel: string): Contact {
    const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    const newContact: Contact = { id: newId, nom, tel };
    contacts.push(newContact);
    return newContact;
}

export function deleteContact(id: number): boolean {
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) {
        return false;
    }
    contacts.splice(index, 1);
    return true;
}
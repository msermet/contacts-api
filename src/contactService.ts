import contactsData from "./contacts.json";

export type Contact = { id: number; nom: string; tel: string };

export const contacts: Contact[] = contactsData;

export function getAllContacts(): Contact[] {
    return contacts;
}

export function getContactById(id: number): Contact | undefined {
    return contacts.find(c => c.id === id);
}
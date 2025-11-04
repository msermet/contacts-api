export const contacts = [
    { id: 1, nom: "Alice Dupont", tel: "0600000001" },
    { id: 2, nom: "Bob Martin", tel: "0600000002" },
    { id: 3, nom: "Charlie Leroy", tel: "0600000003" },
];

export function getAllContacts() {
    return contacts;
}

export function getContactById(id: number) {
    return contacts.find(contact => contact.id === id);
}

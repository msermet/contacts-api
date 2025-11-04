import http from "http";
import { URL } from "url";
import { getAllContacts } from "./contacts";
import { getContactById } from "./contacts";

const PORT = 3000;

const server = http.createServer((req, res) => {
    const method = req.method || "GET";
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const path = url.pathname;

    if (method === "GET" && path === "/") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ message: "Hello World" }));
        return;
    }

    if (method === "GET" && path === "/contacts") {
        const all = getAllContacts();
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ contacts: all }));
        return;
    }

    if (method === "GET" && path.startsWith("/contacts/")) {
        const parts = path.split("/");
        const idString = parts[2];

        const id = Number(idString);
        if (isNaN(id)) {
            res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ error: "ID invalide" }));
            return;
        }

        const contact = getContactById(id);
        if (!contact) {
            res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ error: "Contact non trouvé" }));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ contact }));
        return;
    }

    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Not Found", path }));
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

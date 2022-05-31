import clientsService from "../services/clients.service.js";
import * as client from "./base-clients.js";

/**
 * Renders the clients table
 */
function renderClientsTable() {
    const existentClients = clientsService.getClients() ?? [];
    client.renderTableBody(existentClients);
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */
function saveClient(e) {
    e.preventDefault();
    const existentClients = clientsService.getClients() ?? [];
    const client = client.getNewClient(e, existentClients.length);
    clientsService.saveClient(client);
    renderClientsTable();
}

client.addEditClientForm.addEventListener("submit", saveClient);
renderClientsTable();

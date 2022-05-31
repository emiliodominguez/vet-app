import clientsService from "../services/clients.service.js";
import * as baseClient from "./base-clients.js";

/**
 * Renders the clients table
 */
function renderClientsTable() {
    const existentClients = clientsService.getClients() ?? [];
    baseClient.renderTableBody(existentClients);
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */
function saveClient(e) {
    e.preventDefault();
    const existentClients = clientsService.getClients() ?? [];
    const client = baseClient.getNewClient(e, existentClients.length);
    clientsService.saveClient(client);
    renderClientsTable();
}

baseClient.addEditClientForm.addEventListener("submit", saveClient);
renderClientsTable();

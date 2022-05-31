import LocalStorageService from "../../services/local-storage.service.js";
import * as client from "./base-clients.js";

/**
 * Renders the clients table
 */
function renderClientsTable() {
    const existentClients = LocalStorageService.get(client.lsKey);
    const clients = existentClients ? JSON.parse(existentClients) : [];
    client.renderTableBody(clients);
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */
function addClient(e) {
    e.preventDefault();
    const localStorageData = LocalStorageService.get(client.lsKey);
    const existentClients = localStorageData ? JSON.parse(localStorageData) : [];
    const clients = client.getParsedFormData(e, existentClients);
    LocalStorageService.save(client.lsKey, clients);
    renderClientsTable();
}

client.addClientForm.addEventListener("submit", addClient);
renderClientsTable();

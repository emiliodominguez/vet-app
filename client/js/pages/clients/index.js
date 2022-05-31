import * as client from "./base-clients.js";

/**
 * Renders the clients table
 */
function renderClientsTable() {
    const existentClients = []; // Should get the clients here
    client.renderTableBody(existentClients);
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */
function addClient(e) {
    e.preventDefault();
    const existentClients = []; // Should get the clients here too
    const clients = client.getParsedFormData(e, existentClients);
    console.log("Saving clients with my awesome API...", clients);
    renderClientsTable();
}

client.addClientForm.addEventListener("submit", addClient);
renderClientsTable();

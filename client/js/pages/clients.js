import clientsService from "../services/clients.service.js";
import * as baseClient from "./base-clients.js";

/**
 * Renders the clients table
 */
async function renderTable() {
    const clients = await clientsService.getClients();
    baseClient.renderTableBody(clients ?? []);
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */
function saveClient(e) {
    e.preventDefault();
    const client = baseClient.getClientDataFromForm(e);
    console.log(client);
    clientsService.saveClient(client);
    renderTable();
}

baseClient.addEditClientForm.addEventListener("submit", saveClient);
renderTable();

import clientsService from "../services/clients.service.js";
import * as baseClient from "./base-clients.js";

/**
 * Renders the clients table
 */
async function renderTable() {
    const clients = await clientsService.getClients();
    baseClient.renderTableBody(clients ?? [], editClient, deleteClient);
}

/**
 * Edits any given client
 * @param {string | number} id
 */
async function editClient(id) {
    const client = await clientsService.getClientById(id);
    baseClient.toggleAddClientModal(true, "EDIT", client);
}

/**
 * Deletes any given client
 * @param {string | number} id
 */
async function deleteClient(id) {
    await clientsService.deleteClient(id);
    renderTable();
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */
function saveClient(e) {
    e.preventDefault();
    const client = baseClient.getClientDataFromForm(e);
    clientsService.saveClient(client);
    renderTable();
}

baseClient.addEditClientForm.addEventListener("submit", saveClient);
renderTable();

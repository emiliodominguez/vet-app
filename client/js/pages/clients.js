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
    baseClient.toggleAddClientModal(true, baseClient.formModes.EDIT, client);
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
async function handleFormSubmit(e) {
    e.preventDefault();

    switch (e.target.dataset.mode) {
        case baseClient.formModes.EDIT:
            const id = baseClient.addEditClientModal.querySelector("[name='id']").value;
            const updatedClient = baseClient.getClientDataFromForm(e, id);
            await clientsService.editClient(id, updatedClient);
            break;
        case baseClient.formModes.ADD:
            const clients = await clientsService.getClients();
            const newClient = baseClient.getClientDataFromForm(e, clients.length);
            await clientsService.saveClient(newClient);
            break;
    }

    renderTable();
}

baseClient.addEditClientForm.addEventListener("submit", handleFormSubmit);
renderTable();

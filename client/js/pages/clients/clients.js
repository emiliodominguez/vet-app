import clientsService from "../../services/clients/clients.service.js";
import * as baseClient from "./shared.js";

/**
 * Renders the clients table
 */
async function renderTable() {
    const clients = await clientsService.getClients();
    baseClient.renderTableBody(clients ?? [], editClient, deleteClient);
}

/**
 * Edits any given client
 * @param {string | number} id The client ID
 */
async function editClient(id) {
    const client = await clientsService.getClientById(id);
    console.log(client);
    baseClient.toggleAddClientModal(true, baseClient.formModes.EDIT, client);
}

/**
 * Deletes any given client
 * @param {string | number} id The client ID
 * @param {boolean} soft Whether the delete method is soft or hard
 */
async function deleteClient(id, soft) {
    if (soft) await clientsService.softDeleteClient(id);
    else await clientsService.hardDeleteClient(id);
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
            const newClient = baseClient.getClientDataFromForm(e);
            await clientsService.saveClient(newClient);
            break;
    }

    renderTable();
}

baseClient.addEditClientForm.addEventListener("submit", handleFormSubmit);
renderTable();

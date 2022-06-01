import clientsLsService from "../../services/clients/clients-ls.service.js";
import * as baseClient from "./shared.js";

/**
 * Renders the clients table
 */
function renderTable() {
    const clients = clientsLsService.getClients();
    baseClient.renderTableBody(clients, editClient, deleteClient);
}

/**
 * Edits any given client
 * @param {string | number} id
 */
function editClient(id) {
    const { client } = clientsLsService.getClientById(id);
    baseClient.toggleAddClientModal(true, baseClient.formModes.EDIT, client);
}

/**
 * Deletes any given client
 * @param {string | number} id
 */
function deleteClient(id) {
    clientsLsService.deleteClient(id);
    renderTable();
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */

function handleFormSubmit(e) {
    e.preventDefault();

    switch (e.target.dataset.mode) {
        case baseClient.formModes.EDIT:
            const id = baseClient.addEditClientModal.querySelector("[name='id']").value;
            const updatedClient = baseClient.getClientDataFromForm(e, id);
            clientsLsService.editClient(id, updatedClient);
            break;
        case baseClient.formModes.ADD:
            const clients = clientsLsService.getClients();
            const newClient = baseClient.getClientDataFromForm(e, clients.length);
            clientsLsService.saveClient(newClient);
            break;
    }

    renderTable();
}

baseClient.addEditClientForm.addEventListener("submit", handleFormSubmit);
renderTable();

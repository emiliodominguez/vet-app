import * as baseClient from "./shared.js";
import { formModes } from "../../shared/constants.js";
import clientsLsService from "../../services/clients/local-storage.service.js";

/**
 * Renders the clients table
 */
function renderTable() {
    const clients = clientsLsService.getClients().filter((x) => x.is_active);
    baseClient.renderTableBody(clients, editClient, deleteClient);
}

/**
 * Edits any given client
 * @param {string | number} id
 */
function editClient(id) {
    const { client } = clientsLsService.getClientById(id);
    baseClient.toggleAddClientModal(true, formModes.EDIT, client);
}

/**
 * Deletes any given client
 * @param {string | number} id
 * @param {boolean} soft Whether the delete method is soft or hard
 */
function deleteClient(id, soft) {
    if (soft) clientsLsService.softDeleteClient(id);
    else clientsLsService.hardDeleteClient(id);
    renderTable();
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */

function handleFormSubmit(e) {
    e.preventDefault();

    switch (e.target.dataset.mode) {
        case formModes.EDIT:
            const id = baseClient.addEditClientModal.querySelector("[name='id']").value;
            const { client } = clientsLsService.getClientById(id);
            const updatedClient = baseClient.getClientDataFromForm(e);
            clientsLsService.editClient(id, { ...client, ...updatedClient });
            break;
        case formModes.ADD:
            const clients = clientsLsService.getClients();
            const newClient = baseClient.getClientDataFromForm(e);
            clientsLsService.saveClient({ id: clients.length, is_active: 1, ...newClient });
            break;
    }

    renderTable();
}

baseClient.addEditClientForm.addEventListener("submit", handleFormSubmit);
renderTable();

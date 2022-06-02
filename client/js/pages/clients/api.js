import * as shared from "./shared.js";
import { formModes } from "../../shared/constants.js";
import clientsService from "../../services/clients/api.service.js";

/**
 * Renders the clients table
 */
async function renderTable() {
    const clients = (await clientsService.getClients()).filter((x) => x.is_active !== false);
    shared.renderTableBody(clients ?? [], editClient, deleteClient);
}

/**
 * Edits any given client
 * @param {string | number} id The client ID
 */
async function editClient(id) {
    const client = await clientsService.getClientById(id);
    shared.toggleModal(true, formModes.EDIT, client);
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
        case formModes.EDIT:
            const id = shared.addEditModal.querySelector("[name='id']").value;
            const updatedClient = shared.getDataFromForm(e);
            await clientsService.editClient(id, updatedClient);
            break;
        case formModes.ADD:
            const newClient = shared.getDataFromForm(e);
            await clientsService.saveClient(newClient);
            break;
    }

    renderTable();
}

shared.addEditForm.addEventListener("submit", handleFormSubmit);
renderTable();

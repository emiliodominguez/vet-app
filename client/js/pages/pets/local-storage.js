import * as shared from "./shared.js";
import { formModes } from "../../shared/constants.js";
import petsLsService from "../../services/pets/local-storage.service.js";

/**
 * Renders the pets table
 */
function renderTable() {
    const pets = petsLsService.getPets().filter((x) => x.is_active);
    shared.renderTableBody(pets, editPet, deletePet);
}

/**
 * Edits any given client
 * @param {string | number} id
 */
function editPet(id) {
    const { client } = petsLsService.getPetById(id);
    shared.toggleModal(true, formModes.EDIT, client);
}

/**
 * Deletes any given client
 * @param {string | number} id
 * @param {boolean} soft Whether the delete method is soft or hard
 */
function deletePet(id, soft) {
    if (soft) petsLsService.softDeletePet(id);
    else petsLsService.hardDeletePet(id);
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
            const id = shared.addEditModal.querySelector("[name='id']").value;
            const { client } = petsLsService.getPetById(id);
            const updatedPet = shared.getDataFromForm(e);
            petsLsService.editPet(id, { ...client, ...updatedPet });
            break;
        case formModes.ADD:
            const pets = petsLsService.getPets();
            const newPet = shared.getDataFromForm(e);
            petsLsService.savePet({ id: pets.length, is_active: 1, ...newPet });
            break;
    }

    renderTable();
}

shared.addEditForm.addEventListener("submit", handleFormSubmit);
renderTable();

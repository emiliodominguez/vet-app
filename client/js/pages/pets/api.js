import * as shared from "./shared.js";
import { formModes } from "../../shared/constants.js";
import petsService from "../../services/pets/api.service.js";

/**
 * Renders the pets table
 */
async function renderTable() {
    const pets = (await petsService.getPets()).filter((x) => x.is_active !== false);
    shared.renderTableBody(pets ?? [], editPet, deletePet);
}

/**
 * Edits any given pet
 * @param {string | number} id The pet ID
 */
async function editPet(id) {
    const pet = await petsService.getPetById(id);
    shared.toggleModal(true, formModes.EDIT, pet);
}

/**
 * Deletes any given pet
 * @param {string | number} id The pet ID
 * @param {boolean} soft Whether the delete method is soft or hard
 */
async function deletePet(id, soft) {
    if (soft) await petsService.softDeletePet(id);
    else await petsService.hardDeletePet(id);
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
            const updatedPet = shared.getDataFromForm(e);
            await petsService.editPet(id, updatedPet);
            break;
        case formModes.ADD:
            const newPet = shared.getDataFromForm(e);
            await petsService.savePet(newPet);
            break;
    }

    renderTable();
}

shared.addEditForm.addEventListener("submit", handleFormSubmit);
renderTable();

import { formModes } from "../shared/constants.js";
import petsService from "../services/pets/api.service.js";
import clientsService from "../services/clients/api.service.js";
import "../shared/types.js";

const petDataKeys = ["name", "birth_date", "type", "breed", "affection", "admission_date", "owner_id"];
const addEditForm = document.querySelector("#add-edit-form");
const addEditModal = document.querySelector("#add-edit-modal");
const searchInput = document.querySelector("#pet-search");
const ownerFilter = document.querySelector("#owner-filter");
const clearFiltersBtn = document.querySelector("#clear-filters-btn");
const tableBody = document.querySelector("#data-table tbody");
const addBtn = document.querySelector("#add-btn");
let searchDebounceId;

/**
 * Edits any given pet
 * @param {string | number} id The pet ID
 */
async function editPet(id) {
    const pet = await petsService.getPetById(id);
    toggleModal(true, formModes.EDIT, pet);
}

/**
 * Deletes any given pet
 * @param {string | number} id The pet ID
 * @param {boolean} soft Whether the delete method is soft or hard
 */
async function deletePet(id, soft) {
    if (soft) await petsService.softDeletePet(id);
    else await petsService.hardDeletePet(id);
    renderTableBody();
}

/**
 * Renders the table body
 * @param {Pet[]} filteredPets A filtered list of pets (for search)
 */
async function renderTableBody(filteredPets = null) {
    const pets = filteredPets ?? (await petsService.getPets());

    tableBody.innerHTML = "";

    if (pets.length) {
        for (const pet of pets) {
            const tr = document.createElement("tr");

            for (const key of petDataKeys) {
                const td = document.createElement("td");

                if (key === "owner_id") {
                    const owner = await clientsService.getClientById(pet[key]);
                    td.textContent = owner ? owner.name : "-";
                    tr.append(td);
                } else {
                    td.textContent = pet[key];
                    tr.append(td);
                }
            }

            // Actions
            const actionsCell = document.createElement("td");
            const editBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");

            actionsCell.classList.add("actions");
            // Edit
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editPet(pet.id));
            // Delete
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deletePet(pet.id));

            actionsCell.append(editBtn, deleteBtn);
            tr.append(actionsCell);
            tableBody.append(tr);
        }
    } else {
        const p = document.createElement("p");
        p.textContent = "No records available...";
        tableBody.append(p);
    }
}

/**
 * Renders the owners filter options
 */
async function renderOwnersSelectOptions() {
    const formOwnersSelect = addEditForm.querySelector("[name='owner_id']");
    const clients = await clientsService.getClients();

    if (clients.length) {
        for (const client of clients) {
            const option = document.createElement("option");
            option.value = client.id;
            option.text = client.name;
            formOwnersSelect.append(option);

            const clonedOption = option.cloneNode(true);
            ownerFilter.append(clonedOption);
        }
    } else {
        const option = document.createElement("option");
        option.disabled = true;
        option.textContent = "No records...";
        formOwnersSelect.append(option);

        const clonedOption = option.cloneNode(true);
        ownerFilter.append(clonedOption);
    }
}

/**
 * Toggles the add pet modal
 * @param {boolean} open
 * @param {"ADD" | "EDIT"} mode The form mode
 * @param {Pet} pet The existent pet data (if edit mode)
 */
function toggleModal(open, mode, pet = null) {
    addEditModal.setAttribute("open", open);
    addEditForm.dataset.mode = mode;

    if (pet) {
        const idInput = addEditForm.querySelector("[name='id']");

        idInput.value = pet.id;

        petDataKeys.forEach((key) => {
            const updatedProp = addEditForm.querySelector(`[name='${key}']`);
            if (updatedProp) updatedProp.value = pet[key];
        });
    }
}

/**
 * Handles the pet search
 * @param {Event} e The form event
 */
function handleSearch(e) {
    clearTimeout(searchDebounceId);

    searchDebounceId = setTimeout(async () => {
        let pets = (await petsService.getPets()).filter((x) => x.name.toLowerCase().includes(e.target.value.toLowerCase()));

        if (!!ownerFilter.value) {
            pets = pets.filter((x) => +x.id === +ownerFilter.value);
        }

        renderTableBody(pets ?? []);
    }, 500);
}

/**
 * Handles the owner filter change
 * @param {Event} e The form event
 */
async function handleOwnerFilterChange(e) {
    let pets = (await petsService.getPets()).filter((x) => +x.owner_id === +e.target.value);

    if (!!searchInput.value) {
        pets = pets.filter((x) => x.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    }

    renderTableBody(pets ?? []);
}

/**
 * Clears all the filters
 */
function clearFilters() {
    searchInput.value = "";
    ownerFilter.value = "";
    renderTableBody();
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 * @returns {Pet} The updated pet data
 */
function getDataFromForm(e) {
    const formData = new FormData(e.target);
    const petData = petDataKeys.reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {});
    e.target.reset();
    toggleModal(false);
    return petData;
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    switch (e.target.dataset.mode) {
        case formModes.EDIT:
            const id = addEditModal.querySelector("[name='id']").value;
            const updatedPet = getDataFromForm(e);
            await petsService.editPet(id, updatedPet);
            break;
        case formModes.ADD:
            const newPet = getDataFromForm(e);
            await petsService.savePet(newPet);
            break;
    }

    renderTableBody();
}

// Table rendering
renderTableBody();
renderOwnersSelectOptions();

// Sets the event listener for the search input
searchInput.addEventListener("keyup", handleSearch);

// Sets the event listener for the owner's filter
ownerFilter.addEventListener("change", handleOwnerFilterChange);

// Sets the event listener for the clear filters button
clearFiltersBtn.addEventListener("click", clearFilters);

// Sets the event listener for the add/edit form submission
addEditForm.addEventListener("submit", handleFormSubmit);

// Sets the event listener for the add pet button
addBtn.addEventListener("click", () => {
    addEditForm.reset();
    toggleModal(true, formModes.ADD);
});

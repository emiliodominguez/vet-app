import { formModes } from "../shared/constants.js";
import petsService from "../services/pets/api.service.js";
import clientsService from "../services/clients/api.service.js";
import "../shared/types.js";

const addEditForm = document.querySelector("#add-edit-form");
const addEditModal = document.querySelector("#add-edit-modal");
const searchInput = document.querySelector("#pet-search");
const ownerFilter = document.querySelector("#owner-filter");
const clearFiltersBtn = document.querySelector("#clear-filters-btn");
const tableHead = document.querySelector("#data-table thead");
const tableBody = document.querySelector("#data-table tbody");
const addBtn = document.querySelector("#add-btn");
const entityFields = Object.freeze([
    { key: "name", label: "Name", inputType: "string", placeholder: "Pet's name", required: true },
    { key: "birth_date", label: "Birth date", inputType: "date", required: true },
    { key: "type", label: "Type", inputType: "string", placeholder: "Pet's type", required: true },
    { key: "breed", label: "Breed", inputType: "string", placeholder: "Pet's breed", required: true },
    { key: "affection", label: "Affection", inputType: "string", placeholder: "Pet's affection", required: true },
    { key: "admission_date", label: "Admission date", inputType: "date", required: true },
    { key: "owner_id", label: "Owner", placeholder: "Select the owner of the pet", required: true },
]);
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
 * Renders the table head with the corresponding fields
 */
function renderTableHead() {
    const tr = document.createElement("tr");

    for (const field of entityFields) {
        const th = document.createElement("th");
        th.textContent = field.label;
        tr.append(th);
    }

    tableHead.append(tr);
}

/**
 * Renders the table body
 * @param {Pet[]} filteredPets A filtered list of pets (for search)
 */
async function renderTableBody(filteredPets = null) {
    const pets = filteredPets ?? (await petsService.getPets());

    tableBody.innerHTML = "";

    if (pets.length) {
        const tableFieldsKey = entityFields.map((x) => x.key);

        for (const pet of pets) {
            const tr = document.createElement("tr");

            for (const key of tableFieldsKey) {
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
 * Renders the form with the corresponding fields
 */
async function renderFormFields() {
    const clients = await clientsService.getClients();

    for (const field of entityFields) {
        if (field.inputType) {
            const div = document.createElement("div");
            const label = document.createElement("label");
            const input = document.createElement("input");

            // Label
            label.for = field.key;
            label.textContent = field.label;
            // Input
            input.name = field.key;
            input.placeholder = field.placeholder;
            input.type = field.inputType;
            input.required = field.required;

            div.append(label, input);
            addEditForm.append(div);
        } else {
            // Clients select
            const select = document.createElement("select");
            select.name = field.key;
            addEditForm.append(select);

            // Placeholder
            const placeholder = document.createElement("option");
            placeholder.disabled = true;
            placeholder.hidden = true;
            placeholder.defaultSelected = true;
            select.required = field.required;
            placeholder.textContent = field.placeholder;
            select.append(placeholder);

            // Render owners
            if (clients.length) {
                for (const client of clients) {
                    const option = document.createElement("option");
                    option.value = client.id;
                    option.text = client.name;
                    select.append(option);
                }
            } else {
                const option = document.createElement("option");
                option.disabled = true;
                option.textContent = "No records...";
                select.append(option);
            }
        }
    }
}

/**
 * Renders the owners filter options
 */
async function renderOwnersFilterOptions() {
    const clients = await clientsService.getClients();

    for (const client of clients) {
        const option = document.createElement("option");
        option.value = client.id;
        option.text = client.name;
        ownerFilter.append(option);
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

        entityFields.forEach((prop) => {
            const updatedProp = addEditForm.querySelector(`[name='${prop.key}']`);
            if (updatedProp) updatedProp.value = pet[prop.key];
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
    let pets = (await petsService.getPets()).filter((x) => +x.id === +e.target.value);

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
    const petData = entityFields.reduce((acc, field) => ({ ...acc, [field.key]: formData.get(field.key) }), {});
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
renderTableHead();
renderTableBody();
renderFormFields();
renderOwnersFilterOptions();

// Event listeners
searchInput.addEventListener("keyup", handleSearch);
ownerFilter.addEventListener("change", handleOwnerFilterChange);
clearFiltersBtn.addEventListener("click", clearFilters);
addEditForm.addEventListener("submit", handleFormSubmit);
addBtn.addEventListener("click", () => {
    addEditForm.reset();
    toggleModal(true, formModes.ADD);
});

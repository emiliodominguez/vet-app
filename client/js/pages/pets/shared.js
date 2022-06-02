import { formModes } from "../../shared/constants.js";
import "../../types.js";

export const addEditForm = document.querySelector("#add-edit-form");
export const addEditModal = document.querySelector("#add-edit-modal");

const table = document.querySelector("#data-table");
const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");
const addBtn = document.querySelector("#add-btn");
const entityFields = Object.freeze([
    { key: "name", label: "Name", inputType: "string", placeholder: "Pet's name", required: true },
    { key: "birth_date", label: "Birth date", inputType: "date", required: true },
    { key: "type", label: "Type", inputType: "string", placeholder: "Pet's type", required: true },
    { key: "breed", label: "Breed", inputType: "string", placeholder: "Pet's breed", required: true },
    { key: "affection", label: "Affection", inputType: "string", placeholder: "Pet's affection", required: true },
    { key: "admission_date", label: "Admission date", inputType: "date", required: true },
]);

/**
 * Renders the form with the corresponding fields
 */
function renderFormFields() {
    for (const field of entityFields) {
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
    }
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
 * @param {Pet[]} pets
 * @param {(id: number | string) => void} onEdit
 * @param {(id: number | string, soft: boolean) => void} onDelete
 */
export function renderTableBody(pets, onEdit, onDelete) {
    tableBody.innerHTML = "";

    if (pets.length) {
        const tableFieldsKey = entityFields.map((x) => x.key);

        for (const pet of pets) {
            const tr = document.createElement("tr");

            for (const key of tableFieldsKey) {
                const td = document.createElement("td");
                td.textContent = pet[key];
                tr.append(td);
            }

            // Actions
            const actionsCell = document.createElement("td");
            const editBtn = document.createElement("button");
            const softDeleteBtn = document.createElement("button");
            const hardDeleteBtn = document.createElement("button");

            actionsCell.classList.add("actions");
            // Edit
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => onEdit?.(pet.id));
            // Soft Delete
            softDeleteBtn.textContent = "Soft delete";
            softDeleteBtn.addEventListener("click", () => onDelete?.(pet.id, true));
            // Hard Delete
            hardDeleteBtn.textContent = "Hard delete";
            hardDeleteBtn.addEventListener("click", () => onDelete?.(pet.id, false));

            actionsCell.append(editBtn, softDeleteBtn, hardDeleteBtn);
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
 * Toggles the add pet modal
 * @param {boolean} open
 * @param {"ADD" | "EDIT"} mode The form mode
 * @param {Pet} pet The existent pet data (if edit mode)
 */
export function toggleModal(open, mode, pet = null) {
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
 * Handles the form submission
 * @param {Event} e The form event
 * @returns {Pet} The updated pet data
 */
export function getDataFromForm(e) {
    const formData = new FormData(e.target);
    const petData = entityFields.reduce((acc, field) => ({ ...acc, [field.key]: formData.get(field.key) }), {});
    addEditForm.reset();
    toggleModal(false);
    return petData;
}

// Common function calls
addBtn.addEventListener("click", () => toggleModal(true, formModes.ADD));
renderTableHead();
renderFormFields();

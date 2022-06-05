import { formModes } from "../../shared/constants.js";
import "../../shared/types.js";

export const addEditForm = document.querySelector("#add-edit-form");
export const addEditModal = document.querySelector("#add-edit-modal");

const table = document.querySelector("#data-table");
const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");
const addBtn = document.querySelector("#add-btn");
const entityFields = Object.freeze([
    { key: "name", label: "Name", inputType: "string", placeholder: "Client's name", required: true },
    { key: "email", label: "Email", inputType: "email", placeholder: "Client's email", required: true },
    { key: "age", label: "Age", inputType: "number", placeholder: "Client's age", required: true },
    { key: "birth_date", label: "Birth date", inputType: "date", required: true },
    { key: "phone", label: "Phone", inputType: "tel", placeholder: "Client's phone", required: true },
    { key: "address", label: "Address", inputType: "string", placeholder: "Client's address", required: true },
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
 * @param {Client[]} clients
 * @param {(id: number | string) => void} onEdit
 * @param {(id: number | string, soft: boolean) => void} onDelete
 */
export function renderTableBody(clients, onEdit, onDelete) {
    tableBody.innerHTML = "";

    if (clients.length) {
        const tableFieldsKey = entityFields.map((x) => x.key);

        for (const client of clients) {
            const tr = document.createElement("tr");

            for (const key of tableFieldsKey) {
                const td = document.createElement("td");
                td.textContent = client[key];
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
            editBtn.addEventListener("click", () => onEdit?.(client.id));
            // Soft Delete
            softDeleteBtn.textContent = "Soft delete";
            softDeleteBtn.addEventListener("click", () => onDelete?.(client.id, true));
            // Hard Delete
            hardDeleteBtn.textContent = "Hard delete";
            hardDeleteBtn.addEventListener("click", () => onDelete?.(client.id, false));

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
 * Toggles the add client modal
 * @param {boolean} open
 * @param {"ADD" | "EDIT"} mode The form mode
 * @param {Client} client The existent client data (if edit mode)
 */
export function toggleModal(open, mode, client = null) {
    addEditModal.setAttribute("open", open);
    addEditForm.dataset.mode = mode;

    if (client) {
        const idInput = addEditForm.querySelector("[name='id']");

        idInput.value = client.id;

        entityFields.forEach((prop) => {
            const updatedProp = addEditForm.querySelector(`[name='${prop.key}']`);
            if (updatedProp) updatedProp.value = client[prop.key];
        });
    }
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 * @returns {Client} The updated client data
 */
export function getDataFromForm(e) {
    const formData = new FormData(e.target);
    const clientData = entityFields.reduce((acc, field) => ({ ...acc, [field.key]: formData.get(field.key) }), {});
    e.target.reset();
    toggleModal(false);
    return clientData;
}

// Common function calls
renderTableHead();
renderFormFields();
addBtn.addEventListener("click", () => {
    addEditForm.reset();
    toggleModal(true, formModes.ADD);
});

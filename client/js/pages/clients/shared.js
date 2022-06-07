import { formModes } from "../../shared/constants.js";
import "../../shared/types.js";

export const addEditForm = document.querySelector("#add-edit-form");
export const addEditModal = document.querySelector("#add-edit-modal");

const clientDataKeys = ["name", "email", "age", "birth_date", "phone", "address", "pets"];
const table = document.querySelector("#data-table");
const tableBody = table.querySelector("tbody");
const addBtn = document.querySelector("#add-btn");
const deleteConfirmationModal = document.querySelector("#delete-confirmation-modal");
const modalConfirmBtn = deleteConfirmationModal.querySelector("#confirm");
const modalCancelBtn = deleteConfirmationModal.querySelector("#cancel");
const confirmListenerRegistry = {};

/**
 * Gets the pets cell
 * @returns {HTMLElement} The table cell
 */
function getClientPetsCell(pets) {
    const td = document.createElement("td");

    if (!pets?.length) {
        td.textContent = "-";
    } else {
        const ul = document.createElement("ul");

        for (const pet of pets) {
            const li = document.createElement("li");
            li.textContent = `${pet.name} (${pet.type})`;
            ul.append(li);
        }

        td.append(ul);
    }

    return td;
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
        for (const client of clients) {
            const tr = document.createElement("tr");

            for (const key of clientDataKeys) {
                const td = document.createElement("td");

                if (key === "pets") {
                    const petsCell = getClientPetsCell(client.pets);
                    tr.append(petsCell);
                } else {
                    td.textContent = client[key];
                    tr.append(td);
                }
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
            hardDeleteBtn.addEventListener("click", () => {
                deleteConfirmationModal.setAttribute("open", true);
                modalConfirmBtn.removeEventListener("click", confirmListenerRegistry.click);
                confirmListenerRegistry.click = () => onDelete?.(client.id, false);
                modalConfirmBtn.addEventListener("click", () => {
                    confirmListenerRegistry.click();
                    deleteConfirmationModal.setAttribute("open", false);
                });
            });

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
export function toggleFormModal(open, mode, client = null) {
    addEditModal.setAttribute("open", open);
    addEditForm.dataset.mode = mode;

    if (client) {
        const idInput = addEditForm.querySelector("[name='id']");

        idInput.value = client.id;

        clientDataKeys.forEach((key) => {
            const updatedProp = addEditForm.querySelector(`[name='${key}']`);
            if (updatedProp) updatedProp.value = client[key];
        });
    }
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 * @returns {Client} The updated client data
 */
export function getFormData(e) {
    const formData = new FormData(e.target);
    const clientData = clientDataKeys.reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {});
    e.target.reset();
    toggleFormModal(false);
    return clientData;
}

// Sets the event listener to open the add client modal
addBtn.addEventListener("click", () => {
    addEditForm.reset();
    toggleFormModal(true, formModes.ADD);
});

// Sets the event listener to open the delete confirmation modal
modalCancelBtn.addEventListener("click", () => {
    deleteConfirmationModal.setAttribute("open", false);
});

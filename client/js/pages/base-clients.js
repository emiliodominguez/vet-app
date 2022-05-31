import Client from "../models/client.js";

export const clientsTableBody = document.querySelector("#clients-table tbody");
export const addEditClientModal = document.querySelector("#add-edit-client-modal");
export const addEditClientForm = document.querySelector("#add-edit-client-form");
export const addClientBtn = document.querySelector("#add-client-btn");
const clientProps = ["name", "email", "age", "birthDate", "phone", "address"];

/**
 *
 * @param {Client[]} existentClients
 * @param {(id: number | string) => void} onEdit
 * @param {(id: number | string) => void} onDelete
 */
export function renderTableBody(existentClients, onEdit, onDelete) {
    clientsTableBody.innerHTML = "";

    if (existentClients.length) {
        for (const client of existentClients) {
            const tr = document.createElement("tr");

            for (const [_, value] of Object.entries(client)) {
                const td = document.createElement("td");
                td.textContent = value;
                tr.append(td);
            }

            // Actions
            const actionsCell = document.createElement("td");
            const editBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");

            actionsCell.classList.add("actions");
            // Edit
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => onEdit?.(client.id));
            // Delete
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => onDelete?.(client.id));

            actionsCell.append(editBtn, deleteBtn);

            tr.append(actionsCell);
            clientsTableBody.append(tr);
        }
    } else {
        const p = document.createElement("p");
        p.textContent = "No records available...";
        clientsTableBody.append(p);
    }
}

/**
 * Toggles the add client modal
 * @param {boolean} open
 * @param {"ADD" | "EDIT"} mode The form mode
 * @param {Client} clientToUpdate The existent client data (if edit mode)
 */
export function toggleAddClientModal(open, mode, clientToUpdate = null) {
    addEditClientModal.setAttribute("open", open);
    addEditClientForm.dataset.mode = mode;

    if (clientToUpdate) {
        ["id", ...clientProps].forEach((prop) => {
            const updatedProp = addEditClientForm.querySelector(`[name='${prop}']`);
            updatedProp.value = clientToUpdate[prop];
        });
    }
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 * @param {string | number} id The ID
 * @returns {Client} The updated client data
 */
export function getClientDataFromForm(e, id) {
    const formData = new FormData(e.target);
    const clientData = clientProps.map((x) => formData.get(x));
    addEditClientForm.reset();
    toggleAddClientModal(false);
    return new Client(id, ...clientData);
}

addClientBtn.addEventListener("click", () => toggleAddClientModal(true, "ADD"));

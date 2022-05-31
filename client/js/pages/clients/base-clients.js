import Client from "../../models/client.js";

export const lsKey = "clients";
export const clientsTableBody = document.querySelector("#clients-table tbody");
export const addClientBtn = document.querySelector("#add-client-btn");
export const addClientModal = document.querySelector("#add-client-modal");
export const addClientForm = document.querySelector("#add-client-form");

/**
 * Toggles the add client modal
 * @param {boolean} open
 */
export function toggleAddClientModal(open) {
    addClientModal.setAttribute("open", open);
}

/**
 * Renders the table
 * @param existentClients An array of existent clients
 */
export function renderTableBody(existentClients) {
    clientsTableBody.innerHTML = "";

    if (existentClients.length) {
        for (const client of existentClients) {
            const tr = document.createElement("tr");

            for (const [_, value] of Object.entries(client)) {
                const td = document.createElement("td");
                td.textContent = value;
                tr.append(td);
            }

            clientsTableBody.append(tr);
        }
    } else {
        const p = document.createElement("p");
        p.textContent = "No records available...";
        clientsTableBody.append(p);
    }
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 * @param existentClients An array of existent clients
 */
export function getParsedFormData(e, existentClients) {
    const formData = new FormData(e.target);
    const clientData = ["name", "email", "age", "birthDate", "phone", "address"].map((x) => formData.get(x));
    const client = new Client(existentClients.length, ...clientData);
    addClientForm.reset();
    toggleAddClientModal(false);
    return [...existentClients, client];
}

addClientBtn.addEventListener("click", () => toggleAddClientModal(true));

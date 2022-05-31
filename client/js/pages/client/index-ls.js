import LocalStorageService from "../../services/local-storage.service.js";
import Client from "../../models/client.js";

const clientsLsKey = "clients";
const clientsTableBody = document.querySelector("#clients-table tbody");
const addClientBtn = document.querySelector("#add-client-btn");
const addClientModal = document.querySelector("#add-client-modal");
const addClientForm = document.querySelector("#add-client-form");

/**
 * Toggles the add client modal
 * @param {boolean} open
 */
function toggleAddClientModal(open) {
    addClientModal.setAttribute("open", open);
}

/**
 * Renders the table
 */
function renderTableBody() {
    const existentClients = LocalStorageService.get(clientsLsKey);
    const clients = existentClients ? JSON.parse(existentClients) : [];

    clientsTableBody.innerHTML = "";

    for (const client of clients) {
        const tr = document.createElement("tr");

        for (const [_, value] of Object.entries(client)) {
            const td = document.createElement("td");
            td.textContent = value;
            tr.append(td);
        }

        clientsTableBody.append(tr);
    }
}

/**
 * Handles the form submission
 * @param {Event} e The form event
 */
function handleFormSubmission(e) {
    e.preventDefault();

    const existentClients = LocalStorageService.get(clientsLsKey);
    const clients = !!existentClients ? JSON.parse(existentClients) : [];
    const formData = new FormData(e.target);
    const clientData = ["name", "email", "age", "birthDate", "phone", "address"].map((x) => formData.get(x));
    const client = new Client(clients.length, ...clientData);
    addClientForm.reset();
    LocalStorageService.save(clientsLsKey, [...clients, client]);
    toggleAddClientModal(false);
    renderTableBody();
}

addClientBtn.addEventListener("click", () => toggleAddClientModal(true));
addClientForm.addEventListener("submit", handleFormSubmission);
renderTableBody();

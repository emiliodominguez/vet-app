export const addEditClientForm = document.querySelector("#add-edit-client-form");
export const addEditClientModal = document.querySelector("#add-edit-client-modal");
const clientsTable = document.querySelector("#clients-table");
const clientsTableHead = clientsTable.querySelector("thead");
const clientsTableBody = clientsTable.querySelector("tbody");
const addClientBtn = document.querySelector("#add-client-btn");
const clientFields = Object.freeze([
    { label: "Name", key: "name", inputType: "string", placeholder: "Client's name", required: true },
    { label: "Email", key: "email", inputType: "email", placeholder: "Client's email", required: true },
    { label: "Age", key: "age", inputType: "number", placeholder: "Client's age", required: true },
    { label: "Birth date", key: "birth_date", inputType: "date", required: true },
    { label: "Phone", key: "phone", inputType: "tel", placeholder: "Client's phone", required: true },
    { label: "Address", key: "address", inputType: "string", placeholder: "Client's address", required: true },
]);

function renderFormFields() {
    for (const field of clientFields) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");

        label.for = field.key;
        label.textContent = field.label;
        input.name = field.key;
        input.placeholder = field.placeholder;
        input.type = field.inputType;
        input.required = field.required;
        div.append(label, input);
        addEditClientForm.append(div);
    }
}

function renderTableHead() {
    const tr = document.createElement("tr");

    for (const field of clientFields) {
        const th = document.createElement("th");
        th.textContent = field.label;
        tr.append(th);
    }

    clientsTableHead.append(tr);
}

/**
 *
 * @param {Client[]} existentClients
 * @param {(id: number | string) => void} onEdit
 * @param {(id: number | string) => void} onDelete
 */
export function renderTableBody(existentClients, onEdit, onDelete) {
    clientsTableBody.innerHTML = "";

    if (existentClients.length) {
        const tableFieldsKey = clientFields.map((x) => x.key);

        for (const client of existentClients) {
            const tr = document.createElement("tr");

            for (const [key, value] of Object.entries(client)) {
                if (tableFieldsKey.includes(key)) {
                    const td = document.createElement("td");
                    td.textContent = value;
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
        clientFields.forEach((prop) => {
            const updatedProp = addEditClientForm.querySelector(`[name='${prop.key}']`);
            if (updatedProp) updatedProp.value = clientToUpdate[prop.key];
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
    const clientData = clientFields.reduce((acc, field) => ({ ...acc, [field.key]: formData.get(field.key) }), {});
    addEditClientForm.reset();
    toggleAddClientModal(false);
    return id ? { id, ...clientData } : clientData;
}

// Common function calls
addClientBtn.addEventListener("click", () => toggleAddClientModal(true, "ADD"));
renderTableHead();
renderFormFields();

import localStorageService from "../shared/local-storage.service.js";
import "../../shared/types.js";

class ClientsServiceLS {
    #localStorageKey = "clients";

    /**
     * Gets the clients
     * @returns {Client[]} The array of clients
     */
    getClients() {
        const existentClients = localStorageService.get(this.#localStorageKey);
        return existentClients ? JSON.parse(existentClients) : [];
    }

    /**
     * Gets a client by its ID
     * @param {string | number} id The ID
     * @returns {{index: number, client: Client}} The client
     */
    getClientById(id) {
        const clients = this.getClients();
        const client = clients.find((x) => String(x.id) === String(id));
        const index = clients.findIndex((x) => String(x.id) === String(client.id));
        return { index, client };
    }

    /**
     * Saves a new list of clients
     * @param {Client[]} clients The clients
     */
    saveClients(clients) {
        localStorageService.set(this.#localStorageKey, clients);
    }

    /**
     * Saves a new client
     * @param {Client} client The client
     */
    saveClient(client) {
        const clients = this.getClients();
        clients.push(client);
        this.saveClients(clients);
    }

    /**
     * Edits an existent client
     * @param {string | number} id The ID
     * @param {Client} updatedClient The client
     */
    editClient(id, updatedClient) {
        const clients = this.getClients();
        const { index, client } = this.getClientById(id);

        if (client) {
            const editedClient = { ...client, ...updatedClient };
            clients.splice(index, 1, editedClient);
            this.saveClients(clients);
        }
    }

    /**
     * Deletes an existent client
     * @param {string | number} id The ID
     */
    hardDeleteClient(id) {
        const clients = this.getClients();
        const { index, client } = this.getClientById(id);

        if (client) {
            clients.splice(index, 1);
            this.saveClients(clients);
        }
    }

    /**
     * Deletes an existent client
     * @param {string | number} id The ID
     */
    softDeleteClient(id) {
        const clients = this.getClients();
        const { index, client } = this.getClientById(id);

        if (client) {
            clients.splice(index, 1, { ...client, is_active: 0 });
            this.saveClients(clients);
        }
    }

    /**
     * Gets the amount of clients
     * @returns {number} The clients count
     */
    count() {
        const clients = this.getClients();
        return clients.length;
    }
}

export default new ClientsServiceLS();

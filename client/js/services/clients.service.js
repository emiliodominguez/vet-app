import httpService from "./http.service.js";

class ClientsService {
    #apiUrl = "http://127.0.0.1:8000";

    /**
     * Gets the clients
     * @returns {Promise<Client[]>} The array of clients
     */
    async getClients() {
        return await httpService.get(`${this.#apiUrl}/clients`);
    }

    /**
     * Gets a client by its ID
     * @param {string | number} id The ID
     * @returns {Promise<Client>} The client
     */
    async getClientById(id) {
        return await httpService.get(`${this.#apiUrl}/clients/${id}`);
    }

    /**
     * Saves a new client
     * @param {Client} client The client
     */
    async saveClient(client) {
        return await httpService.post(`${this.#apiUrl}/clients`, client);
    }

    /**
     * Edits an existent client
     * @param {string | number} id The ID
     * @param {Client} client The client
     */
    async editClient(id, client) {
        return await httpService.put(`${this.#apiUrl}/clients/${id}`, client);
    }

    /**
     * Deletes an existent client
     * @param {string | number} id The ID
     */
    async deleteClient(id) {
        return await httpService.delete(`${this.#apiUrl}/clients/${id}`);
    }
}

export default new ClientsService();

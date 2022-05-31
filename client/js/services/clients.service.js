import httpService from "./http.service.js";

class ClientsService {
    #apiUrl = "http://127.0.0.1:8000";

    /**
     * Gets the clients
     * @returns {Client[]} The array of clients
     */
    async getClients() {
        await httpService.get(`${this.#apiUrl}/clients`);
    }

    /**
     * Gets a client by its ID
     * @param {string | number} id The ID
     * @returns {Client} The client
     */
    async getClientById(id) {
        await httpService.get(`${this.#apiUrl}/clients/${id}`);
    }

    /**
     * Saves a new client
     * @param {Client} client The client
     */
    async saveClient(client) {
        await httpService.post(`${this.#apiUrl}/clients`, client);
    }

    /**
     * Edits an existent client
     * @param {string | number} id The ID
     * @param {Client} client The client
     */
    async editClient(id, client) {
        await httpService.put(`${this.#apiUrl}/clients/${id}`, client);
    }

    /**
     * Deletes an existent client
     * @param {string | number} id The ID
     */
    async deleteClient(id) {
        await httpService.delete(`${this.#apiUrl}/clients/${id}`);
    }
}

export default new ClientsService();

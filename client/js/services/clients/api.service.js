import { API_URL } from "../../shared/constants.js";
import httpService from "../shared/http.service.js";
import "../../types.js";

class ClientsService {
    /**
     * Gets the clients
     * @returns {Promise<Client[]>} The array of clients
     */
    async getClients() {
        return await httpService.get(`${API_URL}/clients`);
    }

    /**
     * Gets a client by its ID
     * @param {string | number} id The ID
     * @returns {Promise<Client>} The client
     */
    async getClientById(id) {
        return await httpService.get(`${API_URL}/clients/${id}`);
    }

    /**
     * Saves a new client
     * @param {Client} client The client
     */
    async saveClient(client) {
        return await httpService.post(`${API_URL}/clients`, client);
    }

    /**
     * Edits an existent client
     * @param {string | number} id The ID
     * @param {Client} client The client
     */
    async editClient(id, client) {
        return await httpService.put(`${API_URL}/clients/${id}`, client);
    }

    /**
     * Hard delete an existent client
     * @param {string | number} id The ID
     */
    async hardDeleteClient(id) {
        return await httpService.delete(`${API_URL}/clients/${id}`);
    }

    /**
     * Soft delete an existent client
     * @param {string | number} id The ID
     */
    async softDeleteClient(id) {
        return await httpService.patch(`${API_URL}/clients/${id}`);
    }
}

export default new ClientsService();

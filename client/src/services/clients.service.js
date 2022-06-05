import { apiUrl } from "../shared/constants";
import httpService from "./http.service";
import "../shared/types";

class ClientsService {
	/**
	 * Gets the clients
	 * @returns {Promise<Client[]>} The array of clients
	 */
	async getClients() {
		return await httpService.get(`${apiUrl}/clients`);
	}

	/**
	 * Gets a client by its ID
	 * @param {string | number} id The ID
	 * @returns {Promise<Client>} The client
	 */
	async getClientById(id) {
		return await httpService.get(`${apiUrl}/clients/${id}`);
	}

	/**
	 * Saves a new client
	 * @param {Client} client The client
	 */
	async saveClient(client) {
		return await httpService.post(`${apiUrl}/clients`, client);
	}

	/**
	 * Edits an existent client
	 * @param {string | number} id The ID
	 * @param {Client} client The client
	 */
	async editClient(id, client) {
		return await httpService.put(`${apiUrl}/clients/${id}`, client);
	}

	/**
	 * Hard delete an existent client
	 * @param {string | number} id The ID
	 */
	async hardDeleteClient(id) {
		return await httpService.delete(`${apiUrl}/clients/${id}`);
	}

	/**
	 * Soft delete an existent client
	 * @param {string | number} id The ID
	 */
	async softDeleteClient(id) {
		return await httpService.patch(`${apiUrl}/clients/${id}`);
	}
}

export default new ClientsService();

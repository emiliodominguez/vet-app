import { apiUrl } from "../shared/constants";
import httpService from "./http.service";

class PetsService {
	/**
	 * Gets the pets
	 * @returns {Promise<Pet[]>} The array of pets
	 */
	async getPets() {
		return await httpService.get(`${apiUrl}/pets`);
	}

	/**
	 * Gets any give client pets
	 * @returns {Promise<Pet[]>} The array of pets
	 * @param {string | number} clientId The client ID
	 */
	async getPetsByClient(clientId) {
		return await httpService.get(`${apiUrl}/pets_by_owner/${clientId}`);
	}

	/**
	 * Gets a pet by its ID
	 * @param {string | number} id The ID
	 * @returns {Promise<Pet>} The pet
	 */
	async getPetById(id) {
		return await httpService.get(`${apiUrl}/pets/${id}`);
	}

	/**
	 * Saves a new pet
	 * @param {Pet} pet The pet
	 */
	async savePet(pet) {
		return await httpService.post(`${apiUrl}/pets`, pet);
	}

	/**
	 * Edits an existent pet
	 * @param {string | number} id The ID
	 * @param {Pet} pet The pet
	 */
	async editPet(id, pet) {
		return await httpService.put(`${apiUrl}/pets/${id}`, pet);
	}

	/**
	 * Hard delete an existent pet
	 * @param {string | number} id The ID
	 */
	async deletePet(id) {
		return await httpService.delete(`${apiUrl}/pets/${id}`);
	}
}

export default new PetsService();

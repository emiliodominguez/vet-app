import { apiUrl } from "../../shared/constants.js";
import httpService from "../shared/http.service.js";
import "../../types.js";

class PetsService {
    /**
     * Gets the pets
     * @returns {Promise<Pet[]>} The array of pets
     */
    async getPets() {
        return await httpService.get(`${apiUrl}/pets`);
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
    async hardDeletePet(id) {
        return await httpService.delete(`${apiUrl}/pets/${id}`);
    }

    /**
     * Soft delete an existent pet
     * @param {string | number} id The ID
     */
    async softDeletePet(id) {
        return await httpService.patch(`${apiUrl}/pets/${id}`);
    }
}

export default new PetsService();

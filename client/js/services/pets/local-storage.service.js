import localStorageService from "../shared/local-storage.service.js";
import "../../types.js";

class PetsServiceLS {
    #localStorageKey = "pets";

    /**
     * Gets the pets
     * @returns {Pet[]} The array of pets
     */
    getPets() {
        const existentPets = localStorageService.get(this.#localStorageKey);
        return existentPets ? JSON.parse(existentPets) : [];
    }

    /**
     * Gets a pet by its ID
     * @param {string | number} id The ID
     * @returns {{index: number, pet: Pet}} The pet
     */
    getPetById(id) {
        const pets = this.getPets();
        const pet = pets.find((x) => String(x.id) === String(id));
        const index = pets.findIndex((x) => String(x.id) === String(pet.id));
        return { index, pet };
    }

    /**
     * Saves a new list of pets
     * @param {Pet[]} pets The pets
     */
    savePets(pets) {
        localStorageService.set(this.#localStorageKey, pets);
    }

    /**
     * Saves a new pet
     * @param {Pet} pet The pet
     */
    savePet(pet) {
        const pets = this.getPets();
        pets.push(pet);
        this.savePets(pets);
    }

    /**
     * Edits an existent pet
     * @param {string | number} id The ID
     * @param {Pet} updatedPet The pet
     */
    editPet(id, updatedPet) {
        const pets = this.getPets();
        const { index, pet } = this.getPetById(id);

        if (pet) {
            const editedPet = { ...pet, ...updatedPet };
            pets.splice(index, 1, editedPet);
            this.savePets(pets);
        }
    }

    /**
     * Deletes an existent pet
     * @param {string | number} id The ID
     */
    hardDeletePet(id) {
        const pets = this.getPets();
        const { index, pet } = this.getPetById(id);

        if (pet) {
            pets.splice(index, 1);
            this.savePets(pets);
        }
    }

    /**
     * Deletes an existent pet
     * @param {string | number} id The ID
     */
    softDeletePet(id) {
        const pets = this.getPets();
        const { index, pet } = this.getPetById(id);

        if (pet) {
            pets.splice(index, 1, { ...pet, is_active: 0 });
            this.savePets(pets);
        }
    }

    /**
     * Gets the amount of pets
     * @returns {number} The pets count
     */
    count() {
        const pets = this.getPets();
        return pets.length;
    }
}

export default new PetsServiceLS();

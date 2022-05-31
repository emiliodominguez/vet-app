export default class Pet {
    /**
     * @param {string | number} id The pet's ID
     * @param {string} name The pet's name
     * @param {Date} birthDate The pet's birth date
     * @param {string} type The pet's type
     * @param {string} breed The pet's breed
     * @param {string} affections The pet's affections
     * @param {Date} admissionDate The pet's admission date
     */
    constructor(id, name, birthDate, type, breed, affections, admissionDate) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.type = type;
        this.breed = breed;
        this.affections = affections;
        this.admissionDate = admissionDate;
    }
}

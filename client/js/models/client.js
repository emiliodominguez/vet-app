export default class Client {
    /**
     * @param {string | number} id The client's ID
     * @param {string} name The client's name
     * @param {string} email The client's email
     * @param {number} age The client's age
     * @param {string} birthDate The client's birth date
     * @param {string | number} phone The client's phone
     * @param {string} address The client's address
     */
    constructor(id, name, email, age, birthDate, phone, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = parseInt(age);
        this.birthDate = birthDate;
        this.phone = phone;
        this.address = address;
    }
}

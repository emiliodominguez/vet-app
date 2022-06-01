class LocalStorageService {
    /**
     * Gets an item from local storage
     * @param {string} key The item key
     * @returns The item (if it exists)
     */
    get(key) {
        return localStorage.getItem(key);
    }

    /**
     * Saves an item in local storage
     * @param {string} key The item key
     * @param {any} payload The item payload
     */
    set(key, payload) {
        localStorage.setItem(key, JSON.stringify(payload));
    }

    /**
     * Removes an item from local storage
     * @param {string} key The item key
     */
    remove(key) {
        localStorage.removeItem(key);
    }
}

export default new LocalStorageService();

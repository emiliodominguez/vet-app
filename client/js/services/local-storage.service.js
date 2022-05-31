class LocalStorageService {
    get(key) {
        return localStorage.getItem(key);
    }

    set(key, payload) {
        localStorage.setItem(key, JSON.stringify(payload));
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}

export default new LocalStorageService();

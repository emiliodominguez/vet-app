class LocalStorageService {
    get(key) {
        const fetchedItem = localStorage.getItem(key);
        return fetchedItem ?? null;
    }

    save(key, payload) {
        localStorage.setItem(key, JSON.stringify(payload));
    }

    edit(key, payload) {
        const existentItem = this.get(key);
        if (existentItem) this.delete(key);
        localStorage.setItem(key, JSON.stringify(payload));
    }

    delete(key) {
        localStorage.removeItem(key);
    }
}

export default new LocalStorageService();

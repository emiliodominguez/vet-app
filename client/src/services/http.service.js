/**
 * @typedef ResolverOptions
 * @property {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method The HTTP method
 * @property {string} url  The url
 * @property {any} payload The payload
 */

class HttpService {
	/**
	 * ### The HTTP service get method
	 * @param {string} url  The url
	 */
	async get(url) {
		return await this.#resolve({ method: "GET", url });
	}

	/**
	 * ### The HTTP service post method
	 * @param {string} url  The url
	 * @param {any} payload The payload
	 */
	async post(url, payload) {
		return await this.#resolve({ method: "POST", url, payload });
	}

	/**
	 * ### The HTTP service put method
	 * @param {string} url  The url
	 * @param {any} payload The payload
	 */
	async put(url, payload) {
		return await this.#resolve({ method: "PUT", url, payload });
	}

	/**
	 * ### The HTTP service patch method
	 * @param {string} url  The url
	 * @param {any} payload The payload
	 */
	async patch(url, payload) {
		return await this.#resolve({ method: "PATCH", url, payload });
	}

	/**
	 * ### The HTTP service delete method
	 * @param {string} url  The url
	 */
	async delete(url) {
		return await this.#resolve({ method: "DELETE", url });
	}

	/**
	 * ### The fetch resolver
	 * @param {ResolverOptions} options The resolver options
	 */
	async #resolve({ method, url, payload }) {
		try {
			const response = await fetch(url, {
				method,
				body: payload ? JSON.stringify(payload) : undefined,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json; charset=UTF-8"
				}
			});

			if (response.status >= 200 && response.status < 300) {
				const contentType = response.headers.get("content-type");

				switch (true) {
					case contentType?.includes("application/text"):
						return await response.text();
					case contentType?.includes("application/json"):
						return await response.json();
					default:
						return {};
				}
			} else {
				throw new Error(`${response.status}: ${response.statusText}`);
			}
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default new HttpService();

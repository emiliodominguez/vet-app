/**
 * Fetches an HTML template
 * @param {string} htmlRelativeUrl The template URL
 * @param {string} baseUrl The template base URL
 * @returns {Promise<string>} The HTML template as text
 */
export async function getHtmlTemplate(htmlRelativeUrl, baseUrl) {
    const url = new URL(htmlRelativeUrl, baseUrl).href;
    return await (await fetch(url)).text();
}

/**
 * Gets the style tag (<link>) with its corresponding configuration
 * @param {string} url The styles url
 * @returns {HTMLLinkElement} The link tag
 */
export function getStyleTag(url) {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", url);
    return linkElem;
}

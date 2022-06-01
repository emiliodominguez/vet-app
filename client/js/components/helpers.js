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

/**
 * Gets the scripts tag with its corresponding configuration
 * @param {string} url The scripts url
 * @param {boolean} module Whether the script should be a module or not
 * @returns {HTMLScriptElement} The scripts tag
 */
export function getScriptsTag(url, module = false) {
    const script = document.createElement("script");
    script.setAttribute("src", url);
    script.setAttribute("type", module ? "module" : undefined);
    return script;
}

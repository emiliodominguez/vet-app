import { getHtmlTemplate, getStyleTag } from "../../../helpers/common.js";
import { routes } from "../../../config/routes.js";

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.setStyleTag();
        this.setTemplate();
    }

    /**
     * Sets the component template
     */
    async setTemplate() {
        const template = await getHtmlTemplate("./template.html", import.meta.url);
        const navLinks = this.getNavLinks().outerHTML;
        this.shadowRoot.innerHTML += template.replace("{{links}}", navLinks);
    }

    /**
     * Sets the style tag containing the component styles
     */
    setStyleTag() {
        const linkElem = getStyleTag("/styles/header.css");
        this.shadowRoot.append(linkElem);
    }

    /**
     * Gets the navigation links based on the routes
     * @returns The UL element with the routes
     */
    getNavLinks() {
        const ul = document.createElement("ul");

        for (const route of routes) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = route.label;
            a.href = route.url;
            li.append(a);
            ul.append(li);
        }

        return ul;
    }
}

customElements.define("app-header", Header);

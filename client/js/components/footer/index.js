import { getHtmlTemplate, getStyleTag } from "../../shared/helpers.js";

class Footer extends HTMLElement {
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
        this.shadowRoot.innerHTML += template.replace("{{year}}", new Date().getFullYear());
    }

    /**
     * Sets the style tag containing the component styles
     */
    setStyleTag() {
        const linkElem = getStyleTag("/styles/css/footer.css");
        this.shadowRoot.append(linkElem);
    }
}

customElements.define("app-footer", Footer);

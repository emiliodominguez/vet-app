import { getHtmlTemplate, getStyleTag } from "../../helpers.js";
import "../header/index.js";
import "../footer/index.js";

class Main extends HTMLElement {
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
        this.shadowRoot.innerHTML += template;
    }

    /**
     * Sets the style tag containing the component styles
     */
    setStyleTag() {
        const linkElem = getStyleTag("/styles/css/footer.css");
        this.shadowRoot.append(linkElem);
    }
}

customElements.define("app-layout", Main);

import { getHtmlTemplate, getStyleTag } from "../helpers.js";

class Modal extends HTMLElement {
    static get observedAttributes() {
        return ["open"];
    }

    constructor() {
        super();
        this.eventListeners = {};
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.setStyleTag();
        this.setTemplate();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "open" && oldValue !== newValue) {
            this.toggleVisibility(JSON.parse(newValue));

            if (!this.eventListeners.close) {
                const closeBtn = this.shadowRoot.querySelector("#modal-close-btn");
                closeBtn?.addEventListener("click", () => this.closeModal());
                this.eventListeners.close = true;
            }
        }
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
        const linkElem = getStyleTag("/styles/css/modal.css");
        this.shadowRoot.append(linkElem);
    }

    /**
     * Toggles the modal visibility
     * @param {boolean} open
     */
    toggleVisibility(open) {
        const modal = this.shadowRoot.querySelector(".modal");
        modal.classList[open ? "add" : "remove"]("visible");
    }

    /**
     * Closes the modal
     */
    closeModal() {
        this.setAttribute("open", false);
    }
}

customElements.define("app-modal", Modal);

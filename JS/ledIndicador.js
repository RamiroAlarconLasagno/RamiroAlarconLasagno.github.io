import { EmicWidget } from "./emicWidget.js";

class EmicWidgetLedIndicador extends EmicWidget {
    static namesList = {};
    // Constructor.
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    getNewID() {
        var i;
        for (i = 1; EmicWidgetLedIndicador.namesList[`led-${i}`]; i++);
        EmicWidgetLedIndicador.namesList[`led-${i}`] = this;
        return `led-${i}`;
    }

    connectedCallback() {
        if (!super.preconnectedCallback("LedIndicador")) {
            return;
        }

        if (!this.hasAttribute('id')) {
            this.setAttribute('id', this.getNewID());
        }

        if (!this.hasAttribute('state')) {
            this.setAttribute('state', '0');
        }

        this.render();
        super.connectedCallback();
    }

    static get observedAttributes() {
        return ["state"];
    }

    attributeChangedCallback(name, old, now) {
        if (name === 'state') {
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #led {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 2px solid ${this.getAttribute('state') == "1" ? "green" : "#008000"};
                    background-color: ${this.getAttribute('state') == "1" ? "#90FF90" : "#005000"};
                }
            </style>
            <div id="led"></div>
        `;
    }

    set state(newVal) {
        this.setAttribute('state', newVal);
    }

    get state() {
        return this.getAttribute('state');
    }
}

customElements.define("emic-widget-ledindicador", EmicWidgetLedIndicador);

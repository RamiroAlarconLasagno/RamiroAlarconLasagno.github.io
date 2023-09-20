import { EmicWidget } from "./emicWidget.js";

class EmicWidgetInputTime extends EmicWidget {
  // Definimos variables.
  static namesList = {};
  inputTime;

  // Constructor.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getNewID() {
    var i;
    for (i = 1; EmicWidgetInputTime.namesList[`inputtime-${i}`]; i++);
    EmicWidgetInputTime.namesList[`inputtime-${i}`] = this;
    return `inputtime-${i}`;
  }

  connectedCallback() {
    if (!super.preconnectedCallback("InputTime")) {
      return;
    }
    this.inputTime = document.createElement("input");
    this.inputTime.type = "time";

    //############################################################################
    // Aplicamos los estilos directamente al elemento para que coincidan con la gama de colores de la tabla
    this.inputTime.style.width = "150px";
    this.inputTime.style.height = "40px";
    this.inputTime.style.border = "2px solid #008CBA"; // Borde azul para coincidir con la tabla
    this.inputTime.style.borderRadius = "1px"; // Borde redondeado para coincidir con la tabla
    this.inputTime.style.backgroundColor = "transparent"; // Fondo celeste claro para coincidir con la tabla
    this.inputTime.style.fontFamily = "'Courier New', Courier, monospace"; // Tipo de letra para coincidir con la tabla
    this.inputTime.style.fontSize = "18px"; // TamaÃ±o de letra de 18px para coincidir con la tabla
    this.inputTime.style.cursor = "pointer";

    //############################################################################

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    this.setAttribute("title", this.getAttribute("id"));

    // Si el elemento no tiene un atributo "value", se le asigna un valor por defecto
    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "00:00");
    }

    this.shadowRoot.appendChild(this.inputTime);

    //this.inputTime.style = "width:150px; height:40px;";

    this.inputTime.addEventListener("change", this.change);

    // Agregamos un listener al input para actualizar el atributo "value" cuando cambie
    this.inputTime.addEventListener("change", (event) => {
      this.setAttribute("value", event.target.value);
      console.log("change", event.target.value);
    if (window.inputTimeChange)
      inputTimeChange(this.getAttribute("id"), event.target.value);
    });

    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, old, now) {
    if (typeof this.inputTime == "undefined") return;
    switch (name) {
      case "value":
        this.inputTime.value = now;
        break;
    }
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newVal) {
    this.setAttribute("value", newVal);
  }
}

customElements.define("emic-widget-inputtime", EmicWidgetInputTime);

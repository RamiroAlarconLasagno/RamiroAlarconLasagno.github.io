import { EmicWidget } from "./emicWidget.js";

// Extender EmicWidget para crear EmicWidgetInputDate
class EmicWidgetInputDate extends EmicWidget {
  // Definimos variables.
  static namesList = {};
  inputDate; // La entrada de fecha

  constructor() {
    super(); // Llamamos al constructor de la clase padre
    this.attachShadow({ mode: "open" });
  }

  getNewID() {
    var i;
    for (i = 1; EmicWidgetInputDate.namesList[`inputdate-${i}`]; i++);
    EmicWidgetInputDate.namesList[`inputdate-${i}`] = this;
    return `inputdate-${i}`;
  }

  connectedCallback() {
    if (!super.preconnectedCallback("InputDate")) {
      return;
    }

    // Creamos un nuevo elemento input de tipo 'date'
    this.inputDate = document.createElement("input");
    this.inputDate.type = "date";
    this.inputDate.className = "emic-config form-control input_width_90"; // Estilos
    //############################################################################
    // Aplicamos los estilos directamente al elemento para que coincidan con la gama de colores de la tabla
    this.inputDate.style.width = "150px";
    this.inputDate.style.height = "40px";
    this.inputDate.style.border = "2px solid #008CBA"; // Borde azul para coincidir con la tabla
    this.inputDate.style.borderRadius = "1px"; // Borde redondeado para coincidir con la tabla
    this.inputDate.style.backgroundColor = "#e6f7ff"; // Fondo celeste claro para coincidir con la tabla
    this.inputDate.style.fontFamily = "'Courier New', Courier, monospace"; // Tipo de letra para coincidir con la tabla
    this.inputDate.style.fontSize = "18px"; // TamaÃ±o de letra de 18px para coincidir con la tabla
    this.inputDate.style.cursor = "pointer";

    //############################################################################
    // Configuramos el id
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    // AÃ±adimos el nuevo input al shadow DOM
    this.shadowRoot.appendChild(this.inputDate);

    // Si el elemento no tiene un atributo "value", se le asigna un valor por defecto
    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "2022-01-01"); // Fecha por defecto
    }

    this.inputDate.addEventListener("change", this.change);

    // Agregamos un listener al input para actualizar el atributo "value" cuando cambie
    this.inputDate.addEventListener("change", (event) => {
      console.log("Fecha cambiada", event.target.value);
      console.log("Nombre", this.getAttribute("id"));
      this.setAttribute("value", event.target.value);
      if (window.inputDateChange)
        inputDateChange(this.getAttribute("id"), event.target.value);
    });

    super.connectedCallback();
  }


  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, old, now) {
    if (typeof this.inputDate == "undefined") return;
    switch (name) {
      case "value":
        this.inputDate.value = now;
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

// Finalmente registramos el nuevo elemento
customElements.define("emic-widget-inputdate", EmicWidgetInputDate);

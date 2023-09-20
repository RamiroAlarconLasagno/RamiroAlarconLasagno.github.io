import { EmicWidget } from "./emicWidget.js";

class EmicWidgetInputNum extends EmicWidget {
  // Definimos variables.
  static namesList = {};
  inputNum;

  // Constructor.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getNewID() {
    var i;
    for (i = 1; EmicWidgetInputNum.namesList[`inputnum-${i}`]; i++);
    EmicWidgetInputNum.namesList[`inputnum-${i}`] = this;
    return `inputnum-${i}`;
  }

  connectedCallback() {
    if (!super.preconnectedCallback("InputNum")) {
      return;
    }
    this.inputNum = document.createElement("input");
    this.inputNum.type = "number";
    this.inputNum.step = "1";
    this.inputNum.maxLength = "2";

    //############################################################################
    // Aplicamos los estilos directamente al elemento para que coincidan con la gama de colores de la tabla
    this.inputNum.style.width = "60px";
    this.inputNum.style.height = "40px";
    this.inputNum.style.border = "2px solid #008CBA"; // Borde azul para coincidir con la tabla
    this.inputNum.style.borderRadius = "1px"; // Borde redondeado para coincidir con la tabla
    this.inputNum.style.backgroundColor = "#e6f7ff"; // Fondo celeste claro para coincidir con la tabla
    this.inputNum.style.fontFamily = "'Courier New', Courier, monospace"; // Tipo de letra para coincidir con la tabla
    this.inputNum.style.fontSize = "18px"; // TamaÃ±o de letra de 18px para coincidir con la tabla
    this.inputNum.style.cursor = "pointer";

    //############################################################################

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    this.setAttribute("title", this.getAttribute("id"));

    // Si el elemento no tiene un atributo "value", se le asigna un valor por defecto
    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "0");
    }

    // Si el elemento no tiene un atributo "max", se le asigna el valor 100
    if (!this.hasAttribute("max")) {
      this.setAttribute("max", 60);
    }

    // Si el elemento no tiene un atributo "min", se le asigna el valor 0
    if (!this.hasAttribute("min")) {
      this.setAttribute("min", 0);
    }

    if (this.hasAttribute("min")) {
      this.inputNum.min = this.getAttribute("min");
      }
    if (this.hasAttribute("max")) {
      this.inputNum.max = this.getAttribute("max");
      }

    this.shadowRoot.appendChild(this.inputNum); // AsegÃºrate de que el input tambiÃ©n estÃ© en el shadow DOM

    this.inputNum.addEventListener("change", this.change.bind(this));
    super.connectedCallback();
  }

  change(event) {
    console.log("change", event.target.value);
    if (window.inputNumChange)
      inputNumChange(this.getAttribute("id"), event.target.value);
    this.setAttribute("value", event.target.value); // Actualizamos el atributo "value"
  }

  static get observedAttributes() {
    return ["value", "max", "min"];
  }

  attributeChangedCallback(name, old, now) {
    if (typeof this.inputNum == "undefined") return;
    switch (name) {
      case "value":
        this.inputNum.value = now;
        break;
      // Si el atributo cambiado es "min", se actualiza el valor mÃ­nimo del slider
      case "min":
        this.inputNum.min = now;
        break;
      // Si el atributo cambiado es "max", se actualiza el valor mÃ¡ximo del slider
      case "max":
        this.inputNum.max = now;
        break;
    }
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newVal) {
    this.setAttribute("value", newVal);
  }

  // MÃ©todo para establecer el valor del atributo "max"
  set max(newVal) {
    this.setAttribute("max", newVal);
  }

  // MÃ©todo para establecer el valor del atributo "min"
  set min(newVal) {
    this.setAttribute("min", newVal);
  }

   // MÃ©todo para obtener el valor del atributo "max"
  get max() {
    return this.getAttribute("max");
  }

  // MÃ©todo para obtener el valor del atributo "min"
  get min() {
    return this.getAttribute("min");
  }

}

customElements.define("emic-widget-inputnum", EmicWidgetInputNum);

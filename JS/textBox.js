import { EmicWidget } from "./emicWidget.js";

class EmicWidgetTextBox extends EmicWidget {
  static namesList = {};
  myDiv;
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`textBox-${i}`) !== null; i++);
    return `textBox-${i}`;
  }
  static get observedAttributes() {
    return ["value"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!super.preconnectedCallback("TextBox")) {
      return;
    }

    const div = document.createElement("div");
    this.myDiv = div;
    const style = document.createElement("style");
    this.shadowRoot.appendChild(div);
    //############################################################################
    // Aplicamos los estilos directamente al elemento para que coincidan con la gama de colores de la tabla
    this.myDiv.style.height = "40px";
    this.myDiv.style.minWidth = "40px";
    this.myDiv.style.lineHeight = "40px"; // Centra el texto verticalmente al hacerlo igual a la altura
    this.myDiv.style.border = "2px solid #008CBA"; // Borde azul para coincidir con la tabla
    this.myDiv.style.borderRadius = "1px"; // Borde redondeado para coincidir con la tabla
    this.myDiv.style.backgroundColor = "transparent"; // Fondo celeste claro para coincidir con la tabla
    this.myDiv.style.fontFamily = "'Courier New', Courier, monospace"; // Tipo de letra para coincidir con la tabla
    this.myDiv.style.fontSize = "18px"; // TamaÃ±o de letra de 18px para coincidir con la tabla
    this.myDiv.style.cursor = "pointer";
    //############################################################################
    this.shadowRoot.appendChild(style);

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    if (!this.hasAttribute("value")) {
      this.setAttribute("value", this.getAttribute("id"));
    }

    div.innerHTML = this.getAttribute("value");
    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
  }

  eventClickListener(ev) {
    var input = document.createElement("input");
    input.value = this.getAttribute("value");
    this.myDiv.innerText = "";
    this.myDiv.appendChild(input);
    input.focus();

    input.addEventListener("blur", (e) => {
      e.stopPropagation;
      this.setAttribute("value", e.currentTarget.value);
      this.myDiv.innerHTML = e.currentTarget.value;
      if (window.textBoxChange)
        textBoxChange(this.getAttribute("id"), e.currentTarget.value);
    });
    input.addEventListener("keypress", (e) => {
      e.stopPropagation;
      if (e.key === "Enter") {
        this.setAttribute("value", e.currentTarget.value);
        this.myDiv.innerHTML = e.currentTarget.value;
        if (window.textBoxChange)
          textBoxChange(
            this.getAttribute("id"),
            e.currentTarget.value
          );
      }
    });
    input.addEventListener("click", (e) => {
      e.stopPropagation;
    });
  }

  attributeChangedCallback(name, old, now) {
    switch (name) {
      case "value":
        this.myDiv.innerHTML = now;

        //this.setAttribute("value", e.currentTarget.value)
        //this.myDiv.innerHTML = e.currentTarget.value;
        if (window.textBoxChange)
          textBoxChange(this.getAttribute("id"), now);

        break;
    }
  }
 
  set value(newVal) {
    this.setAttribute("value", newVal);
  }

  get value() {
    return this.getAttribute("value");
  }
}
customElements.define("emic-widget-textbox", EmicWidgetTextBox);

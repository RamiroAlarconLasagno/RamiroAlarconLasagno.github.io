import { EmicWidget } from "./emicWidget.js";

class EmicWidgetSwitch extends EmicWidget {
  //static namesList = {};

  config = { backgrown: "green" };

  getNewID() {
    var i;

    for (i = 1; document.getElementById(`switch-${i}`) !== null; i++);
    //EmicWidgetSwitch.namesList[`switch-${i}`] = this;
    return `switch-${i}`;
  }
  static get observedAttributes() {
    return ["value"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!super.preconnectedCallback("Switch")) {
      return;
    }
    const label = document.createElement("label");
    label.classList.add("switch", "switch-green");

    let input = document.createElement("input");
    input.classList.add("switch-input");
    input.setAttribute("type", "checkbox");
    input.addEventListener("change", (e) => {
      let status = e.target.checked;
      this.setAttribute("value", status ? "1" : "0");  // Actualizo el atributo value
      if (window.switchToogle)
        switchToogle(this.getAttribute("id"), status ? "1" : "0");
    });

    label.appendChild(input);

    let span1 = document.createElement("span");
    span1.classList.add("switch-label");
    span1.setAttribute("data-on", "On");
    span1.setAttribute("data-off", "Off");
    label.appendChild(span1);

    let span2 = document.createElement("span");
    span2.classList.add("switch-handle");
    span2.setAttribute("data-on", "On");
    span2.setAttribute("data-off", "Off");
    label.appendChild(span2);

    //this.appendChild(element);
    const style = document.createElement("style");
    this.shadowRoot.appendChild(label);
    style.innerHTML = `
    /* Estilo para el contenedor del switch */
    .container > .switch {
      display: block;
      margin: 12px auto;
    }
    
    /* Estilo bÃ¡sico del switch */
    .switch {
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 80px;
      height: 40px;
      padding: 3px;
      background-color: white;
      border-radius: 18px;
      box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);
      cursor: pointer;
      background-image: linear-gradient(to bottom, #eeeeee, white 25px);
    }
    
    /* Estilo del input (oculto) dentro del switch */
    .switch-input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    
    /* Etiqueta para mostrar estado on/off */
    .switch-label {
      position: relative;
      display: block;
      height: inherit;
      font-size: 10px;
      text-transform: uppercase;
      background: #eceeef;
      border-radius: inherit;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);
      transition: 0.15s ease-out;
      transition-property: opacity background;
    }
    
    .switch-label:before, .switch-label:after {
      position: absolute;
      top: 50%;
      margin-top: -.5em;
      line-height: 1;
      transition: inherit;
    }
    
    .switch-label:before {
      content: attr(data-off);
      right: 11px;
      color: #aaa;
      text-shadow: 0 1px rgba(255, 255, 255, 0.5);
    }
    
    .switch-label:after {
      content: attr(data-on);
      left: 11px;
      color: white;
      text-shadow: 0 1px rgba(0, 0, 0, 0.2);
      opacity: 0;
    }
    
    /* Cambios cuando el switch estÃ¡ activado */
    .switch-input:checked ~ .switch-label {
      background: #47a8d8;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2);
    }
    
    .switch-input:checked ~ .switch-label:before {
      opacity: 0;
    }
    
    .switch-input:checked ~ .switch-label:after {
      opacity: 1;
    }
    
    /* El handle (circulo) dentro del switch */
    .switch-handle {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 250px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
      background-image: linear-gradient(to bottom, rgb(110, 159, 243) 40%, #6c79a7);
      transition: left 0.15s ease-out;
    }
    
    .switch-handle:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -13px 0 0 -12px;
      width: 25px;
      height: 25px;
      background: #f9f9f9;
      border-radius: 15px;
      box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);
      background-image: linear-gradient(to bottom, #1b86a4, white);
    }
    
    /* Cambios en el handle cuando el switch estÃ¡ activado */
    .switch-input:checked ~ .switch-handle {
      left: 40px;
      box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);
    }`;

    this.shadowRoot.appendChild(style);

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    this.setAttribute("title", this.getAttribute("id"));

    if (!this.hasAttribute("value")) {
      this.setAttribute("value", 0);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(name, old, now) {
    // He modificado esta parte para cambiar el estado del input checkbox
    // cuando cambia el atributo 'value'.
    if (name === "value" && now !== null) {  // Verifica que 'now' no sea null
      const input = this.shadowRoot.querySelector('.switch-input');
      input.checked = (now === "1");
    }
  }

  set value(newVal) {
    this.setAttribute("value", newVal);
  }

  get value() {
    return this.getAttribute("value");
  }
}

customElements.define("emic-widget-switch", EmicWidgetSwitch);



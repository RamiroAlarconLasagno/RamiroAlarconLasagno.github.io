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
      this.setAttribute("value", "220101"); // Fecha por defecto
    }

    this.inputDate.addEventListener("change", this.change);

    // Agregamos un listener al input para actualizar el atributo "value" cuando cambie
    this.inputDate.addEventListener("change", (event) => {
      console.log("Fecha cambiada", event.target.value);
      console.log("Nombre", this.getAttribute("id"));

      // Convertir la fecha del formato 'AAAA-MM-DD' al formato 'aaMMDD'
      let originalDate = event.target.value; 
      let newFormat = originalDate.slice(2, 4) + originalDate.slice(5, 7) + originalDate.slice(8, 10);

      this.setAttribute("value", newFormat); // Guardar en el nuevo formato
      if (window.inputDateChange)
        inputDateChange(this.getAttribute("id"), newFormat); // Usar el nuevo formato aquÃ­ tambiÃ©n
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
        // Convertir la fecha del formato 'aaMMDD' al formato 'AAAA-MM-DD'
        let year = '20' + now.slice(0, 2);   // Asume que estamos en el siglo XXI (aÃ±os 2000)
        let month = now.slice(2, 4);
        let day = now.slice(4, 6);
        let formattedDate = `${year}-${month}-${day}`;
  
        this.inputDate.value = formattedDate;
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

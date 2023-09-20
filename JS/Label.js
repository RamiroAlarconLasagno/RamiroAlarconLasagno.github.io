import { EmicWidget } from "./emicWidget.js";

class EmicWidgetLabel extends EmicWidget {
  static namesList = {};
  myLabel;
  //-----------------------------------------------------------------------------------
  //                   MÃ©todo para obtener un nuevo ID
  //-----------------------------------------------------------------------------------
  // Este mÃ©todo se utiliza para generar un nuevo ID Ãºnico para el elemento.
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`label-${i}`) !== null; i++);
    return `label-${i}`;
  }

  //-----------------------------------------------------------------------------------
  //                               Constructor
  //-----------------------------------------------------------------------------------
  // El constructor de la clase. Llama al constructor de la clase padre y crea un Shadow DOM.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //-----------------------------------------------------------------------------------
  //               Cuando el elemento es conectado al DOM
  //-----------------------------------------------------------------------------------
  // Este mÃ©todo se ejecuta cuando el elemento personalizado se conecta al DOM.
  connectedCallback() {
    if (!super.preconnectedCallback("Label")) {
      return;
    }
    const div = document.createElement("div");
    div.innerText = this.getAttribute("text_val");
    this.myLabel = div;
    const style = document.createElement("style");
    this.shadowRoot.appendChild(div);
    this.shadowRoot.appendChild(style);
    //############################################################################
    // Aplicamos los estilos usando los atributos personalizados
    this.applyStyles();
    //############################################################################


    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
  
    if (!this.hasAttribute("text_val")) {
      this.setAttribute("text_val", this.getAttribute("id"));
    }
  
    if (!this.hasAttribute("label-height")) {
      this.setAttribute("label-height", "40px");
    }
  
    if (!this.hasAttribute("label-font-size")) {
      this.setAttribute("label-font-size", "18px");
    }
  
    if (!this.hasAttribute("label-font-family")) {
      this.setAttribute("label-font-family", "'Courier New', Courier, monospace");
    }
  
    if (!this.hasAttribute("label-bg-color")) {
      this.setAttribute("label-bg-color", "transparent");
    }
  
    if (!this.hasAttribute("label-line-height")) {
      this.setAttribute("label-line-height", "40px");
    }

    if (!this.hasAttribute("label-font-weight")) {
      this.setAttribute("label-font-weight", "normal"); // Puedes usar valores como "bold", "bolder", o nÃºmeros como "400", "700", etc.
    }
    
    if (!this.hasAttribute("label-color")) {
      this.setAttribute("label-color", "#000000"); // Puedes usar cualquier valor de color vÃ¡lido aquÃ­.
    }

    div.textContent = this.getAttribute("text_val");
    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
  }
  
  applyStyles() {
    this.myLabel.style.height = this.getAttribute("label-height") || "40px";
    this.myLabel.style.fontSize = this.getAttribute("label-font-size") || "12px";
    this.myLabel.style.fontFamily = this.getAttribute("label-font-family") || "'Courier New', Courier, monospace";
    this.myLabel.style.backgroundColor = this.getAttribute("label-bg-color") || "transparent";
    this.myLabel.style.lineHeight = this.getAttribute("label-line-height") || "40px";
    this.myLabel.style.fontWeight = this.getAttribute("label-font-weight");
    this.myLabel.style.color = this.getAttribute("label-color");
  }

  //-----------------------------------------------------------------------------------
  //                            Cuando se hace click
  //-----------------------------------------------------------------------------------
  // Este mÃ©todo se ejecuta cuando se hace clic en el elemento personalizado.
  eventClickListener(ev) {
    // AquÃ­ puedes implementar la lÃ³gica del evento 'click' del Web Component
  }

  //-----------------------------------------------------------------------------------
  //                               Si hay cambios
  //-----------------------------------------------------------------------------------
  // Este mÃ©todo define los atributos que se deben observar para detectar cambios.
  static get observedAttributes() {
    return ["text_val", "label-height", "label-font-size", "label-font-family", "label-bg-color", "label-line-height",'label-font-weight', 'label-color'];
  }

  // Se ejecuta cuando hay cambios en los atributos observados
  attributeChangedCallback(name, old, now) {
    if (typeof this.myLabel === "undefined") return;

    if (name === "text_val") {
      this.myLabel.textContent = now;
    } else {
      // Si cambian los atributos de estilo, aplicamos de nuevo los estilos.
      this.applyStyles();
    }
  }

  set text_val(newVal) {
    this.setAttribute("text_val", newVal);
  }

  get text_val() {
    return this.getAttribute("text_val");
  }

  set labelHeight(newVal) {
    this.setAttribute("label-height", newVal);
  }

  get labelHeight() {
    return this.getAttribute("label-height");
  }

  set labelFontSize(newVal) {
    this.setAttribute("label-font-size", newVal);
  }

  get labelFontSize() {
    return this.getAttribute("label-font-size");
  }

  set labelFontFamily(newVal) {
    this.setAttribute("label-font-family", newVal);
  }

  get labelFontFamily() {
    return this.getAttribute("label-font-family");
  }

  set labelBgColor(newVal) {
    this.setAttribute("label-bg-color", newVal);
  }

  get labelBgColor() {
    return this.getAttribute("label-bg-color");
  }

  set labelLineHeight(newVal) {
    this.setAttribute("label-line-height", newVal);
  }

  get labelLineHeight() {
    return this.getAttribute("label-line-height");
  }
  get labelFontWeight() {
    return this.getAttribute("label-font-weight");
  }
  
  set labelFontWeight(value) {
    this.setAttribute("label-font-weight", value);
  }
  
  get labelColor() {
    return this.getAttribute("label-color");
  }
  
  set labelColor(value) {
    this.setAttribute("label-color", value);
  }

}

// Se registra el elemento personalizado en el navegador.
customElements.define("emic-widget-label", EmicWidgetLabel);

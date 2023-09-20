// Importamos la clase EmicWidget
import { EmicWidget } from "./emicWidget.js";

// Clase EmicWidgetOptionChooser que hereda de EmicWidget
class EmicWidgetOptionChooser extends EmicWidget {
  //-----------------------------------------------------------------------------
  // Variables estÃ¡ticas y miembros de la clase
  //-----------------------------------------------------------------------------
  static namesList = {};
  optionChooser;
  optionPanel; 

  //-----------------------------------------------------------------------------
  // Constructor
  //-----------------------------------------------------------------------------
  constructor() {
    super(); // Llamada al constructor padre
    this.attachShadow({ mode: "open" });
  }

  //-----------------------------------------------------------------------------
  // MÃ©todo para obtener un nuevo ID Ãºnico
  //-----------------------------------------------------------------------------
  getNewID() {
    var i;
    for (i = 1; EmicWidgetOptionChooser.namesList[`optionChooser-${i}`]; i++);
    EmicWidgetOptionChooser.namesList[`optionChooser-${i}`] = this;
    return `optionChooser-${i}`;
  }

  //-----------------------------------------------------------------------------
  // MÃ©todo que se ejecuta cuando el componente se conecta al DOM
  //-----------------------------------------------------------------------------
  connectedCallback() {
    // Comprobar si la preconexiÃ³n fue exitosa antes de continuar
    if (!super.preconnectedCallback("OptionChooser")) {
      return;
    }
  
    // Crear el panel para contener el optionChooser y el control de arrastre
    this.optionPanel = document.createElement("div");
    this.optionPanel.className = "emic-dash-panel";
    this.optionPanel.style.display = "flex";  // Establecer el layout a flexbox
    this.optionPanel.style.flexDirection = "row";  // Alinear elementos como una fila
    this.optionPanel.style.height = "40px";
    this.optionPanel.style.lineHeight = "40px"; // Centra el texto verticalmente al hacerlo igual a la altura
    this.optionPanel.style.border = "2px solid #008CBA"; // Borde azul para coincidir con la tabla
    this.optionPanel.style.borderRadius = "1px"; // Borde redondeado para coincidir con la tabla
    this.optionPanel.style.backgroundColor = "transparent"; // Fondo celeste claro para coincidir con la tabla

  // Para poder arrastrar ------------------------------------------------------
    // Crear el control de arrastre
    const dragHandle = document.createElement("div");
    dragHandle.className = "drag-handle";
    
    // Establecer dimensiones y otros estilos para el recuadro de arrastre
    dragHandle.style.width = "10px";
    dragHandle.style.height = "40px";
    dragHandle.style.backgroundColor = "transparent";
    dragHandle.style.cursor = "grab";  // Cambia el cursor a una mano al pasar por encima
    // Para poder arrastrar fin ------------------------------------------------------
    
    // Crear el elemento optionChooser (select) y asignarle una clase
    this.optionChooser = document.createElement("select");
    this.optionChooser.className = "form-control";
  

    // Aplicar tipo y tamaÃ±o de letra al optionChooser
    this.optionChooser.style.fontFamily = "'Courier New', Courier, monospace"; // Tipo de letra para coincidir con la tabla
    this.optionChooser.style.fontSize = "18px"; // TamaÃ±o de letra de 18px para coincidir con la tabla
    this.optionChooser.style.cursor = "pointer";
    // Llamar al mÃ©todo para llenar el contenido del optionChooser
    this.generateOptionChooserContent();
  
    // Asignar un ID si no hay uno definido
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
  
    // AÃ±adir el control de arrastre y el optionChooser al panel
    this.optionPanel.appendChild(dragHandle);
    this.optionPanel.appendChild(this.optionChooser);
  
    // AÃ±adir el panel al Shadow DOM del componente
    this.shadowRoot.appendChild(this.optionPanel);
  
    // AÃ±adir evento para detectar cambios en el optionChooser
    this.optionChooser.addEventListener("change", this.change.bind(this));
  
    super.connectedCallback();
  }
 
  //-----------------------------------------------------------------------------
  // MÃ©todo para llenar el contenido del optionChooser
  //-----------------------------------------------------------------------------
  generateOptionChooserContent() {
    // AÃ±adir una opciÃ³n por defecto al optionChooser
    const defaultOption = document.createElement("option");
    //defaultOption.text = "Seleccion";
    //defaultOption.value = "Seleccion";
    defaultOption.selected = false;
    this.optionChooser.appendChild(defaultOption);
  }
  
  //-----------------------------------------------------------------------------
  // MÃ©todo que se ejecuta cuando hay un cambio en el optionChooser
  //-----------------------------------------------------------------------------

  change(event) {
    const selectedText = event.target.options[event.target.selectedIndex].text; // Obtener el texto seleccionado
    const selectedValue = event.target.value; // Obtener el valor seleccionado

    console.log(this.getAttribute("id"), " value=", selectedValue);
    console.log(this.getAttribute("id"), " text=", selectedText);

    // Actualizar los atributos del componente para reflejar los cambios en el DOM
    this.setAttribute("value", selectedValue);
    this.setAttribute("text", selectedText);

    // Si hay una funciÃ³n global llamada optionChooserChange, invocarla
    if (window.optionChooserChange) {
      window.optionChooserChange(this.getAttribute("id"), selectedValue);
    }
  }


  //-----------------------------------------------------------------------------
  // MÃ©todo para aÃ±adir una nueva opciÃ³n al optionChooser
  //-----------------------------------------------------------------------------
  addOption(label, value) {
    const option = document.createElement("option");
    option.text = label;
    option.value = value;
    this.optionChooser.appendChild(option);
  }

  //-----------------------------------------------------------------------------
  // Atributos observados por el componente
  //-----------------------------------------------------------------------------
  static get observedAttributes() {
    return ["value", "text"];
  }

  //-----------------------------------------------------------------------------
  // MÃ©todo que se ejecuta cuando hay cambios en los atributos del componente
  //-----------------------------------------------------------------------------
  attributeChangedCallback(name, old, now) {
    if (typeof this.optionChooser === "undefined") return;
    switch (name) {
      case "value":
        this.optionChooser.value = now;
        break;
      case "text":
        // Suponiendo que el primer elemento es siempre el defaultOption
        this.optionChooser.querySelector("option").text = now;
        break;
    }
  }

  //-----------------------------------------------------------------------------
  // MÃ©todos get y set para los atributos del componente
  //-----------------------------------------------------------------------------
  // MÃ©todos get y set para los atributos del componente
  get value() {
    return this.getAttribute("value");
  }

  set value(newVal) {
    this.setAttribute("value", newVal);
    // Actualizar en el DOM
    if (this.optionChooser) {
      this.optionChooser.value = newVal;
    }
  }

  // Nuevo getter y setter para "text"
  get text() {
    return this.getAttribute("text");
  }

  set text(newText) {
    this.setAttribute("text", newText);
    // Actualizar en el DOM
    if (this.optionChooser) {
      const defaultOption = this.optionChooser.querySelector("option");
      defaultOption.text = newText;
    }
  }
}
// Registro del nuevo elemento personalizado "emic-widget-optionChooser"
customElements.define("emic-widget-optionchooser", EmicWidgetOptionChooser);

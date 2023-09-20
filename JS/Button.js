import { EmicWidget } from "./emicWidget.js";

class EmicWidgetButton extends EmicWidget {
  //-----------------------------------------------------------------------------------
  // Definimos variables.
  //-----------------------------------------------------------------------------------
  static namesList = {};
  myDiv;

  TinicioClick;
  TfinClick;
  TDuracionClick;
  //-----------------------------------------------------------------------------------
  // Constructor.
  //-----------------------------------------------------------------------------------
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  //-----------------------------------------------------------------------------------
  // MÃ©todo para obtener un nuevo ID.
  //-----------------------------------------------------------------------------------
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`button-${i}`) !== null; i++);
    return `button-${i}`;
  }

  //-----------------------------------------------------------------------------------
  // Cuando el elemento es conectado al DOM
  //-----------------------------------------------------------------------------------
  connectedCallback() {
    if (!super.preconnectedCallback("Button")) {
      return;
    }
    const img = document.createElement("img");
    img.src =
      "/dashboard/ing.ramiro.a.l@gmail.com/Dashboard2/Indoor/images/icons/btn.png";
    img.alt = "imagen pulsador emic";
    this.shadowRoot.appendChild(img);

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    // Mostrar identificador
    this.setAttribute("title", this.getAttribute("id"));

    img.style = "width:50px; height:50px;";
    //----------------------------------------------------
    // Se define las llamadas a los eventos

    //img.addEventListener('click', this.presionado);
    img.addEventListener("mousedown", this.presionado.bind(this));
    img.addEventListener("mouseup", this.soltado.bind(this));
    //----------------------------------------------------
    super.connectedCallback();
  }

  presionado() {
    this.TinicioClick = new Date();
    console.log(this.getAttribute("id"), "presionado");

    if (window.buttonPress) buttonPress(this.getAttribute("id"));
  }
  soltado() {
    this.TfinClick = new Date();
    this.TDuracionClick = this.TfinClick - this.TinicioClick;
    console.log(this.getAttribute("id"), "soltado en :" + this.TDuracionClick + "[ms]");

    if (window.buttonRelease)
      buttonRelease(this.getAttribute("id"), this.TDuracionClick);
  }
  //-----------------------------------------------------------------------------------
  // Si hay cambios en tiempo de ejecucion.
  //-----------------------------------------------------------------------------------
  static get observedAttributes() {
    return ["value"];
  }
}

customElements.define("emic-widget-button", EmicWidgetButton);


class emicWidgetProperties extends HTMLElement  {
	
	data = null;
	config = null;
	atributos = null;
	target = null;

  //****************************************************************************/
  //                               Constructor
  //****************************************************************************/
  // El constructor de la clase. Llama al constructor de la clase padre y crea un Shadow DOM.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(event) {
    if (event.type === "user:data-message") {
      this.config = event.target.config;
      this.atributos = event.target.attributes;
      this.target = event.target;
      this.data = event.detail;
      this.render();
    }
  }
  //****************************************************************************/
  //               Cuando el elemento es conectado al DOM
  //****************************************************************************/
  // Este mÃ©todo se ejecuta cuando el elemento personalizado se conecta al DOM.
  connectedCallback() {
    document.addEventListener("user:data-message", this);
  }



  render() {

    // ----------Agregado por Ramiro -----------
    // Encuentra el elemento ul existente (si existe)
    var existingUl = this.shadowRoot.querySelector("ul");
    
    // Si existe, elimÃ­nalo
    if (existingUl) {
      existingUl.remove();
    } 
    //------------------------------------------

    var ul = document.createElement("ul");
    console.log("ul: " , ul);

    this.shadowRoot.appendChild(ul);

    // Itera a travÃ©s de los atributos en orden inverso
    for (var i = this.atributos.length - 1; i >= 0; i--) {
      
      var li = document.createElement("li"); // Crea un nuevo elemento <li> para cada atributo
      li.innerText = this.atributos[i].name; // Establece el texto del <li> con el nombre del atributo

      // Crea un nuevo elemento <input> y establece su valor y ref (nombre del atributo)
      var inp = document.createElement("input");
      inp.value = this.atributos[i].value;
      inp.ref = this.atributos[i].name;

      // Define el evento onchange para el <input>
      inp.onchange = (e) => {
        // Cuando cambia el valor del <input>, actualiza el atributo correspondiente en el elemento this.target
        this.target.setAttribute(e.target.ref, e.target.value);
      };

      // Agrega el <input> como hijo del <li>
      li.appendChild(inp);
      // Agrega el <li> como hijo del <ul>
      ul.appendChild(li);
   
      //ul.appendChild (createElement("li").appendChild(inp));
      //this.shadowRoot.innerHTML += `<li>  ${this.atributos[i].name} : <input value=${this.atributos[i].value} /> </li>`;
    }

    //this.shadowRoot.innerHTML += "</ul>";

    //for(const [key, value] of Object.entries(this.a)){
    //  this.shadowRoot.innerHTML += `${key}:${value}`;
    //}
    
  }
}

// Se registra el elemento personalizado en el navegador. 
customElements.define("emic-widget-properties", emicWidgetProperties);

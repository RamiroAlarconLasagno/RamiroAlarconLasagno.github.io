
import { EmicWidget } from "./emicWidget.js";

// FunciÃ³n de utilidad para intentar parsear JSON
function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str; // Si el anÃ¡lisis falla, devolver la cadena original
  }
}

class EmicWidgetHistorical extends EmicWidget {
  static namesList = {};
  myHistorical;
  chartCheckInterval;

  //****************************************************************************/
  //                   MÃ©todo para obtener un nuevo ID
  //****************************************************************************/
  getNewID() {
    let i;
    for (i = 1; EmicWidgetHistorical.namesList[`historical-${i}`]; i++);
    EmicWidgetHistorical.namesList[`historical-${i}`] = this;
    return `historical-${i}`;
  }

  //****************************************************************************/
  //                               Constructor
  //****************************************************************************/
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //****************************************************************************/
  //               Cuando el elemento es conectado al DOM
  //****************************************************************************/
  // Cuando el elemento es conectado al DOM
  connectedCallback() {
    if (!super.preconnectedCallback("Historical")) {
      return;
    }
    //------- Agregamos atributos---------------
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    if (!this.hasAttribute("label")) {
      // CorrecciÃ³n: Establecer un valor mÃ¡s representativo
      this.setAttribute("label", JSON.stringify(" ")); 
    }
    if (!this.hasAttribute("data-labels")) {
      // CorrecciÃ³n: Establecer un valor mÃ¡s representativo
      this.setAttribute("data-labels", JSON.stringify(" ")); 
    }
  
    if (!this.hasAttribute("data-values")) {
      // Establecer valores de ejemplo para los atributos
      this.setAttribute("data-values", JSON.stringify([
        [0]]
        // Agregar mÃ¡s conjuntos de datos si es necesario
      ));
    }
    //------- Fin Agregamos atributos---------------
  
    if (typeof Chart === "undefined") {  // VerificaciÃ³n de Chart.js
      const img = document.createElement("img");
      img.src = "/dashboard/ing.ramiro.a.l@gmail.com/Dashboard2/Indoor/images/icons/grafica.png";
      img.alt = "imagen Emic";
      img.style = "width:800px; height:250px;";
      this.shadowRoot.appendChild(img);
    }
    else {
      // Crear un canvas para el grÃ¡fico
      this.canvas = document.createElement("canvas");
  
      // Aplicar estilo al canvas para agregar un recuadro
      this.canvas.style.border = "1px solid black";
      this.canvas.style.padding = "10px";
      this.canvas.style.backgroundColor = "white";
      this.canvas.style.width = "800px"; // Puedes ajustar esto a tus necesidades
      this.canvas.style.height = "250px"; // Puedes ajustar esto a tus necesidades
  
      this.shadowRoot.appendChild(this.canvas);
  
      this.createChart(); // Llamamos a la funciÃ³n para crear el grÃ¡fico
    }
    super.connectedCallback();
  }
  
  // FunciÃ³n para crear y configurar el grÃ¡fico utilizando los valores de los atributos
  createChart() {
    const labels = tryParseJSON(this.getAttribute("data-labels"));
    const datasets = tryParseJSON(this.getAttribute("data-values"));
    const labelNames = tryParseJSON(this.getAttribute("label"));
    const canvas = this.canvas; // Usamos el canvas previamente creado
    
  
  // Asegurar que el nÃºmero de conjuntos de datos coincida con el nÃºmero de etiquetas
  while (datasets.length < labelNames.length) {
    datasets.push([]);
  }
  datasets.length = labelNames.length; // Si hay mÃ¡s conjuntos, truncar la cantidad

    this.chart = new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets.map((data, index) => ({
          label: labelNames[index], // Usar el nombre correspondiente
          data: data,
          fill: true,
          borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
          tension: 0.1,
        })),
      },
      options: {
        scales: {
          x: [
            {
              ticks: {
                autoSkip: false,
                maxRotation: 45, // Rotar las etiquetas en un Ã¡ngulo de 45 grados
                minRotation: 0,
              },
            },
          ],
        },
      },
    });
  }
  
  
  //****************************************************************************/
  //                               Si hay cambios
  //****************************************************************************/
  attributeChangedCallback(name, old, now) {
    if (old !== now && this.chart) {
      if (name === "data-labels") {
        const newLabels = tryParseJSON(now);
        if (Array.isArray(newLabels)) {
          this.chart.data.labels = newLabels;
        } else {
          console.error("data-labels no es un array vÃ¡lido");
        }
      } else if (name === "data-values") {
        const newValues = tryParseJSON(now);
        const labelNames = tryParseJSON(this.getAttribute("label"));
    
        if (Array.isArray(newValues) && Array.isArray(labelNames)) {
          if (newValues.length === labelNames.length) {
            this.chart.data.datasets = newValues.map((data, index) => {
              return {
                label: labelNames[index],
                data: data,
                fill: false,
                // Si el Ã­ndice es 0, establece el color a azul. De lo contrario, asigna un color aleatorio.
                borderColor: index === 0 ? 'rgb(100, 149, 237)' : `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
                tension: 0.1,
              };
            });
          } else {
            console.error("La longitud de newValues y labelNames debe ser la misma");
          }
        } else {
          console.error("newValues o labelNames no son arrays vÃ¡lidos");
        }
      } else if (name === "label") {
        const labelNames = tryParseJSON(now);
        if (Array.isArray(labelNames)) {
          this.chart.data.datasets.forEach((dataset, index) => {
            dataset.label = labelNames[index];
          });
        } else {
          console.error("label no es un array vÃ¡lido");
        }
      }
      this.chart.options.animation = false;
      this.chart.update();
      
    }
  }
  
  
  static get observedAttributes() {
    return ["data-labels", "data-values", "label"];
  }
  
  //****************************************************************************/
  //               Cuando el elemento es desconectado del DOM
  //****************************************************************************/
  disconnectedCallback() {
    clearInterval(this.chartCheckInterval);  // Detener el intervalo
  }
  
}

customElements.define("emic-widget-historical", EmicWidgetHistorical);

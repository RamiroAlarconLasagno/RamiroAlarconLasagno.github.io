

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

  getNewID() {
    let i;
    for (i = 1; EmicWidgetHistorical.namesList[`historical-${i}`]; i++);
    EmicWidgetHistorical.namesList[`historical-${i}`] = this;
    return `historical-${i}`;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!super.preconnectedCallback("Historical")) {
      return;
    }

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    if (!this.hasAttribute("widthGraph")) {
      this.setAttribute("widthGraph", "800px");
    }
    if (!this.hasAttribute("heightGraph")) {
      this.setAttribute("heightGraph", "250px");
    }

    if (!this.hasAttribute("label")) {
      this.setAttribute("label", JSON.stringify(" "));
    }

    if (!this.hasAttribute("data-labels")) {
      this.setAttribute("data-labels", JSON.stringify(" "));
    }

    if (!this.hasAttribute("data-values")) {
      this.setAttribute("data-values", JSON.stringify([[0]]));
    }

    if (typeof Highcharts === "undefined") {  // VerificaciÃ³n de Highcharts
      const img = document.createElement("img");
      img.src = "/dashboard/ing.ramiro.a.l@gmail.com/Dashboard2/Indoor/images/icons/grafica.png";
      img.alt = "imagen Emic";
      img.style = "width:800px; height:250px;";
      this.shadowRoot.appendChild(img);
    }
    else {
      // Crear un div para el grÃ¡fico
      this.chartDiv = document.createElement("div");
      this.chartDiv.style.width = "800px"; 
      this.chartDiv.style.height = "250px"; 
      this.shadowRoot.appendChild(this.chartDiv);
      
      this.createChart(); // Llamamos a la funciÃ³n para crear el grÃ¡fico
    }
    super.connectedCallback();
  }
  // FunciÃ³n para descargar el grÃ¡fico


  createChart() {
  const labels = tryParseJSON(this.getAttribute("data-labels"));
  const datasets = tryParseJSON(this.getAttribute("data-values"));
  const labelNames = tryParseJSON(this.getAttribute("label"));
  const chartDiv = this.chartDiv;

  this.chart = Highcharts.chart(chartDiv, {
    chart: {
      type: 'line',
      zoomType: 'xy', // Habilitar el zoom y paneo
      panKey: 'shift',
      panning: true,
      // Agregar la configuraciÃ³n para mover el botÃ³n 'Reset Zoom'
      resetZoomButton: {
        position: {
          align: 'left', 
          verticalAlign: 'top', 
          x: 700,
          y: 210
        },
        relativeTo: 'chart'
      }
    },
    exporting: { // Habilitar botones de exportaciÃ³n
      enabled: true,
      buttons: {
        contextButton: { // ConfiguraciÃ³n del botÃ³n contextual
          menuItems: [
            'printChart', // Imprimir grÃ¡fico
            'separator', // Separador
            'downloadPNG', // Descargar como PNG
            'downloadJPEG', // Descargar como JPEG
            'downloadPDF', // Descargar como PDF
            'downloadSVG' // Descargar como SVG
          ]
        }
      }
    },
    title: {
      text: null // Eliminar el tÃ­tulo
    },
    xAxis: {
      categories: labels,
      labels: {
        rotation: -30, // Ãngulo de rotaciÃ³n a 0
        useHTML: true, // Permitir el uso de HTML para mayor control
        style: {
          "white-space": "normal" // Permitir saltos de lÃ­nea
        }
      }
    },
    yAxis: {
      title: {
        text: 'Valores'
      }
    },
    exporting: { // Habilitar botones de exportaciÃ³n
      enabled: true
    },
    legend: { // Leyenda interactiva
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
      useHTML: true,
      labelFormatter: function() {
        return `<div onclick="alert('${this.name}')">${this.name}<div>`;
      }
    },
    series: datasets.map((data, index) => ({
      name: labelNames[index], 
      data: data
    })),
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: true,
        animation: false 
      }
    },
    tooltip: { // Tooltip personalizado
      formatter: function() {
        return `<b>${this.series.name}</b><br>${this.x}: ${this.y}`;
      }
    }
  });

}


  attributeChangedCallback(name, old, now) {
    if (old !== now && this.chart) {
       // Verifica si 'widthGraph' ha cambiado
       if (name === "widthGraph") {
        // Actualiza el ancho del canvas
        if (this.canvas) {
          this.canvas.style.width = `${now}px`; // Suponiendo que 'now' contiene un valor numÃ©rico
        }
        // Actualiza el ancho de la imagen, si existe
        const img = this.shadowRoot.querySelector("img");
        if (img) {
          img.style.width = `${now}px`;
        }
      }
      
      // Verifica si 'heightGraph' ha cambiado
      if (name === "heightGraph") {
        // Actualiza la altura del canvas
        if (this.canvas) {
          this.canvas.style.height = `${now}px`; // Suponiendo que 'now' contiene un valor numÃ©rico
        }
        // Actualiza la altura de la imagen, si existe
        const img = this.shadowRoot.querySelector("img");
        if (img) {
          img.style.height = `${now}px`;
        }
      }
      if (name === "data-labels" || name === "data-values" || name === "label") {
        this.createChart(); // Simplemente volvemos a crear el grÃ¡fico
      }
    }
  }

  static get observedAttributes() {
    return ["data-labels", "data-values", "label", "widthGraph", "heightGraph"];
  }
  
  disconnectedCallback() {
    // No es necesario detener el intervalo en Highcharts
  }
}

customElements.define("emic-widget-historical", EmicWidgetHistorical);

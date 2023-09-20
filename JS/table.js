import { EmicWidget } from "./emicWidget.js";

class EmicWidgetTable extends EmicWidget {
  static namesList = {};
  myDiv;

  //****************************************************************************/
  //                   MÃ©todo para obtener un nuevo ID
  //****************************************************************************/
  // Este mÃ©todo se utiliza para generar un nuevo ID Ãºnico para el elemento.
  getNewID() {
    var i;
    for (i = 1; EmicWidgetTable.namesList[`table-${i}`]; i++);
    EmicWidgetTable.namesList[`table-${i}`] = this;
    return `table-${i}`;
  }
  
  //****************************************************************************/
  //                               Constructor
  //****************************************************************************/
  // El constructor de la clase. Llama al constructor de la clase padre y crea un Shadow DOM.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //****************************************************************************/
  //               Cuando el elemento es conectado al DOM
  //****************************************************************************/
  // Este mÃ©todo se ejecuta cuando el elemento personalizado se conecta al DOM.
  connectedCallback() {
    // Verificar si se ha preconectado correctamente antes de continuar
    if (!super.preconnectedCallback("Table")) {
      return;
    }

    // Crea un nuevo elemento HTML <table> y lo asigna a la variable 'table'
    const table = document.createElement("table");
    // Asigna el elemento 'table' al atributo 'myDiv' de la instancia actual de la clase
    this.myDiv = table;
    // Crea un nuevo elemento HTML <style> y lo asigna a la variable 'style'
    const style = document.createElement("style");
    // Agrega el elemento 'table' como hijo del Shadow DOM de este componente
    this.shadowRoot.appendChild(table);
    // Agrega el elemento 'style' como hijo del Shadow DOM de este componente
    this.shadowRoot.appendChild(style);

    // Establecer un nuevo ID si no se ha proporcionado uno
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    // Generar el contenido de la tabla
    this.generateTableContent();

    // Agregar estilos CSS para el borde de la tabla
    style.textContent = `
      table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'Courier New', Courier, monospace;
        font-size: 18px;  /* TamaÃ±o de letra de 18px */
      }
      td, th {
        border: 2px solid #008CBA;
        text-align: center;
        padding: 16px;
        border-radius: 16px;
      }
      tr:nth-child(even) {
        background-color: #e6f7ff;
      }
      th {
        background-color: #333;
        color: white;
      }
    `;

    // Agregar un event listener para el clic
    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
  }

  generateTableContent() {
    const table = this.myDiv;
  
    // Verificar si ya existe una tabla
    if (table.rows.length > 0) {
      // Guardar los valores existentes en un array bidimensional
      const values = [];
      for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowData = [];
        for (let j = 0; j < row.cells.length; j++) {
          const cell = row.cells[j];
          rowData.push(cell.textContent);
        }
        values.push(rowData);
      }
  
      // Eliminar la tabla existente
      table.innerHTML = "";
  
      // Obtener las nuevas dimensiones de la tabla
      const cellRows = this.getAttribute("cell-rows") || 2;
      const cellColumns = this.getAttribute("cell-columns") || 2;
  
      // Redimensionar la tabla
      for (let i = 0; i < cellRows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cellColumns; j++) {
          const cell = document.createElement("td");
          row.appendChild(cell);
        }
        table.appendChild(row);
      }
  
      // Colocar los valores guardados en la nueva tabla
      for (let i = 0; i < cellRows; i++) {
        const row = table.rows[i];
        for (let j = 0; j < cellColumns; j++) {
          const cell = row.cells[j];
          // Verificar si aÃºn quedan valores guardados por colocar
          if (i < values.length && j < values[i].length) {
            cell.textContent = values[i][j];
          } else {
            // No hay mÃ¡s valores guardados, colocar "_"
            cell.textContent = "_";
          }
        }
      }
    } else {
      // No existe una tabla previa, generar una nueva tabla con las dimensiones especificadas
      const cellRows = this.getAttribute("cell-rows") || 2;
      const cellColumns = this.getAttribute("cell-columns") || 2;
  
      for (let i = 0; i < cellRows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cellColumns; j++) {
          const cell = document.createElement("td");
          cell.textContent = "_";
          row.appendChild(cell);
        }
        table.appendChild(row);
      }
    }
  }

  //****************************************************************************/
  //                               Si hay cambios
  //****************************************************************************/
    // Este mÃ©todo define los atributos que se deben observar para detectar cambios.
    static get observedAttributes() {
      return ["cell-rows", "cell-columns"];
    }
  
    attributeChangedCallback(name, old, now) {
      // Verificar si el valor del atributo ha cambiado
      if (old !== now) {
        // Verificar si el atributo modificado es "cell-rows" o "cell-columns"
        if (name === "cell-rows" || name === "cell-columns") {
          // Regenerar el contenido de la tabla
          this.generateTableContent();
        }
      }
    }
  
    // Setter para el atributo "dimensiones"
    set dimensiones(value) {
      // Separar el valor en celdas y columnas
      const [cellRows, cellColumns] = value.split(",");
      // Establecer los atributos "cell-rows" y "cell-columns" con los nuevos valores
      this.setAttribute("cell-rows", cellRows);
      this.setAttribute("cell-columns", cellColumns);
    }
  
    // Getter para el atributo "dimensiones"
    get dimensiones() {
      // Obtener el valor actual de los atributos "cell-rows" y "cell-columns"
      const cellRows = this.getAttribute("cell-rows") || 2;
      const cellColumns = this.getAttribute("cell-columns") || 2;
      // Devolver el valor en formato "celdas,columnas"
      return `${cellRows},${cellColumns}`;
    }
  
    // Setter para el atributo "valCelCol"
    set valCelCol(value) {
      // Separar el valor en fila, columna y valor de la celda
      const [cell, column, cellValue] = value.split(",");
      // Obtener la referencia a la tabla
      const table = this.myDiv;
      // Obtener el nÃºmero de filas en la tabla
      const rowCount = table.rows.length;
  
      // Verificar si el Ã­ndice de fila es vÃ¡lido y estÃ¡ dentro del rango
      if (rowCount > cell && cell >= 0) {
        // Obtener la fila correspondiente al Ã­ndice especificado
        const targetRow = table.rows[cell];
        // Obtener el nÃºmero de celdas en la fila
        const cellCount = targetRow.cells.length;
  
        // Verificar si el Ã­ndice de columna es vÃ¡lido y estÃ¡ dentro del rango
        if (cellCount > column && column >= 0) {
          // Obtener la celda correspondiente al Ã­ndice especificado
          const targetCell = targetRow.cells[column];
          // Asignar el valor especificado como contenido de la celda
          targetCell.textContent = cellValue;
        } else {
          console.error("Column index out of range or invalid.");
        }
      } else {
        console.error("Row index out of range or invalid.");
      }
    }
    
  }

customElements.define("emic-widget-table", EmicWidgetTable);

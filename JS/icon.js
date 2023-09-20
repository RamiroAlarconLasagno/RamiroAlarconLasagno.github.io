import { EmicWidget } from "./emicWidget.js";

class EmicWidgetIcon extends EmicWidget {
  //-----------------------------------------------------------------------------------
  // Definimos variables.
  //-----------------------------------------------------------------------------------
  static namesList = {};
  myDiv;

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
    for (i = 1; document.getElementById(`icon-${i}`) !== null; i++);
    return `icon-${i}`;
  }

  //-----------------------------------------------------------------------------------
  // Cuando el elemento es conectado al DOM
  //-----------------------------------------------------------------------------------
  connectedCallback() {
    if (!super.preconnectedCallback("Icon")) {
      return;
    }

    //const upload = function uploadFile() {
    //	let formData = new FormData();
    //	//formData.append("file", fileupload.files[0]);
    //	fetch('/Webservice2.asmx/UploadFile', {
    //	  method: "POST",
    //	  body: formData
    //	});
    //	alert('The file has been uploaded successfully.');
    //}

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    //if (!this.hasAttribute('value')) {
    //    this.setAttribute('value', this.getAttribute("id"));
    //}

    const div = document.createElement("div");
    const img = document.createElement("img");
    const form = document.createElement("form");
    const inputPath = document.createElement("input");
    const inputFile = document.createElement("input");

    if (this.hasAttribute("src")) {
      img.src = this.getAttribute("src");
    } else {
      img.src =
        "/images/icons/Encendido.png";
    }

    this.ondrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      let dt = e.dataTransfer;
      let files = dt.files;

      if (files.length > 0) {
        inputFile.files = files;

        let response = await fetch("WebService2.asmx/UploadFile", {
          method: "POST",
          body: new FormData(form),
        });

        img.src =
          "/images/icons/" +
          files[0].name;
        this.setAttribute(
          "src",
          "/images/icons/" +
            files[0].name
        );
      }
      //window.location.reload();
    };

    //this.addEventListener('dragover', function
    //
    //});

    inputPath.name = "path";
    inputPath.type = "text";
    inputPath.value =
      "_USER/My Projects/Dashboard2/Indoor/wwwroot/images/icons";
    inputPath.hidden = true;
    inputFile.name = "filedata";
    inputFile.type = "file";
    inputFile.name = "fileupload";
    inputFile.hidden = true;

    form.appendChild(inputPath);
    form.appendChild(inputFile);

    div.appendChild(img);
    div.appendChild(form);

    //div.appendChild(input);
    //div.appendChild(buton);

    this.myDiv = div;

    const style = document.createElement("style");
    this.shadowRoot.appendChild(div);
    this.shadowRoot.appendChild(style);

    //div.innerHTML = this.getAttribute("value");
    //this.addEventListener('click', this.eventClickListener);

    //this.myDiv.innerHTML = `<input id="fileupload" type="file" name="fileupload" />
    //					<button id="upload-button" onclick="this.uploadFile()"> Upload </button>`

    super.connectedCallback();
  }

  eventDragoverListener(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    if (dt.types[0] == "Files") {
      //if(files.length > 0)
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    } else super.eventDragoverListener(e);
  }


  //-----------------------------------------------------------------------------------
  // Si hay cambios en tiempo de ejecucion.
  //-----------------------------------------------------------------------------------

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, old, now) {
    switch (name) {
      case "value":
        //this.myDiv.innerHTML = this.getAttribute("value");
        break;
    }
  }
  //-----------------------------------------------------------------------------------
  // MÃ©todos para obtener el valor de los atributos
  //-----------------------------------------------------------------------------------
  set value(newVal) {
    this.setAttribute("value", newVal);
  }

  get value() {
    return this.getAttribute("value");
  }
}
customElements.define("emic-widget-icon", EmicWidgetIcon);

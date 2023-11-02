import {EmicWidget} from "./emicWidget.js"

if (customElements.get("emic-dash-panel") === undefined) {
    console.log(customElements.get("emic-dash-panel"));

    class EmicDashboard extends HTMLElement {
        gauge;
        static namesList = {};
        getNewID() {
            var i;
            for (i = 1; EmicDashboard.namesList[`Dashboard-${i}`]; i++);
            EmicDashboard.namesList[`Dashboard-${i}`] = this;
            return `Dashboard-${i}`;
        }
        static get observedAttributes() {
            return ['direction'];
        }
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }

        //            else if(origen.classList.contains("HtmlPanel")) {
        //}

        connectedCallback() {
            //seccion;
            const nuevoDiv = document.createElement("div");
            const style = document.createElement("style");
            style.innerHTML = `:host(:hover) {border : 1px solid;} section.show {min-height: 10px;opacity: 1;padding: 0px;} section.hide {min-height: 0px;  opacity: 0;padding: 0px;}                `;

            this.shadowRoot.appendChild(style);
            const boton = document.createElement("button");
            boton.onclick = function () {
                this.nextElementSibling.classList.toggle("show");
                this.nextElementSibling.classList.toggle("hide");
            }

            boton.style = "width:100%;";
            boton.innerText = "Dashboard:";
            nuevoDiv.appendChild(boton);

            var seccion = document.createElement("section");
            seccion.classList.add('show');
            seccion.style = "border: 1px solid;"; // display: flex;flex-direction: row;justify-content: space-evenly;flex-wrap: wrap;align-items: stretch;";
            seccion.appendChild(document.createElement("slot"));

            this.seccion = seccion;
            nuevoDiv.appendChild(seccion);
            this.shadowRoot.appendChild(nuevoDiv);


            // --------------------- EVENTS ---------------- en teste caso this referncia a "EmicDashboard"
            this.seccion.addEventListener('dragover', (e) => {
                e.stopPropagation();
                var nd = document.miDrag;
                if (document.miDrag != null && nd instanceof EmicDashPanel) {
                    
                    if (this == nd) {
                        return;
                    }
                    if (document.miDragAction === 'create') {
                        document.miDragAction = 'move';
                        nd = nd.cloneNode(true);
                    }
                    const chields = this.children;
                    let i = 0;
                    for (; i < chields.length; i++) {
                        if (this.getAttribute('direction') === 'row') {
                            let x0 = this.getBoundingClientRect().left;
                            let x1 = chields[i].getBoundingClientRect().left; let x3 = (chields[i].offsetWidth / 2);
                            let x2 = e.offsetX;
                            if (x1 - x0 + x3 > x2) {
                                if (nd != chields[i] && nd != this) {
                                    this.insertBefore(nd, chields[i]);
                                }
                                break;
                            }
                        }
                        else {
                            let x0 = this.getBoundingClientRect().top;
                            let x1 = chields[i].getBoundingClientRect().top; let x3 = (chields[i].offsetHeight / 2);
                            let x2 = e.offsetY;
                            if (x1 - x0 + x3 > x2) {
                                if (nd != chields[i] && nd != this) {
                                    this.insertBefore(nd, chields[i]);
                                }
                                break;
                            }
                        }
                    }
                    if (i >= chields.length) {
                        if (nd != this && nd != this)
                            this.appendChild(nd);
                    }
                }
            });
        }

        attributeChangedCallback(name, old, now) {
            switch (name) {
                case 'direction':
                    this.seccion.style["flex-direction"] = now;
                    break;
            }
        }
    }

    customElements.define("emic-dashboard", EmicDashboard);

    class EmicDashPanel extends HTMLElement {
        seccion = document.createElement("section");;
        static namesList = {};
        getNewID() {
            var i;
            for (i = 1; EmicDashboard.namesList[`Dashboard-${i}`]; i++);
            EmicDashboard.namesList[`Dashboard-${i}`] = this;
            return `Dashboard-${i}`;
        }
        static get observedAttributes() {
            return ['direction'];
        }
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }
        connectedCallback() {

            if (this.closest("emic-dashboard") && this.classList.contains("herramienta")) {
                this.classList.remove("herramienta");
                this.shadowRoot.innerHTML = "";
                this.innerHTML = "";
                this.setAttribute('id', this.getNewID());
                document.miDrag = this;
                document.miDragAction = 'move';
                this.style.opacity = "0.1";

            }
            //************************************************************************************************
            // Si el panel (fila o columna) se encuentra fuera de areacentral o controles (fabricacion) se bloquea el draggable.
            if (!this.closest("#areacentral") && !this.closest("#controles"))
            {
                this.draggable = false;
            }
            //************************************************************************************************

            else if (this.shadowRoot.innerHTML !== "") {
                return;

            }

            if (!this.closest("emic-dashboard")) {
                this.classList.add("herramienta");
                this.shadowRoot.innerHTML = this.getAttribute('direction');
                this.draggable = true;
                this.addEventListener('dragstart', (e) => {
                    document.miDrag = this;
                    document.miDragAction = 'create';
                });
                

                    this.addEventListener('dragend', (e) => {
                        document.miDrag.style.opacity = "1";
                        e.dataTransfer.setData("text", null);
                        document.miDrag = null;
                        this.style.opacity = "1";

                    })
                
                return;
                }
            //return true;
            //this.style.flexFlow = 1;
            const style = document.createElement("style");
            style.innerHTML = ``;
            this.shadowRoot.appendChild(style);
            this.seccion.style['border'] = '2px solid #008CBA';
            this.seccion.style['display'] = 'flex';
            this.seccion.style['justify-content'] = 'space-evenly';
            this.seccion.style['flex-wrap'] = 'wrap';
            this.seccion.style['min-width'] = '10px';
            this.seccion.style['min-height'] = '10px';
            this.seccion.style['padding'] = '0px';
            this.seccion.style['flex-grow'] = '1';
            this.seccion.style['position'] = 'relative';
            this.seccion.style.backgroundColor = "#DDEBDBFF"; 

            this.menu = document.createElement("i");
            this.menu.style = "position: absolute;right:0;right:1;top:0;"
            this.menu.innerHTML = "delete";
            this.menu.classList.add = "material-icons";
            this.menu.classList.add = "menu";
            //
            this.menu.innerHTML = `
<style>
    i:hover div {opacity: 1}
    i {display: flex;flex-direction: column;align-items: flex-end; }
    div {
    
    width: 10px;
    height: 2px;
    background-color: black;
    margin: 2px 2px;
    opacity: 0;
    }
    i:hover ul {display: block}
    ul {
        display: none
    }
</style>
<div></div>
<div></div>
<div></div>
<ul>
    <li>Bordes color:<input type='color'/ ></li>
    <li>Fondo</li>
    <li>Direccion</li>
</ul>




`;

            this.seccion.appendChild(this.menu);
            
            this.style = "justify-content: center;display:flex;flex-grow:1;margin:4px"; 
            //************************************************************************************************
            // Si el panel (fila o columna) se encuentra fuera de areacentral o controles modifico el margen
            if (!this.closest("#areacentral") && !this.closest("#controles"))
            {
                //this.seccion.style['border'] = '1px solid #003366';
                this.seccion.style['border'] = '2px solid #228b22';
                this.seccion.style['border-radius'] = '10px';
                this.seccion.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";  // ConfiguraciÃ³n de ejemplo para una sombra
                this.style = "justify-content: center;display:flex;flex-grow:1;margin:1px"; 
            }
            //************************************************************************************************
            this.seccion.appendChild(document.createElement("slot"));
            this.shadowRoot.appendChild(this.seccion);

            // --------------------- EVENTS ----------------

            this.addEventListener('dragover', this.enventDragoverListener);
            this.addEventListener('dragstart', (e) => {
                e.stopPropagation();
                document.miDrag = this;
                this.style.opacity = "0.1";
            })
            this.addEventListener('dragend', (e) => {
                e.stopPropagation();
                document.miDrag = null;
                this.style.opacity = "1";
            })

            // -----------------------------------------------

            this.isDescendant = function (el) {
                if (el.parentElement == null)
                    return false;
                return el == this || this.isDescendant(el.parentElement);
            }

            this.isDescendant = function (el,padre) {
                if (el.parentElement == null)
                    return false;
                return el == padre || this.isDescendant(el.parentElement, padre);
            }
        }
        attributeChangedCallback(name, old, now) {

            switch (name) {
                case 'direction':
                    this.seccion.style["flex-direction"] = now;
                    break;
            }
        }


        enventDragoverListener(event) {
            event.stopPropagation();
            if (document.miDrag != null) {
                var nd = document.miDrag;
                if (this == nd) {
                    return;
                }
                if (document.miDragAction === 'create') {
                    document.miDragAction = 'move';
                    nd = nd.cloneNode(true);
                }
                const chields = this.children;
                let i = 0;
                for (; i < chields.length; i++) {
                    if (this.getAttribute('direction') === 'row') {
                        let x0 = this.getBoundingClientRect().left;
                        let x1 = chields[i].getBoundingClientRect().left; let x3 = (chields[i].offsetWidth / 2);
                        let x2 = event.offsetX;
                        if (x1 - x0 + x3 > x2) {
                            if (nd != chields[i] && nd != this && !this.isDescendant(this,nd) ) {
                                if (nd.parentElement instanceof EmicDashPanel && nd.parentElement.children.length == 1) {
                                    nd.parentElement.style["flex-grow"] = 1;
                                }
                                this.insertBefore(nd, chields[i]);
                                if (nd instanceof EmicWidget) {
                                    this.style["flex-grow"] = 0;
                                }
                            }
                            break;
                        }
                    }
                    else {
                        let x0 = this.getBoundingClientRect().top;
                        let x1 = chields[i].getBoundingClientRect().top; let x3 = (chields[i].offsetHeight / 2);
                        let x2 = event.offsetY;
                        if (x1 - x0 + x3 > x2) {
                            if (nd != chields[i] && nd != this && !this.isDescendant(this,nd)) {
                                if (nd.parentElement instanceof EmicDashPanel && nd.parentElement.children.length == 1) {
                                    nd.parentElement.style["flex-grow"] = 1;
                                }
                                this.insertBefore(nd, chields[i]);
                                if (nd instanceof EmicWidget) {
                                    this.style["flex-grow"] = 0;
                                }
                            }
                            break;
                        }
                    }
                }
                if (i >= chields.length) {
                    if (nd != this && !this.isDescendant(this,nd)) {
                        if (nd.parentElement instanceof EmicDashPanel && nd.parentElement.children.length == 1) {
                            nd.parentElement.style["flex-grow"] = 1;
                        }
                        this.appendChild(nd);
                        if (nd instanceof EmicWidget) {
                            this.style["flex-grow"] = 0;
                        }
                    }
                }
            }
        }
    }
    customElements.define("emic-dash-panel", EmicDashPanel);

}

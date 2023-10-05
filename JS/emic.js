
//-----------------------------------------------------------------------------------
// Llama al inicio de las variables.
//-----------------------------------------------------------------------------------
if (typeof INIVAR === "function") {
  INIVAR();
}

//-----------------------------------------------------------------------------------
// Verifica si es compatible con los Service Workers y registra uno en la pÃ¡gina.
//-----------------------------------------------------------------------------------
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("./serviceWorker.js")
			.then(res => console.log("service worker registered"))
			.catch(err => console.log("service worker not registered", err));
	});
}
//-----------------------------------------------------------------------------------
// Se cargan los archivos de Dashboard, MQTT, tic y system a la pagina.
//-----------------------------------------------------------------------------------

console.log("local_dashboard.js");






		


var  MQTTsvr;

var MQTTport

var CLIENTID;

var USERMQTT;

var PASSMQTT;

var TOPICSUBS;
function pMQTT(topic,payload){
		message = new Paho.MQTT.Message(payload);
		message.destinationName = topic;
		message.retained = true;
		client.send(message); 
}


function sMQTT(topic){
	client.subscribe(topic);
}

if (!USERMQTT){
	USERMQTT="";
}
if (!PASSMQTT){
	PASSMQTT="";
}
if (MQTTsvr && MQTTport) {
  //client = new Paho.MQTT.Client("openproject.rfindustrial.com", Number(9090), "clientId"+makeid(10));
  //client = new Paho.MQTT.Client("editor.emic.io", Number(8081), "clientId"+makeid(10));
  client = new Paho.MQTT.Client(MQTTsvr, Number(MQTTport), "clientId" + makeid(10));
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
    useSSL: true,
    userName: USERMQTT,
    password: PASSMQTT,
    onSuccess: onConnect
  });
}


function onConnect() {
  console.log("onConnect");
  eMQTTCON();
  
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
	var payload =  message.payloadString; // message.toString();
	var value = parseFloat(payload);
	var topic = message.destinationName;
	var topics = topic.split("/");
	eMQTT(topic,payload);
	
}


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   console.log("random:",result );
   return result;
}      
	
		


function Register_Notification(ID,payload){
		message = new Paho.MQTT.Message(payload);
		message.destinationName = "Notification/register/" + ID;
		message.retained = true;
		client.send(message); 
}

//-----------------------------------------------------------------------------------------------

const firebaseConfig = {
    // Credenciales y configuraciÃ³n de la aplicaciÃ³n
    apiKey: "AIzaSyBaefJaGbvJEcUz4JxWZltRSiXwTlr37cg",
    authDomain: "app-nueva-b3943.firebaseapp.com",
    projectId: "app-nueva-b3943",
    storageBucket: "app-nueva-b3943.appspot.com",
    messagingSenderId: "947440843893",
    appId: "1:947440843893:web:8ddeca8c860e07b67f4c3c",
  };

  // Inicializa Firebase con la configuraciÃ³n proporcionada
  const app = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  if (messaging){
	console.log(messaging);
  }

  function getTOKEN(num) {
	try {
	  const cachedToken = window.localStorage.getItem("firebaseToken");
	  if (cachedToken) {
		return cachedToken;
	  } else {
		return messaging
		  .getToken({
			vapidKey:
			  "BPRhvp0upPy3JoG6Nocso6QfKZipK2RsFpANKzzL4gSs8b4wru3TsUZuPSj37JWh8RUZF2cBzXH6c1vj8Whi5OU",
		  })
		  .then((currentToken) => {
			if (currentToken) {
			  window.localStorage.setItem("firebaseToken", currentToken);
			  return currentToken;
			  //---- Mas codigo aqui ----
			} else {
			  console.log("no se pudo conseguir el token");
			  return null;
			}
		  })
		  .catch((err) => {
			if (err.code === 'messaging/permission-blocked') {
			  console.error('Permiso de notificaciÃ³n bloqueado por el usuario');
			  // AquÃ­ puedes manejar este caso especÃ­fico, como mostrar un mensaje al usuario
			  return null; // Puedes retornar un valor especÃ­fico o manejarlo como desees
			} else {
			  console.log(err);
			  return null;
			}
		  });
	  }
	} catch (error) {
	  console.error(error);
	  return num * 5;
	}
  }
  
  
  
//-----------------------------------------------------------------------------------------------


function authorizeNotification(num) {
	Notification.requestPermission().then((permission) => {
	  if (permission === 'granted') {
		// El usuario otorgÃ³ permiso, ahora puedes obtener el token
		getTOKEN(num);
	  } else {
		// El usuario no otorgÃ³ permiso
		console.log('Permiso de notificaciÃ³n no otorgado');
	  }
	});
  }
  
var timer1;
const setTime1 =  function (timeInMs,reload){
	if (timeInMs == 0){
		clearTimeout(timer1);
	}
	else{
		if (reload == 'T')
			timer1 = window.setTimeout(etOut1, timeInMs);
		if (reload == 'A')
			timer1 = window.setInterval(etOut1, timeInMs);
	}
}











//setTimeout(function, milliseconds)
//Executes a function, after waiting a specified number of milliseconds.
//
//setInterval(function, milliseconds)
//Same as setTimeout(), but repeats the execution of the function continuously.
//The setTimeout() and setInterval() are both methods of the HTML DOM Window object.











//-----------------------------------------------------------------------------------
// Llama al evento INICIO 
//-----------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
	if (typeof INICIO === 'function') {
	  INICIO();
	}
  });




//-----------------------------------------------------------------------------------
// Se crea un sistema de carpetas para el Dashboard generado y sus widgets.
//-----------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------
// Carga los archivos que controlan los widgets y su carga.
//-----------------------------------------------------------------------------------





//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	'instance': '{"component":"emic-widget-button","attributes":{}}',
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Eventos
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function checkboxSetcheck(chekboxId, Value) {
	var tName = chekboxId;
	if (chekboxId.includes('/')) {
		tName = chekboxId.substr(chekboxId.lastIndexOf('/') + 1);
	}
	var element = document.getElementById(tName);

	// Este es el 'if' que verifica si el elemento existe
	if (element) {
		element.checked = (Value == "1");
	}
	// Si el elemento no existe, se ejecuta este bloque 'else'
	else {
		// Este es el console.log que se ejecuta si el elemento no se encuentra
		console.log("Checkbox con id ", tName, " no encontrado");
	}
}






//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	'instance': '{"component":"emic-widget-optionchooser","attributes":{}}',

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function addOptionChooserOption(optionChooserName, label, value) {
  
  var dName = optionChooserName;
  console.log("dName", dName);
  
  // Este 'if' comprueba si 'optionChooserName' incluye '/',
  // si es asÃ­, entonces actualiza 'dName' para ser la porciÃ³n despuÃ©s de la Ãºltima '/'
  if (optionChooserName.includes('/')) {
    dName = optionChooserName.substr(optionChooserName.lastIndexOf('/') + 1);
  }

  // Intenta obtener el elemento del documento por su 'id'
  var element = document.getElementById(dName);
  console.log("element", element);

  // Este 'if' comprueba si el elemento con 'id' 'dName' existe y es un EmicWidgetOptionChooser
  if (element && element.tagName.toLowerCase() === "emic-widget-optionchooser") {
    // Validar que tanto la etiqueta como el valor sean cadenas no vacÃ­as
    if (label && value && typeof label === "string" && typeof value === "string") {
      element.addOption(label, value);
    } else {
      console.error('La etiqueta y el valor deben ser cadenas no vacÃ­as.');
    }
  } else {
    console.log("Elemento con id ", dName, " no encontrado o no es un EmicWidgetOptionChooser");
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function setOptionChooserValue(optionChooserId, newValue) {
  var CName = optionChooserId;
  if (optionChooserId.includes('/')) {
      CName = optionChooserId.substr(optionChooserId.lastIndexOf('/') + 1);
  }
  var element = document.getElementById(CName);

  // Verifica si el elemento con 'id' existe y es un EmicWidgetOptionChooser
  if (element && element.tagName.toLowerCase() === "emic-widget-optionchooser") {
    
    // Obtiene las opciones disponibles en el select
    const options = Array.from(element.optionChooser.options).map(option => option.value);

    // Verifica si el nuevo valor estÃ¡ entre las opciones disponibles
    if (options.includes(newValue)) {
      // Actualiza el atributo 'value' del elemento
      element.setAttribute("value", newValue);
    } else {
      // Muestra un mensaje de error y lista las opciones disponibles
      console.log(`El valor ${newValue} no estÃ¡ entre las opciones disponibles. Las opciones disponibles son: ${options.join(", ")}`);
    }
  } 
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// FunciÃ³n para obtener el valor seleccionado de EmicWidgetOptionChooser
function getOptionChooserValue(optionChooserId) {
  // Obtener el elemento EmicWidgetOptionChooser por su ID
  var emicWidget = document.getElementById(optionChooserId);

  // Verificar si el elemento existe y es una instancia de EmicWidgetOptionChooser
  if (emicWidget) {
    // Obtener el valor seleccionado del EmicWidgetOptionChooser
    var selectedValue = emicWidget.value;

    // Devolver el valor seleccionado
    console.log("Valor seleccionado: " , selectedValue);
    return selectedValue;
  } else {
    // Si el elemento no es un EmicWidgetOptionChooser o no existe, devuelve null o maneja el error segÃºn tus necesidades.
    console.log("No se encontro valor.");
    return null;
  }
}

// Llamar a la funciÃ³n y guardar el valor en una variable
var valorSeleccionado = getOptionChooserValue("tuIdDelEmicWidgetOptionChooser");

// Imprimir el valor seleccionado en la consola
console.log("El valor seleccionado es:", valorSeleccionado);




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Esta funciÃ³n establece el valor de un indicador (gauge) en la pÃ¡gina web.
function GaugeSetValue(gaugeName, value) {
    // Normaliza el nombre del indicador eliminando cualquier parte antes de la Ãºltima barra diagonal '/'.
    var gName = gaugeName.includes('/') ? gaugeName.substr(gaugeName.lastIndexOf('/') + 1) : gaugeName;

    // Busca el elemento con el ID igual a 'gName'.
    var element = document.getElementById(gName);

    // Intenta encontrar el elemento con el ID "G-" + 'gName' si el elemento con 'gName' no se encuentra.
    if (!element) {
        element = document.getElementById("G-" + gName);
    }

    // Comprueba si se encontrÃ³ un elemento con el ID 'gName' o "G-" + 'gName'.
    if (element) {
        // Si se encontrÃ³ el elemento, le asigna el valor 'value'.
        element.value = value;
    } else {
        // Si no se encontrÃ³ el elemento, muestra un mensaje de error en la consola.
        console.log("Gauge con ID ", gName, " no encontrado");
    }
}








//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function IconSetValue(IconName,value){
	document.getElementById(IconName).value = value;
}





//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	'instance': '{"component":"emic-widget-label","attributes":{}}',
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Esta funciÃ³n establece el valor de un elemento de etiqueta (label) en la pÃ¡gina web.
function labelSetValue(labelViewName, value) {
    // Normaliza el nombre de la etiqueta eliminando cualquier parte antes de la Ãºltima barra diagonal '/'.
    var lName = labelViewName.includes('/') ? labelViewName.substr(labelViewName.lastIndexOf('/') + 1) : labelViewName;
	console.log(lName);
    // Busca el elemento con el ID igual a 'lName'.
    var element = document.getElementById(lName);
	console.log(element);
    if (!element) {
		console.log("L-" + lName);
        element = document.getElementById("L-" + lName);
		console.log(element);
    }
    // Comprueba si se encontrÃ³ un elemento con el ID 'lName'.
    if (element) {
        // Cambia el valor del atributo 'text_val' del elemento a 'value'.
        element.setAttribute('text_val', value);
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//	





function LedIndicadorSetValue(LedIndicadorName, Value) {
    var tName = LedIndicadorName;
    if (LedIndicadorName.includes('/')) {
        tName = LedIndicadorName.substr(LedIndicadorName.lastIndexOf('/') + 1);
    }
    var element = document.getElementById(tName);
    if (element) {
        // Si el elemento existe, le asigna el valor 'Value' a su propiedad 'state'
        element.state = Value;
    } 
    else {
        console.log("Led Indicador con id ", tName, " no encontrado");
    }
}


//#newRFIcode(_WEB/API/Widgets/InputMinSec/inputMinSec.emic,name=)





//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	'instance': '{"component":"emic-widget-inputdate","attributes":{}}',

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function dateSetValue(dateName, value) {
  // ExpresiÃ³n regular para verificar el formato de fecha en ISO (AAAA-MM-DD)
  var regex = /^\d{2}\d{2}\d{2}$/;
  var dName = dateName;
    
  // Este 'if' comprueba si 'dateName' incluye '/',
  // si es asÃ­, entonces actualiza 'dName' para ser la porciÃ³n despuÃ©s de la Ãºltima '/'
  if (dateName.includes('/')) {
    dName = dateName.substr(dateName.lastIndexOf('/') + 1);
  }

  // Intenta obtener el elemento del documento por su 'id'
  var element = document.getElementById(dName);
  
  // Este 'if' comprueba si el elemento con 'id' 'dName' existe
  if (element) {
    // Verificar que el valor coincide con el formato de la fecha
    if (regex.test(value)) {
      element.value = value;
    } else {
      console.error('El valor proporcionado no tiene el formato AAAA-MM-DD');
    }
  } else {
    console.log("Elemento con id ", dName, " no encontrado");
  }
}









//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	'instance': '{"component":"emic-widget-inputtime","attributes":{}}',

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function timeSetValue(timeName, value) {
  // ExpresiÃ³n regular para verificar el formato MM:SS
  var regex = /^([01]?[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/;  
  var tName = timeName;
  // Este 'if' comprueba si 'timeName' incluye '/',
  // si es asÃ­, entonces actualiza 'tName' para ser la porciÃ³n despuÃ©s de la Ãºltima '/'
  if (timeName.includes('/')) {
    tName = timeName.substr(timeName.lastIndexOf('/') + 1);
  }
  // Intenta obtener el elemento del documento por su 'id'
  var element = document.getElementById(tName); 
  // Este 'if' comprueba si el elemento con 'id' 'tName' existe
  if (element) {
    if (regex.test(value)) {
      element.value = value;
    } else {
      console.error('El valor proporcionado no tiene el formato HH:MM');
    }
  } else {
    console.log("Elemento con id ", tName, " no encontrado");
  }
}








//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	'instance': '{"component":"emic-widget-inputnum","attributes":{}}',

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function numSetValue(numberId, Value){
    var tName = numberId;
    // Este 'if' comprueba si 'numberId' incluye '/',
    // si es asÃ­, entonces actualiza 'tName' para ser la porciÃ³n despuÃ©s de la Ãºltima '/'
    if (numberId.includes('/')) {
        tName = numberId.substr(numberId.lastIndexOf('/') + 1);
    }
    // Intenta obtener el elemento del documento por su 'id'
    var element = document.getElementById(tName);

    // Este 'if' verifica si el elemento con id 'tName' existe
    if (element) {
        // Si el elemento existe, le asigna el valor 'Value'
        element.value = Value;
    } 
    // Si el elemento no existe, este bloque 'else' se ejecutarÃ¡
    else {
        // Imprime un mensaje de error en la consola
        console.log("Elemento con id ", tName, " no encontrado");
    }
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function numGetValue(numberId){
	Value = document.getElementById(numberId).value;
	return Value;
}




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	'instance': '{"component":"emic-widget-slider","attributes":{}}',

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function sliderSetMax(SliderName,Value){
	document.getElementById(SliderName).max = Value;
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function sliderSetMin(SliderName,Value){
	document.getElementById(SliderName).min = Value;
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function sliderSetValue(SliderName, Value) {
    var tName = SliderName;
    if (SliderName.includes('/')) {
        tName = SliderName.substr(SliderName.lastIndexOf('/') + 1);
    }
    var element = document.getElementById(tName);

	// Intenta encontrar el elemento con el ID "S-" + 'tName' si el elemento con 'tName' no se encuentra.
    if (!element) {
        element = document.getElementById("S-" + tName);
    }

    if (element) {
        // Si el elemento existe, le asigna el valor 'Value'
        element.value = Value;
    } 
    else {
        console.log("Slider con id ", tName, " no encontrado");
    }
}





//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function SwitchSetValue(switchName, Value) {
	var tName = switchName;
	if (switchName.includes('/')) {
		tName = switchName.substr(switchName.lastIndexOf('/') + 1);
	}
  
	var element = document.getElementById(tName);
	if (element) {  // Usar 'instanceof' en lugar de 'classList.contains'
		element.value = Value;
	} else {
		console.log("Switch con id ", tName, " no encontrado");
	}
  }





//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function replaceTableCell(tableId, row, cell, value) {
  const table = document.getElementById(tableId);

  if (table) {
    table.valCelCol = `${row},${cell},${value}`;
  } else {
    console.error("Table not found.");
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function modifyTableDimensions(tableId, cellRows, cellColumns) {
  const table = document.getElementById(tableId);
  if (table) {
    table.dimensiones = `${cellRows},${cellColumns}`;
  } else {
    console.error("Table not found.");
  }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function replaceTableMQTT(tableId, value) {
  var tName = tableId;
  var row, cell;

  // ExpresiÃ³n regular para validar y extraer el nombre de la tabla y el identificador de la celda
  const pattern = /\/upload\/([^\/]+)(\/[a-zA-Z]{0,2}\d+)$/i;
  const match = tableId.match(pattern);
  console.log(match);

  // Si el ID de la tabla coincide con el patrÃ³n
  if (match) {
    // Asignar tName al primer grupo capturado por la expresiÃ³n regular, que corresponde al nombre de la tabla
    tName = match[1];
    console.log(tName);

    // Asignar identifier al segundo grupo capturado por la expresiÃ³n regular, que corresponde al identificador de la celda
    const identifier = match[2].substring(1);  // Se elimina el primer carÃ¡cter, que es una barra (/)
    console.log(identifier);

    // ExpresiÃ³n regular para extraer fila y columna del identificador
    const coordinatePattern = /([a-zA-Z]+)(\d+)/i;
    const [, column, rowStr] = coordinatePattern.exec(identifier) || [];
    

 // Mapeo de letras a nÃºmeros para las columnas
    const columnMapping = {
      a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, 
          i: 8, j: 9, k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, 
          s: 18, t: 19, u: 20, v: 21, w: 22, x: 23, y: 24, z: 25,
          aa: 26, ab: 27, ac: 28, ad: 29, ae: 30, af: 31, ag: 32, ah: 33, ai: 34, aj: 35,
          ak: 36, al: 37, am: 38, an: 39, ao: 40, ap: 41, aq: 42, ar: 43, as: 44, at: 45,
          au: 46, av: 47, aw: 48, ax: 49, ay: 50, az: 51, ba: 52, bb: 53, bc: 54, bd: 55,
          be: 56, bf: 57, bg: 58, bh: 59, bi: 60, bj: 61, bk: 62, bl: 63, bm: 64, bn: 65,
          bo: 66, bp: 67, bq: 68, br: 69, bs: 70, bt: 71, bu: 72, bv: 73, bw: 74, bx: 75,
          by: 76, bz: 77, ca: 78, cb: 79, cc: 80, cd: 81, ce: 82, cf: 83, cg: 84, ch: 85,
          ci: 86, cj: 87, ck: 88, cl: 89, cm: 90, cn: 91, co: 92, cp: 93, cq: 94, cr: 95,
          cs: 96, ct: 97, cu: 98, cv: 99, cw: 100, cx: 101, cy: 102, cz: 103, da: 104, db: 105,
          dc: 106, dd: 107, de: 108, df: 109, dg: 110, dh: 111, di: 112, dj: 113, dk: 114, dl: 115,
          dm: 116, dn: 117, do: 118, dp: 119, dq: 120, dr: 121, ds: 122, dt: 123, du: 124, dv: 125,
          dw: 126, dx: 127, dy: 128, dz: 129, ea: 130, eb: 131, ec: 132, ed: 133, ee: 134, ef: 135,
          eg: 136, eh: 137, ei: 138, ej: 139, ek: 140, el: 141, em: 142, en: 143, eo: 144, ep: 145,
          eq: 146, er: 147, es: 148, et: 149, eu: 150
    };

    // Asignar los nÃºmeros de fila y columna
    const columnNumber = columnMapping[column.toLowerCase()];
    row = parseInt(rowStr, 10);
    cell = columnNumber;
  }

  // Intenta obtener el elemento de la tabla por su 'id'
  const table = document.getElementById(tName);

  // Verifica si el elemento con 'id' 'tName' existe
  if (table) {
    // Si la tabla existe, la manipula de acuerdo con los valores de 'value'
    if ('valCelCol' in table) {
      table.valCelCol = `${cell},${row},${value}`;
    }
  }
  // Si la tabla no se encontrÃ³, puedes agregar un mensaje o una acciÃ³n aquÃ­
}




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function TextBoxSetValue(textId, Value){
    var tName = textId;
    if (textId.includes('/')) {
        tName = textId.substr(textId.lastIndexOf('/') + 1);
    }
    var element = document.getElementById(tName);
    if (element) {
        // Si el elemento existe, le asigna el valor 'Value'
        element.setAttribute('value', Value);
    } 
    else {
        console.log("Elemento con id ", tName, " no encontrado");
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function TextBoxGetValue(textId){
    var element = document.getElementById(textId);
    if (element) {
        // Si el elemento existe, obtiene el valor 'Value' del atributo 'value'
        var Value = element.getAttribute('value');
        return Value;
    } 
    else {
        console.log("Elemento con id ", textId, " no encontrado");
        return null; // Retorna null si el elemento no se encuentra
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



function saveToLocalStorage(keyNameLS, widgetName, compareName, valueToStore) {
    // Verifica si los argumentos son vÃ¡lidos
    if (keyNameLS && widgetName && compareName && valueToStore) {
        // Si widgetName y compareName coinciden, guarda valueToStore en localStorage
        if (widgetName === compareName) {
            localStorage.setItem(keyNameLS, valueToStore);
        }
    } else {
        console.error("Argumentos invÃ¡lidos o incompletos para la funciÃ³n saveToLocalStorage.");
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function loadToLocalStorage(keyNameLS, widgetName) {
    // Verifica si los argumentos son vÃ¡lidos
    if (keyNameLS && widgetName) {
        // Intenta recuperar el valor del localStorage
        const valueFromStorage = localStorage.getItem(keyNameLS);
        
        // Verifica si el valor existe en localStorage
        if (valueFromStorage !== null) {
            // Encuentra el widget en el DOM utilizando el ID proporcionado (widgetName)
            const element = document.getElementById(widgetName);
            // Verifica si el widget existe en el DOM
            if (element) {
                // Asigna el valor recuperado al widget
                element.setAttribute('value', valueFromStorage);
            } else {
                console.error(`El widget con ID ${widgetName} no se encuentra en el DOM.`);
            }
        } else {
            console.warn(`No hay ningÃºn valor guardado en localStorage con la clave ${keyNameLS}.`);
        }
    } else {
        console.error("Argumentos invÃ¡lidos o incompletos para la funciÃ³n loadToLocalStorage.");
    }
}





//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	'instance': '{"component":"emic-widget-historical","attributes":{}}',

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 
function SetDataHist(HistName, Hjson) {
    // Normaliza el nombre del indicador eliminando cualquier parte antes de la Ãºltima barra diagonal '/'.
    var gName = HistName.includes("/")
        ? HistName.substr(HistName.lastIndexOf("/") + 1)
        : HistName;
    var historical = document.getElementById(gName);

    if (!historical) {
        historical = document.getElementById("H-" + gName);
    }

    // Verificar si el elemento existe y es del tipo correcto
    if (
        historical &&
        historical.tagName.toLowerCase() === "emic-widget-historical"
    ) {
        // Intentar parsear el JSON
        let obj;
        try {
            obj = JSON.parse(Hjson);
        } catch (e) {
            console.error("El argumento Hjson proporcionado no es un JSON vÃ¡lido.");
            return; // Termina la funciÃ³n si Hjson no es un JSON vÃ¡lido
        }

        // Verificar que obj tiene las propiedades esperadas
        if (
            !obj.hasOwnProperty("label") ||
            !obj.hasOwnProperty("dataLabels") ||
            !obj.hasOwnProperty("dataValues")
        ) {
            console.error(
                "El objeto JSON no tiene las propiedades requeridas: label, dataLabels, dataValues"
            );
            return;
        }
        const { label, dataLabels, dataValues } = obj;

        if (Array.isArray(label)) {
            historical.setAttribute("label", JSON.stringify(label));
        } else {
            console.error("label debe ser un array");
        }

        if (Array.isArray(dataLabels)) {
            historical.setAttribute("data-labels", JSON.stringify(dataLabels));
        } else {
            console.error("dataLabels debe ser un array");
        }

        if (Array.isArray(dataValues)) {
            historical.setAttribute("data-values", JSON.stringify(dataValues));
        } else {
            console.error("dataValues debe ser un array");
        }
    } 
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
function MultiSetDataHist(compTopic, topic, payload, WidgetName) {
    // Normaliza el nombre del indicador eliminando cualquier parte antes de la Ãºltima barra diagonal '/'.
    if (compTopic === topic) {
        var historical = document.getElementById(WidgetName);

        if (!historical) {
            historical = document.getElementById("H-" + WidgetName);
        }

        // Verificar si el elemento existe y es del tipo correcto
        if (
            historical &&
            historical.tagName.toLowerCase() === "emic-widget-historical"
        ) {
            // Intentar parsear el JSON
            let obj;
            try {
                obj = JSON.parse(payload);
            } catch (e) {
                console.error("El argumento Hjson proporcionado no es un JSON vÃ¡lido.");
                return; // Termina la funciÃ³n si Hjson no es un JSON vÃ¡lido
            }

            // Verificar que obj tiene las propiedades esperadas
            if (
                !obj.hasOwnProperty("label") ||
                !obj.hasOwnProperty("dataLabels") ||
                !obj.hasOwnProperty("dataValues")
            ) {
                console.error(
                    "El objeto JSON no tiene las propiedades requeridas: label, dataLabels, dataValues"
                );
                return;
            }
            const { label, dataLabels, dataValues } = obj;

            if (Array.isArray(label)) {
                historical.setAttribute("label", JSON.stringify(label));
            } else {
                console.error("label debe ser un array");
            }

            if (Array.isArray(dataLabels)) {
                historical.setAttribute("data-labels", JSON.stringify(dataLabels));
            } else {
                console.error("dataLabels debe ser un array");
            }

            if (Array.isArray(dataValues)) {
                historical.setAttribute("data-values", JSON.stringify(dataValues));
            } else {
                console.error("dataValues debe ser un array");
            }
        }
    }
}
function INICIO() { 
	modifyTableDimensions("MOIS1","2","2");
	addOptionChooserOption("MODER1","Manual","M");
	addOptionChooserOption("MODER1","Automatico por tiempo","AT");
	addOptionChooserOption("MODER2","Manual","M");
	addOptionChooserOption("MODER2","Automatico por tiempo","AT");
	addOptionChooserOption("MODER3","Manual","M");
	addOptionChooserOption("MODER3","Automatico","AV");
	addOptionChooserOption("MODER4","Manual","M");
	addOptionChooserOption("MODER4","Cronograma semanal","CS");
	addOptionChooserOption("MODER5","Manual","M");
	addOptionChooserOption("MODER5","Cronograma por ciclos","CC");
	replaceTableCell("MOIS","0","0","Primera medida");
	replaceTableCell("MOIS","0","1","Segunda medida");
}
function INIVAR() { 
	MQTTsvr="editor.emic.io";
	MQTTport="9090";
}
function eMQTTCON() { 
	loadToLocalStorage("LStorageKey","KeyText");
	sMQTT("KeyText");
}
function eMQTT(topic,payload) { 
	labelSetValue(topic,payload);
	GaugeSetValue(topic,payload);
	timeSetValue(topic,payload);
	dateSetValue(topic,payload);
	replaceTableMQTT(topic,payload);
	SwitchSetValue(topic,payload);
	setOptionChooserValue(topic,payload);
	SetDataHist(topic,payload);
	checkboxSetcheck(topic,payload);
	Segundos=payload;
	xSele(topic,"INDOOR/"+TextValue+"/download/TIMEOFF1R4",`numSetValue("TiempoEncendidoMin1R4",toint(division(Segundos,"60")))+numSetValue("TiempoEncendidoSec1R4",toint(remainder(Segundos,"60")))`,"INDOOR/"+TextValue+"/download/TIMEOFF2R4",`numSetValue("TiempoEncendidoMin2R4",toint(division(Segundos,"60")))+numSetValue("TiempoEncendidoSec2R4",toint(remainder(Segundos,"60")))`,"INDOOR/"+TextValue+"/download/TIMEOFF3R4",`numSetValue("TiempoEncendidoMin3R4",toint(division(Segundos,"60")))+numSetValue("TiempoEncendidoSec3R4",toint(remainder(Segundos,"60")))`,"INDOOR/"+TextValue+"/download/TIMEOFF4R4",`numSetValue("TiempoEncendidoMin4R4",toint(division(Segundos,"60")))+numSetValue("TiempoEncendidoSec4R4",toint(remainder(Segundos,"60")))`,"INDOOR/"+TextValue+"/download/TIMEOFF5R4",`numSetValue("TiempoEncendidoMin5R4",toint(division(Segundos,"60")))+numSetValue("TiempoEncendidoSec5R4",toint(remainder(Segundos,"60")))`,"INDOOR/"+TextValue+"/download/TIMELAPSER1",`numSetValue("TiempoEsperaMinR1",toint(division(Segundos,"60")))+numSetValue("TiempoEsperaSecR1",toint(remainder(Segundos,"60")))`,"INDOOR/"+TextValue+"/download/TIMELAPSER2",`numSetValue("TiempoEsperaMinR2",toint(division(Segundos,"60")))+numSetValue("TiempoEsperaSecR2",toint(remainder(Segundos,"60")))`);
}
function checkboxChange(Checkbox,Checked) { 
	pMQTT("INDOOR/"+TextValue+"/download/"+Checkbox,Checked);
}
function optionChooserChange(OptionChooser,Value) { 
	pMQTT("INDOOR/"+TextValue+"/download/"+OptionChooser,Value);
}
function inputDateChange(InputDate,Value) { 
	pMQTT("INDOOR/"+TextValue+"/download/"+InputDate,Value);
}
function inputTimeChange(InputTime,Value) { 
	pMQTT("INDOOR/"+TextValue+"/download/"+InputTime,Value);
}
function inputNumChange(InputNum,Value) { 
	xSele(InputNum,"TiempoEncendidoMin1R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF1R4",sum(multiplication(numGetValue("TiempoEncendidoMin1R4"),"60"),numGetValue("TiempoEncendidoSec1R4")))`,"TiempoEncendidoSec1R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF1R4",sum(multiplication(numGetValue("TiempoEncendidoMin1R4"),"60"),numGetValue("TiempoEncendidoSec1R4")))`,"TiempoEncendidoMin2R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF2R4",sum(multiplication(numGetValue("TiempoEncendidoMin2R4"),"60"),numGetValue("TiempoEncendidoSec2R4")))`,"TiempoEncendidoSec2R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF2R4",sum(multiplication(numGetValue("TiempoEncendidoMin2R4"),"60"),numGetValue("TiempoEncendidoSec2R4")))`,"TiempoEncendidoMin3R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF3R4",sum(multiplication(numGetValue("TiempoEncendidoMin3R4"),"60"),numGetValue("TiempoEncendidoSec3R4")))`,"TiempoEncendidoSec3R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF3R4",sum(multiplication(numGetValue("TiempoEncendidoMin3R4"),"60"),numGetValue("TiempoEncendidoSec3R4")))`,"TiempoEncendidoMin4R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF4R4",sum(multiplication(numGetValue("TiempoEncendidoMin4R4"),"60"),numGetValue("TiempoEncendidoSec4R4")))`,"TiempoEncendidoSec4R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF4R4",sum(multiplication(numGetValue("TiempoEncendidoMin4R4"),"60"),numGetValue("TiempoEncendidoSec4R4")))`,"TiempoEncendidoMin5R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF5R4",sum(multiplication(numGetValue("TiempoEncendidoMin5R4"),"60"),numGetValue("TiempoEncendidoSec5R4")))`,"TiempoEncendidoSec5R4",`pMQTT("INDOOR/"+TextValue+"/download/TIMEOFF5R4",sum(multiplication(numGetValue("TiempoEncendidoMin5R4"),"60"),numGetValue("TiempoEncendidoSec5R4")))`,"TiempoEsperaMinR1",`pMQTT("INDOOR/"+TextValue+"/download/TIMELAPSER1",sum(multiplication(numGetValue("TiempoEsperaMinR1"),"60"),numGetValue("TiempoEsperaSecR1")))`,"TiempoEsperaSecR1",`pMQTT("INDOOR/"+TextValue+"/download/TIMELAPSER1",sum(multiplication(numGetValue("TiempoEsperaMinR1"),"60"),numGetValue("TiempoEsperaSecR1")))`,"TiempoEsperaMinR2",`pMQTT("INDOOR/"+TextValue+"/download/TIMELAPSER2",sum(multiplication(numGetValue("TiempoEsperaMinR2"),"60"),numGetValue("TiempoEsperaSecR2")))`,"TiempoEsperaSecR2",`pMQTT("INDOOR/"+TextValue+"/download/TIMELAPSER2",sum(multiplication(numGetValue("TiempoEsperaMinR2"),"60"),numGetValue("TiempoEsperaSecR2")))`,"VALR1",`pMQTT("INDOOR/"+TextValue+"/download/VALR1",numGetValue("VALR1"))`,"VALR2",`pMQTT("INDOOR/"+TextValue+"/download/VALR2",numGetValue("VALR2"))`,"VALR3",`pMQTT("INDOOR/"+TextValue+"/download/VALR3",numGetValue("VALR3"))`);
}
function switchToogle(Switch,Value) { 
	pMQTT("INDOOR/"+TextValue+"/download/"+Switch,Value);
}
function textBoxChange(TextBox,Value) { 
	TextName=TextBox;
	TextValue=Value;
	saveToLocalStorage("LStorageKey","KeyText",TextName,TextValue);
	IDCliente="INDOOR/"+TextValue+"/#";
	sMQTT(IDCliente);
}
var Segundos;
var TextValue;
var TextName;
var IDCliente;

function xSele(...args) {
  // Inicializamos una variable para almacenar el resultado
  let result;

  // Iteramos a travÃ©s de los argumentos empezando desde el segundo (Ã­ndice 1)
  for (let i = 1; i < args.length; i += 2) {
    // Convertimos args[i] y args[0] a cadenas (strings)
    const arg1 = String(args[i]);
    const arg2 = String(args[0]);

    // Comparamos las cadenas
    if (arg1 === '*' || arg1 === arg2) {
      // Utilizamos eval solo si es necesario, de lo contrario, podrÃ­amos simplemente retornar args[i + 1]
      result = eval(args[i + 1]);
      break; // Salimos del bucle una vez que encontramos una coincidencia
    }
  }

  return result; // Retornamos el resultado
}

function toint(op1) {
    const a = parseFloat(op1);
    const b = parseInt(a);
    return (b).toString();
  }
function division(op1,op2)
{
    return (parseFloat(op1) / parseFloat(op2)).toString();
}
function remainder(op1,op2)
{
    return (parseFloat(op1) % parseFloat(op2)).toString();
}
function sum(op1,op2)
{
    return (parseFloat(op1) + parseFloat(op2)).toString();
}
function multiplication(op1,op2)
{
    return (parseFloat(op1) * parseFloat(op2)).toString();
}

/*===================================================================
Función que crea los divs que contendrán los inputs, el resultado y
la opción de mostrar error absoluto.
===================================================================*/
function displayContentDivs(interOption) {
    // Div donde se desplegarán los contenedores
    let content = document.getElementById("content");
    content.innerHTML="";
    // Apartado donde se muestran los inputs para colocar los datos
    let div = document.createElement("div");
    div.setAttribute("class","inputsSeccion");
    div.id = "inputsSeccion";
    content.appendChild(div);
    // Apartado para mostrar el resultado
    div = document.createElement("div");
    div.setAttribute("class","resultSeccion");
    div.id = "resultsSeccion";
    content.appendChild(div);
    // Apartado para mostrar la posibilidad de calcular el error
    div = document.createElement("div");
    div.setAttribute("class","errorSeccion");
    div.id = "errorSeccion";
    content.appendChild(div);
    // Condiciones para los botones del menú que despliegan los elementos de la función
    switch (interOption){
        case 1:
            interpolacionLineal();
            displayErrorContent()
            break;
        case 2:
            interpolacionCuadratica();
            displayErrorContent()
            break;
        case 3:
            numOrdenLagrange();
            displayErrorContent()
    }
}

/*===================================================================
Función que crea los inputs para las interpolaciones Lineales
y Cuadrática. Depende de dos parámetros, el "num" dice cuántos inputs
va a crear (ej.: x0,x1,x2), sin contar el de la incógnita x;
y el parámetro "tipo" es para concatenar los nombres de las funciones 
y nombres de IDs para llamar los valores. Se debe respetar la mayúscula
inicial del tipo para que funcione adecuadamente.
===================================================================*/
function displayInputsForInterpolation(num,tipo) {
    let div, table, tbody, fila, td;
    
    // Condición que evita que elimine los valores de los inputs una vez se calcula la operación.
    if (!document.getElementById(`x${tipo}`)){
        ////// Empezamos a crear tabla para despliegue de inputs ///////
        div = document.getElementById("inputsSeccion");
        // div.innerHTML="";
        
        // Creamos estructura base de la tabla
        table = document.createElement("table");
        table.setAttribute("class","tablaInputs");
        table.id = `${tipo}-Table`;
        tbody = document.createElement("tbody");

        // Encabezado
        fila = document.createElement("tr");
        
        td = document.createElement("td");
        td.setAttribute("colspan","2");
        td.setAttribute("class","titleTable");
        td.innerHTML = `X`;
        fila.appendChild(td);
        
        td = document.createElement("td");
        td.setAttribute("colspan","2");
        td.setAttribute("class","titleTable");
        td.innerHTML = `f(x)`;
        fila.appendChild(td);

        // Insertamos encabezado a la tabla
        tbody.appendChild(fila);

        // Fila de ingreso de la X y f(x) para el resultado
        fila = document.createElement("tr");
        // Columna del label X
        td = document.createElement("td");
        td.setAttribute("class","letterOption");
        td.innerHTML = `X`;
        fila.appendChild(td);
        // Columna de los inputs de X
        td = document.createElement("td");
        td.setAttribute("colspan","3");
        td.innerHTML = `<input type="number" id="x${tipo}" class="inputSelector">`
        fila.appendChild(td);

        tbody.appendChild(fila);

        for (let y=0;y<num;y++) {
            fila = document.createElement("tr");

            // Columna del label de las x's
            td = document.createElement("td");
            td.setAttribute("class","letterOption");
            td.innerHTML = `X<sub>${y}</sub>`;
            fila.appendChild(td);
            // Columna de los inputs de las x's
            td = document.createElement("td");
            td.innerHTML = `<input type="number" id="x${y}${tipo}" class="inputSelector">`
            fila.appendChild(td);
            // Columna del label de las fx's
            td = document.createElement("td");
            td.setAttribute("class","letterOption");
            td.innerHTML = `f(X<sub>${y}</sub>)`;
            fila.appendChild(td);
            // Columna de los inputs de las fx's
            td = document.createElement("td");
            td.innerHTML = `<input type="number" id="fx${y}${tipo}" class="inputSelector">`
            fila.appendChild(td);

            // Se inserta fila a la tabla
            tbody.appendChild(fila);
        }
    
        // Boton de calcular
        fila = document.createElement("tr");
        td = document.createElement("td");
        td.setAttribute("colspan","4");
        td.innerHTML = `<center><input type="button" value="Calcular Interpolación" id="button${tipo}" class="buttonCalcular" onclick="interpolacion${tipo}()"><center>`;
        fila.appendChild(td);
        tbody.appendChild(fila);

        // Cerramos y finalizamos tabla
        table.appendChild(tbody);
        div.appendChild(table);

        //////////////////////////////////////////////////////
        // Se agrega el input en el que se mostrará el resultado
        div = document.getElementById("resultsSeccion");
        div.innerHTML="";

        let tabla = document.createElement("table");
        tabla.setAttribute("class","tablaInputResult");
        tbody = document.createElement("tbody");
        
        // Columna del label de fx
        fila = document.createElement("tr");
        td = document.createElement("td");
        td.setAttribute("class","letterOptionResult");
        td.innerHTML = `f(X)`;
        fila.appendChild(td);
        // Columna de los inputs de las fx's
        td = document.createElement("td");
        td.innerHTML = `<input type="text" id="fxResult" class="inputSelectorResult" disabled>`
        fila.appendChild(td);

        tbody.appendChild(fila);
        tabla.appendChild(tbody);
        div.appendChild(tabla);
    }
}

/*===================================================================
Función que realiza las operaciones para la interpolación lineal.
===================================================================*/
function interpolacionLineal() {
    // Despliegue de inputs
    displayInputsForInterpolation(2,"Lineal");
    
    let x0,x1,fx0,fx1,x,resultado;
    // Valores de x's
    x = parseFloat(document.getElementById("xLineal").value);
    x0 = parseFloat(document.getElementById("x0Lineal").value);
    x1 = parseFloat(document.getElementById("x1Lineal").value);
    // Valores de fx's
    fx0 = parseFloat(document.getElementById("fx0Lineal").value);
    fx1 = parseFloat(document.getElementById("fx1Lineal").value);

    // console.log(x,x0,x1,fx0,fx1);

    resultado = fx0 + ((fx1-fx0)/(x1-x0))*(x-x0);
    // console.log(resultado);
    if(resultado) document.getElementById("fxResult").value = resultado.toFixed(6);
}
/*===================================================================
Función que realiza las operaciones para la interpolación cuadrática.
===================================================================*/
function interpolacionCuadratica() {
    // Despliegue de inputs
    displayInputsForInterpolation(3,"Cuadratica");

    let x=[],fx = [],xSup,resultado;
    let b0,b1,b2;
    // Valores de las x's
    xSup = parseFloat(document.getElementById("xCuadratica").value);
    // Iteración para recoger los datos de los inputs
    for (let y=0;y<=2;y++) {
        x[y] = parseFloat(document.getElementById(`x${y}Cuadratica`).value);
        fx[y] = parseFloat(document.getElementById(`fx${y}Cuadratica`).value);
    }

    b0 = fx[0];
    b1 = (fx[1]-fx[0])/(x[1]-x[0]);
    b2 = (((fx[2]-fx[1])/(x[2]-x[1])-b1)/(x[2]-x[0]));
    // console.log(b0,b1,b2);
    
    resultado = b0 + b1*(xSup-x[0]) + b2*(xSup-x[0])*(xSup-x[1]);
    // console.log(resultado);
    
    // Evitamos que se imprima valor NaN en el input
    if(resultado) document.getElementById("fxResult").value = resultado.toFixed(6);
}
/*===================================================================
Función que crea los elementos para que seleccione el número de orden
que quiere realizar para la interpolación de Lagrange.
===================================================================*/
function numOrdenLagrange() {
    let div = document.getElementById("inputsSeccion");

    let table = document.createElement("table");
    table.setAttribute("class","tableNumOrdenLagrange");
    let tbody = document.createElement("tbody");
    // Fila con el mensaje de ingresa numero de orden
    let fila = document.createElement("tr");
    let td = document.createElement("td");
    td.setAttribute("class","labelNumOrden");
    td.innerHTML=`Ingresa número de orden a calcular:`;
    fila.appendChild(td);
    tbody.appendChild(fila);
    // Fila con el input para ingresar el numero de orden
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.innerHTML = `<center><input type="number" value="1" id="nLagrange"></center>`
    fila.appendChild(td);
    tbody.appendChild(fila)
    // Fila con el boton para generar los inputs
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.innerHTML = `<center><input type="button" value="Generar" class="buttonNumLagrange" onclick="setInputsforLagrange()"></center>`
    fila.appendChild(td);
    tbody.appendChild(fila);

    table.appendChild(tbody);
    div.appendChild(table);
}
/*===================================================================
Función que despliega los inputs de la interpolación lagrange.
===================================================================*/
function setInputsforLagrange() {
    /*************************
    El límite sera el orden 9 (10 inputs desplegables)
    *************************/
    let numOrden = parseInt(document.getElementById("nLagrange").value);
    numOrden +=1;
    displayInputsForInterpolation(numOrden,"Lagrange")
}
/*===================================================================
Función que calcula la interpolación de Lagrange en cualquier número
de orden.
===================================================================*/
function interpolacionLagrange() {
    let numOrden = document.getElementById("nLagrange").value;
    // console.log("nunOrden "+numOrden)
    let xSup = parseFloat(document.getElementById("xLagrange").value);
    let operacion=0, resultado=0;

    let x = [];
    let fx = [];
    
    for (let y=0;y<=numOrden;y++) {
        x[y] = document.getElementById(`x${y}Lagrange`).value;
        fx[y] = document.getElementById(`fx${y}Lagrange`).value;
    }
    // console.log("x "+x)
    // console.log("fx "+fx)
    for (let i=0;i<=numOrden;i++) {
        operacion = fx[i];
        for (let j=0;j<=numOrden;j++) {
            if (i != j) {
                operacion *= (xSup - x[j]) / (x[i] - x[j]);
                console.log("Operacion" + i + " "+j)
                console.log("Operacion" + operacion)
            }
        }
        resultado += operacion;
        // console.log("resultado" + i)
    }
    document.getElementById("fxResult").value = resultado.toFixed(6);
}
/*===================================================================
Función que despliega el contenido para ingresar y calcular el error
absoluto y relativo.
===================================================================*/
function displayErrorContent() {
    let div = document.getElementById("errorSeccion");
    let tabla,tbody,fila,td;

    tabla = document.createElement("table");
    tabla.setAttribute("class","tableError")
    tbody = document.createElement("tbody");
    // Título
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("class","errorTitle");
    td.setAttribute("colspan","2");
    td.innerHTML = "Calcular Error Relativo";
    fila.appendChild(td);
    tbody.appendChild(fila);
    // Información
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("class","errorInformation");
    td.setAttribute("colspan","2");
    td.innerHTML = "<p>Si cuentas con el valor exacto, ingrésalo y podrás calcular el error relativo.</p>";
    fila.appendChild(td);
    tbody.appendChild(fila);
    // Ingreso de datos
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("class","letterOption");
    td.innerHTML = "Valor exacto:";
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = `<input type="number" id="exactValue" class="inputSelector">`;
    fila.appendChild(td);

    tbody.appendChild(fila);

    // Boton para calcular el error
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("colspan","2");
    td.setAttribute("class","letterOption");
    td.innerHTML = `<center><input type="button" value="Calcular" class="buttonNumLagrange" onclick="calculateError()"></center>`;
    fila.appendChild(td);
    tbody.appendChild(fila);
    
    // Error absoluto
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("class","letterOption");
    td.innerHTML = "Error Absoluto:";
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = `<input type="number" id="absoluteError" class="inputSelector">`;
    fila.appendChild(td);

    tbody.appendChild(fila);
    
    // Error relativo en porcentaje
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("class","letterOption");
    td.innerHTML = "Error Relativo:";
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = `<input type="text" id="relativeError" class="inputSelector">`;
    fila.appendChild(td);

    tbody.appendChild(fila);

    tabla.appendChild(tbody);
    div.appendChild(tabla);
}
/*===================================================================
Función que calcula el error absoluto y error relativo
===================================================================*/
function calculateError() {
    let exactValue = document.getElementById("exactValue").value;
    let resultInterpolation = document.getElementById("fxResult").value;
    let absoluteError,relativeError;

    absoluteError = Math.abs(exactValue-resultInterpolation);
    relativeError = (absoluteError / exactValue)*100;

    document.getElementById("absoluteError").value = absoluteError.toFixed(4);
    document.getElementById("relativeError").value = `${relativeError.toFixed(2)}%`;
}
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
            break;
        case 2:
            interpolacionCuadratica();
            break;
        case 3:
            numOrdenLagrange;
    }
}

/*===================================================================
Función que crea los inputs para las interpolaciones Lineales
y Cuadrática. Depende de dos parámetros, el "num" dice cuántos inputs
va a crear (x0,x1,x2), sin contar el de la incógnita x.
El tipo es para concatenar con las funciones y IDs de las otras funciones
solo acepta "Lineal" y "Cuadratica", respentando la mayúscula.
===================================================================*/
function interLinealCuadra(num,tipo) {
    let div, table, tbody, fila, td;
    num+=1;
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
        td.innerHTML = `X`;
        fila.appendChild(td);
        // Columna de los inputs de X
        td = document.createElement("td");
        td.setAttribute("colspan","3");
        td.innerHTML = `<input type="number" id="x${tipo}">`
        fila.appendChild(td);

        tbody.appendChild(fila);

        for (let y=0;y<num;y++) {
            fila = document.createElement("tr");

            // Columna del label de las x's
            td = document.createElement("td");
            td.innerHTML = `X<sub>${y}</sub>`;
            fila.appendChild(td);
            // Columna de los inputs de las x's
            td = document.createElement("td");
            td.innerHTML = `<input type="number" id="x${y}${tipo}">`
            fila.appendChild(td);
            // Columna del label de las fx's
            td = document.createElement("td");
            td.innerHTML = `f(X<sub>${y}</sub>)`;
            fila.appendChild(td);
            // Columna de los inputs de las fx's
            td = document.createElement("td");
            td.innerHTML = `<input type="number" id="fx${y}${tipo}">`
            fila.appendChild(td);

            // Se inserta fila a la tabla
            tbody.appendChild(fila);
        }
    
        // Boton de calcular
        fila = document.createElement("tr");
        td = document.createElement("td");
        td.setAttribute("colspan","4");
        td.innerHTML = `<input type="button" value="Calcular Interpolación" id="button${tipo}" class="buttonCalcular" onclick="interpolacion${tipo}()">`
        fila.appendChild(td);
        tbody.appendChild(fila);

        table.appendChild(tbody);
        div.appendChild(table);

        /////////////////////////////////////////
        div = document.getElementById("resultsSeccion");
        div.innerHTML="";

        let tabla = document.createElement("table");
        tabla.setAttribute("class","tablaInputs");
        tbody = document.createElement("tbody");
        
        // Columna del label de fx
        fila = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = `f(X)`;
        fila.appendChild(td);
        // Columna de los inputs de las fx's
        td = document.createElement("td");
        td.innerHTML = `<input type="text" id="fx${tipo}" disabled>`
        fila.appendChild(td);

        tbody.appendChild(fila);
        tabla.appendChild(tbody);
        div.appendChild(tabla);
    }
}
/*===================================================================
Función que crea el input de fx en su recuadro respectivo
===================================================================*/
function fxInput(tipo) {
    let div = document.getElementById("resultsSeccion");
    div.innerHTML="";

    let tabla = document.createElement("table");
    tabla.setAttribute("class","tablaInputs");
    let tbody = document.createElement("tbody");
    
    // Columna del label de fx
    let fila = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = `f(X)`;
    fila.appendChild(td);
    // Columna de los inputs de las fx's
    td = document.createElement("td");
    td.innerHTML = `<input type="text" id="fx${tipo}" disabled>`
    fila.appendChild(td);

    tbody.appendChild(fila);
    tabla.appendChild(tbody);
    div.appendChild(tabla);
}

/*===================================================================
Función que calcula que que realiza los cálculos de 
===================================================================*/
function interpolacionLineal() {
    // Despliegue de inputs
    interLinealCuadra(1,"Lineal");
    
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
    if(resultado) document.getElementById("fxLineal").value = resultado.toFixed(6);
}
/*===================================================================
Función que realiza las operaciones para la interpolación cuadrática.
===================================================================*/
function interpolacionCuadratica() {
    // Despliegue de inputs
    interLinealCuadra(2,"Cuadratica");

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
    if(resultado) document.getElementById("fxCuadratica").value = resultado.toFixed(6);
}

function numOrdenLagrange() {
    let numOrden = parseInt(document.getElementById("nLagrange").value);
    numOrden +=1;

    /******************************************************************
     Crear una función que cree un input para ingresar el número de orden
     que desea el usuario y agregarle un botón para desplegar los inputs
    *******************************************************************/

    // let div, table, tbody, fila, td;
    
    // ////// Empezamos a crear tabla para despliegue de inputs ///////
    // div = document.getElementById("inter-Lagrange-Tabla");
    // div.innerHTML="";
    
    // // Creamos estructura base de la tabla
    // table = document.createElement("table");
    // table.setAttribute("class","tablaInputs");
    // table.id = "lagrange-Table";
    // tbody = document.createElement("tbody");

    // // Encabezado
    // fila = document.createElement("tr");
    
    // td = document.createElement("td");
    // td.setAttribute("colspan","2")
    // td.innerHTML = `Eje X`;
    // fila.appendChild(td)
    
    // td = document.createElement("td");
    // td.setAttribute("colspan","2")
    // td.innerHTML = `f(x)`;
    // fila.appendChild(td)

    // // Insertamos encabezado a la tabla
    // tbody.appendChild(fila);

    // for (let y=0;y<numOrden;y++) {
    //     fila = document.createElement("tr");

    //     // Columna del label de las x's
    //     td = document.createElement("td");
    //     td.innerHTML = `X<sub>${y}</sub>`;
    //     fila.appendChild(td);
    //     // Columna de los inputs de las x's
    //     td = document.createElement("td");
    //     td.innerHTML = `<input type="number" id="x${y}Lagrange">`
    //     fila.appendChild(td);
    //     // Columna del label de las fx's
    //     td = document.createElement("td");
    //     td.innerHTML = `f(X<sub>${y}</sub>)`;
    //     fila.appendChild(td);
    //     // Columna de los inputs de las fx's
    //     td = document.createElement("td");
    //     td.innerHTML = `<input type="number" id="fx${y}Lagrange">`
    //     fila.appendChild(td);

    //     // Se inserta fila a la tabla
    //     tbody.appendChild(fila);
    // }
    // fila = document.createElement("tr");
    // // Columna del label X
    // td = document.createElement("td");
    // td.innerHTML = `X`;
    // fila.appendChild(td);
    // // Columna de los inputs de X
    // td = document.createElement("td");
    // td.innerHTML = `<input type="number" id="xLagrange">`
    // fila.appendChild(td);
    // // Columna del label de fx
    // td = document.createElement("td");
    // td.innerHTML = `f(X)`;
    // fila.appendChild(td);
    // // Columna de los inputs de las fx's
    // td = document.createElement("td");
    // td.innerHTML = `<input type="text" id="fxLagrange" disabled>`
    // fila.appendChild(td);

    // tbody.appendChild(fila);
    // // Boton de calcular
    // fila = document.createElement("tr");
    // td = document.createElement("td");
    // td.setAttribute("colspan","4");
    // td.innerHTML = `<input type="button" value="Calcular Interpolación" id="buttonLagrange" onclick="lagrangeOperacion(${numOrden})">`
    // fila.appendChild(td);
    // tbody.appendChild(fila);

    // table.appendChild(tbody);
    // div.appendChild(table);
}

function lagrangeOperacion(numOrden) {
    let xSup = parseFloat(document.getElementById("xLagrange").value);
    let operacion=0, resultado=0;
    numOrden-=1;

    let x = [];
    let fx = [];
    
    for (let y=0;y<=numOrden;y++) {
        x[y] = document.getElementById(`x${y}Lagrange`).value;
        fx[y] = document.getElementById(`fx${y}Lagrange`).value;
    }
    // console.log(x)
    // console.log(fx)
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
        console.log("resultado" + i)
    }
    document.getElementById("fxLagrange").value = resultado.toFixed(6);
}
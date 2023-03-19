function interpolacionLineal () {
    let x0,x1,fx0,fx1,x,resultado;
    // Valores de x's
    x = parseFloat(document.interLineal.xLineal.value);
    x0 = parseFloat(document.interLineal.x0Lineal.value);
    x1 = parseFloat(document.interLineal.x1Lineal.value);
    // Valores de fx's
    fx0 = parseFloat(document.interLineal.fx0Lineal.value);
    fx1 = parseFloat(document.interLineal.fx1Lineal.value);

    console.log(x,x0,x1,fx0,fx1)

    resultado = fx0 + ((fx1-fx0)/(x1-x0))*(x-x0);
    console.log(resultado)
    document.interLineal.fxLineal.value = resultado.toFixed(6);
}

function interpolacionCuadratica () {
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
    console.log(b0,b1,b2);
    
    resultado = b0 + b1*(xSup-x[0]) + b2*(xSup-x[0])*(xSup-x[1]);
    console.log(resultado);
    document.getElementById("fxCuadratica").value = resultado.toFixed(6);
}

function numOrdenLagrange() {
    let numOrden = parseInt(document.getElementById("nLagrange").value);
    numOrden +=1;

    let div, table, tbody, fila, td;
    
    ////// Empezamos a crear tabla para despliegue de inputs ///////
    div = document.getElementById("inter-Lagrange-Tabla");
    div.innerHTML="";
    
    // Creamos estructura base de la tabla
    table = document.createElement("table");
    table.id = "lagrange-Table";
    tbody = document.createElement("tbody");

    // Encabezado
    fila = document.createElement("tr");
    
    td = document.createElement("td");
    td.setAttribute("colspan","2")
    td.innerHTML = `Eje X`;
    fila.appendChild(td)
    
    td = document.createElement("td");
    td.setAttribute("colspan","2")
    td.innerHTML = `f(x)`;
    fila.appendChild(td)

    // Insertamos encabezado a la tabla
    tbody.appendChild(fila);

    for (let y=0;y<numOrden;y++) {
        fila = document.createElement("tr");

        // Columna del label de las x's
        td = document.createElement("td");
        td.innerHTML = `X<sub>${y}</sub>`;
        fila.appendChild(td);
        // Columna de los inputs de las x's
        td = document.createElement("td");
        td.innerHTML = `<input type="number" id="x${y}Lagrange" value="${y*2+1}">`
        fila.appendChild(td);
        // Columna del label de las fx's
        td = document.createElement("td");
        td.innerHTML = `f(X<sub>${y}</sub>)`;
        fila.appendChild(td);
        // Columna de los inputs de las fx's
        td = document.createElement("td");
        td.innerHTML = `<input type="number" id="fx${y}Lagrange" value="${y*8+3}">`
        fila.appendChild(td);

        // Se inserta fila a la tabla
        tbody.appendChild(fila);
    }
    fila = document.createElement("tr");
    // Columna del label X
    td = document.createElement("td");
    td.innerHTML = `X`;
    fila.appendChild(td);
    // Columna de los inputs de X
    td = document.createElement("td");
    td.innerHTML = `<input type="number" id="xLagrange" value="${6}">`
    fila.appendChild(td);
    // Columna del label de fx
    td = document.createElement("td");
    td.innerHTML = `f(X)`;
    fila.appendChild(td);
    // Columna de los inputs de las fx's
    td = document.createElement("td");
    td.innerHTML = `<input type="text" id="fxLagrange" disabled>`
    fila.appendChild(td);

    tbody.appendChild(fila);
    // Boton de calcular
    fila = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("colspan","4");
    td.innerHTML = `<input type="button" value="Calcular Interpolación" id="buttonLagrange" onclick="lagrangeOperacion(${numOrden})">`
    fila.appendChild(td);
    tbody.appendChild(fila);

    table.appendChild(tbody);
    div.appendChild(table);
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
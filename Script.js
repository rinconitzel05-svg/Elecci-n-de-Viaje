/* ==========================================
   SISTEMA DE RESERVACIONES
   Agencia de Viajes
========================================== */


/* ==========================================
   ELEMENTOS DEL FORMULARIO
========================================== */

const formulario = document.getElementById("reservationForm");

const nombreInput = document.getElementById("nombre");
const personasInput = document.getElementById("personas");
const nochesInput = document.getElementById("noches");

const destinoSelect = document.getElementById("destino");
const playaSelect = document.getElementById("playa");
const hotelSelect = document.getElementById("hotel");

const resultado = document.getElementById("resultado");


/* ==========================================
   INFORMACIÓN DE DESTINOS
========================================== */

const destinos = {

    cancun: {

        nombre: "Cancún",

        playas: [
            "Playa Delfines",
            "Playa Tortugas",
            "Playa Marlín"
        ],

        hoteles: [
            {
                nombre: "Live Aqua Cancún",
                precio: 3500
            },
            {
                nombre: "Grand Oasis Cancún",
                precio: 2800
            },
            {
                nombre: "Krystal Cancún",
                precio: 2500
            }
        ]

    },


    acapulco: {

        nombre: "Acapulco",

        playas: [
            "Playa Condesa",
            "Playa Icacos",
            "Playa Revolcadero"
        ],

        hoteles: [
            {
                nombre: "Tropicano Hotel",
                precio: 1800
            },
            {
                nombre: "Hotel Emporio Acapulco",
                precio: 2200
            },
            {
                nombre: "Hotel Las Brisas",
                precio: 3000
            }
        ]

    }

};


/* ==========================================
   CAMBIO DE DESTINO
========================================== */

destinoSelect.addEventListener("change", function () {

    const destinoSeleccionado = destinoSelect.value;

    // Limpiar opciones anteriores
    playaSelect.innerHTML = "";
    hotelSelect.innerHTML = "";

    // Si no se seleccionó destino
    if (destinoSeleccionado === "") {

        playaSelect.disabled = true;
        hotelSelect.disabled = true;

        playaSelect.innerHTML =
            '<option value="">-- Primero selecciona un destino --</option>';

        hotelSelect.innerHTML =
            '<option value="">-- Primero selecciona un destino --</option>';

        return;
    }


    const destino = destinos[destinoSeleccionado];


    /* ------------------------------------------
       CARGAR PLAYAS
    ------------------------------------------ */

    playaSelect.disabled = false;

    const opcionPlayaInicial = document.createElement("option");

    opcionPlayaInicial.value = "";
    opcionPlayaInicial.textContent = "-- Selecciona una playa --";

    playaSelect.appendChild(opcionPlayaInicial);


    destino.playas.forEach(function (playa) {

        const opcion = document.createElement("option");

        opcion.value = playa;
        opcion.textContent = playa;

        playaSelect.appendChild(opcion);

    });


    /* ------------------------------------------
       CARGAR HOTELES
    ------------------------------------------ */

    hotelSelect.disabled = false;

    const opcionHotelInicial = document.createElement("option");

    opcionHotelInicial.value = "";
    opcionHotelInicial.textContent = "-- Selecciona un hotel --";

    hotelSelect.appendChild(opcionHotelInicial);


    destino.hoteles.forEach(function (hotel, indice) {

        const opcion = document.createElement("option");

        opcion.value = indice;
        opcion.textContent =
            `${hotel.nombre} — $${hotel.precio.toLocaleString("es-MX")} por noche`;

        hotelSelect.appendChild(opcion);

    });

});


/* ==========================================
   ENVÍO DEL FORMULARIO
========================================== */

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();


    /* ------------------------------------------
       OBTENER DATOS
    ------------------------------------------ */

    const nombre = nombreInput.value.trim();

    const personas = Number(personasInput.value);

    const noches = Number(nochesInput.value);

    const destinoSeleccionado = destinoSelect.value;

    const playaSeleccionada = playaSelect.value;

    const hotelSeleccionado = hotelSelect.value;


    /* ------------------------------------------
       VALIDACIÓN
    ------------------------------------------ */

    if (nombre === "") {

        mostrarError(
            "Por favor, escribe el nombre del cliente."
        );

        return;
    }


    if (personas < 1 || noches < 1) {

        mostrarError(
            "El número de personas y noches debe ser mayor a cero."
        );

        return;
    }


    if (destinoSeleccionado === "") {

        mostrarError(
            "Por favor, selecciona un destino."
        );

        return;
    }


    if (playaSeleccionada === "") {

        mostrarError(
            "Por favor, selecciona una playa."
        );

        return;
    }


    if (hotelSeleccionado === "") {

        mostrarError(
            "Por favor, selecciona un hotel."
        );

        return;
    }


    /* ------------------------------------------
       OBTENER INFORMACIÓN DEL DESTINO
    ------------------------------------------ */

    const destino =
        destinos[destinoSeleccionado];


    const hotel =
        destino.hoteles[Number(hotelSeleccionado)];


    /* ------------------------------------------
       CÁLCULO DEL SUBTOTAL
       
       Personas × Noches × Precio del hotel
    ------------------------------------------ */

    const subtotal =
        personas *
        noches *
        hotel.precio;


    /* ------------------------------------------
       DESCUENTO
       
       Si subtotal >= $20,000
       aplicar 10 %
    ------------------------------------------ */

    let descuento = 0;


    if (subtotal >= 20000) {

        descuento = subtotal * 0.10;

    }


    /* ------------------------------------------
       TOTAL
    ------------------------------------------ */

    const total =
        subtotal - descuento;


    /* ------------------------------------------
       MOSTRAR RESUMEN
    ------------------------------------------ */

    mostrarResultado({

        nombre: nombre,

        destino: destino.nombre,

        playa: playaSeleccionada,

        hotel: hotel.nombre,

        personas: personas,

        noches: noches,

        subtotal: subtotal,

        descuento: descuento,

        total: total

    });

});


/* ==========================================
   FUNCIÓN PARA MOSTRAR RESULTADO
========================================== */

function mostrarResultado(datos) {

    resultado.innerHTML = `

        <h3 class="result-title">
            🌴 Reservación
        </h3>


        <div class="reservation-summary">

            <div class="summary-item">
                <span>Cliente:</span>
                <span>${datos.nombre}</span>
            </div>


            <div class="summary-item">
                <span>Destino:</span>
                <span>${datos.destino}</span>
            </div>


            <div class="summary-item">
                <span>Playa:</span>
                <span>${datos.playa}</span>
            </div>


            <div class="summary-item">
                <span>Hotel:</span>
                <span>${datos.hotel}</span>
            </div>


            <div class="summary-item">
                <span>Personas:</span>
                <span>${datos.personas}</span>
            </div>


            <div class="summary-item">
                <span>Noches:</span>
                <span>${datos.noches}</span>
            </div>


            <div class="summary-item">
                <span>Subtotal:</span>
                <span>
                    ${formatearMoneda(datos.subtotal)}
                </span>
            </div>


            <div class="summary-item">
                <span>Descuento 10%:</span>

                <span class="discount">

                    ${formatearMoneda(datos.descuento)}

                </span>
            </div>


            <div class="summary-item">

                <span>Total a pagar:</span>

                <span class="total">

                    ${formatearMoneda(datos.total)}

                </span>

            </div>

        </div>


        <div class="success-message">

            ¡Gracias por reservar con nosotros,
            ${datos.nombre}! ✈️

        </div>

    `;

}


/* ==========================================
   FUNCIÓN PARA MOSTRAR ERRORES
========================================== */

function mostrarError(mensaje) {

    resultado.innerHTML = `

        <div class="result-placeholder">

            <span class="result-icon">⚠️</span>

            <h3>Revisa tus datos</h3>

            <p>
                ${mensaje}
            </p>

        </div>

    `;

}


/* ==========================================
   FORMATO DE MONEDA
========================================== */

function formatearMoneda(cantidad) {

    return cantidad.toLocaleString(
        "es-MX",
        {
            style: "currency",
            currency: "MXN"
        }
    );

}

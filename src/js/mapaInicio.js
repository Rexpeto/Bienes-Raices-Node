(function () {
    const lat = 10.60003150010103;
    const lng = -71.64964139210007;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);

    let markers = new L.FeatureGroup().addTo(mapa);
    let propiedades = [];

    //? Filtros
    const filtros = {
        categoria: '',
        precio: ''
    }

    const categoriaSelect = document.querySelector('#categorias');
    const precioSelect = document.querySelector('#precios');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //? Filtrado de categoria y precio
    categoriaSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value;
        filtrarPropiedades(filtros);
    })

    precioSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value;
        filtrarPropiedades(filtros);
    })


    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades';
            const respuesta = await fetch(url);
            propiedades = await respuesta.json();

            mostrarPropiedades(propiedades);
        } catch (error) {
            console.log(error);
        }
    }
    
    const mostrarPropiedades = propiedades => {
        //? Limpiar los markers
        markers.clearLayers();
        
        propiedades.forEach(propiedad => {
            const {titulo, lat, lng, imagen} = propiedad;
            //* Agregar pines
            const marker = new L.marker([lat, lng], {
                autoPan: true
            })
                .addTo(mapa)
                .bindPopup(`
                    <p class="text-gray-600 font-bold">${propiedad.categoria.nombre}</p>
                    <h1 class="text-base font-extrabold uppercase my-1">${titulo}</h1>
                    <img src="uploads/${imagen}" alt="${titulo}" class="rounded-sm">
                    <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
                    <a href='#' class="bg-indigo-600 block p-2 text-center text-bold uppercase text-white">Ver Detalles</a>
                `)
                markers.addLayer(marker);
        });
    }

    const filtrarPropiedades = filtros => {
        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio);

        mostrarPropiedades(resultado);
    }

    const filtrarCategoria = propiedad => filtros.categoria ? propiedad.id_categoria === filtros.categoria : propiedad;
    const filtrarPrecio = propiedad => filtros.precio ? propiedad.id_precio === filtros.precio : propiedad;

    obtenerPropiedades();
})()
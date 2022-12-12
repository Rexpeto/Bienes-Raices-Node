/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\n    const lat = 10.60003150010103;\n    const lng = -71.64964139210007;\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);\n\n    let markers = new L.FeatureGroup().addTo(mapa);\n    let propiedades = [];\n\n    //? Filtros\n    const filtros = {\n        categoria: '',\n        precio: ''\n    }\n\n    const categoriaSelect = document.querySelector('#categorias');\n    const precioSelect = document.querySelector('#precios');\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    //? Filtrado de categoria y precio\n    categoriaSelect.addEventListener('change', e => {\n        filtros.categoria = +e.target.value;\n        filtrarPropiedades(filtros);\n    })\n\n    precioSelect.addEventListener('change', e => {\n        filtros.precio = +e.target.value;\n        filtrarPropiedades(filtros);\n    })\n\n\n    const obtenerPropiedades = async () => {\n        try {\n            const url = '/api/propiedades';\n            const respuesta = await fetch(url);\n            propiedades = await respuesta.json();\n\n            mostrarPropiedades(propiedades);\n        } catch (error) {\n            console.log(error);\n        }\n    }\n    \n    const mostrarPropiedades = propiedades => {\n        //? Limpiar los markers\n        markers.clearLayers();\n        \n        propiedades.forEach(propiedad => {\n            const {titulo, lat, lng, imagen} = propiedad;\n            //* Agregar pines\n            const marker = new L.marker([lat, lng], {\n                autoPan: true\n            })\n                .addTo(mapa)\n                .bindPopup(`\n                    <p class=\"text-gray-600 font-bold\">${propiedad.categoria.nombre}</p>\n                    <h1 class=\"text-base font-extrabold uppercase my-1\">${titulo}</h1>\n                    <img src=\"uploads/${imagen}\" alt=\"${titulo}\" class=\"rounded-sm\">\n                    <p class=\"text-gray-600 font-bold\">${propiedad.precio.nombre}</p>\n                    <a href='#' class=\"bg-indigo-600 block p-2 text-center text-bold uppercase text-white\">Ver Detalles</a>\n                `)\n                markers.addLayer(marker);\n        });\n    }\n\n    const filtrarPropiedades = filtros => {\n        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio);\n\n        mostrarPropiedades(resultado);\n    }\n\n    const filtrarCategoria = propiedad => filtros.categoria ? propiedad.id_categoria === filtros.categoria : propiedad;\n    const filtrarPrecio = propiedad => filtros.precio ? propiedad.id_precio === filtros.precio : propiedad;\n\n    obtenerPropiedades();\n})()\n\n//# sourceURL=webpack://node/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
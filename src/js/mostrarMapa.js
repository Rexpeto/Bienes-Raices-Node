(function () {
    const lat = document.querySelector('#lat').textContent;
    const lng = document.querySelector('#lng').textContent;
    const calle = document.querySelector('#calle').textContent !== '' ? document.querySelector('#calle').textContent : 'No se ubicó la calle';
    const mapa = L.map('mapa').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //? Agregar pin
    L.marker([lat, lng])
        .bindPopup(calle)
        .addTo(mapa);

}())
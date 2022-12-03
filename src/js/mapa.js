(function() {
    const lat = 10.60003150010103;
    const lng = -71.64964139210007;
    const mapa = L.map('mapa').setView([lat, lng ], 15);
    let marker;
    
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(mapa);

    marker.on('moveend', function (e) {
        marker = e.target;
        const position = marker.getLatLng();
        mapa.panTo(new L.LatLng(position.lat, position.lng));

        geocodeService.reverse().latlng(position, 13).run(function (error, result) {
            marker.bindPopup(result.address.LongLabel);

            console.log(result)

            document.querySelector('.calle').textContent = result?.address?.Address ?? '';
            document.querySelector('#calle').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        });
    })

})()
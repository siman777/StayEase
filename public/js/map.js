const mapDiv = document.getElementById('map');

if (mapDiv) {
  const coordAttr = mapDiv.dataset.coordinates;
  const title = mapDiv.dataset.title || "No Title";
  const location = mapDiv.dataset.location || "Unknown";

  if (coordAttr) {
    const [lng, lat] = coordAttr.split(',').map(Number);
    console.log('Map coordinates:', lat, lng); // Debug

    if (!isNaN(lat) && !isNaN(lng)) {
      const map = L.map('map').setView([lat, lng], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      }).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<strong>${title}</strong><br>${location}`)
        .openPopup();
    } else {
      console.error('Invalid lat/lng');
    }
  } else {
    console.error('No coordinates provided in data attribute');
  }
}

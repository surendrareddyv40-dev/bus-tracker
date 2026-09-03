const map = L.map('map').setView([12.9716, 77.5946], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const routes = {
  bus1: [
    [12.9716, 77.5946],
    [12.9750, 77.6000],
    [12.9800, 77.6050],
    [12.9850, 77.6100]
  ],
  bus2: [
    [12.9600, 77.5900],
    [12.9650, 77.5950],
    [12.9700, 77.6000],
    [12.9750, 77.6050]
  ]
};

const busIcon = L.divIcon({ html: "🚌", className: "bus-icon", iconSize: [30, 30] });

let markers = {
  bus1: L.marker(routes.bus1[0], { icon: busIcon }).addTo(map),
  bus2: L.marker(routes.bus2[0], { icon: busIcon }).addTo(map)
};

let positions = { bus1: 0, bus2: 0 };
let delayed = { bus1: false, bus2: false };

setInterval(() => {
  for (let bus in routes) {
    if (Math.random() < 0.1) {
      delayed[bus] = true;
    }

    if (!delayed[bus]) {
      positions[bus] = (positions[bus] + 1) % routes[bus].length;
      markers[bus].setLatLng(routes[bus][positions[bus]]);
    } else {
      if (Math.random() < 0.3) delayed[bus] = false;
    }
  }
  updateSelectedBusInfo();
}, 2000);

function updateSelectedBusInfo() {
  const selected = document.getElementById('routeSelect').value;
  const etaBox = document.getElementById('etaBox');
  const alertBox = document.getElementById('alertBox');

  const remainingStops = routes[selected].length - positions[selected];
  const estimatedMins = remainingStops * 2;

  etaBox.textContent = `ETA: ${estimatedMins} mins`;

  if (delayed[selected]) {
    alertBox.textContent = `⚠️ ${selected.toUpperCase()} is currently delayed`;
  } else {
    alertBox.textContent = '';
  }
}

document.getElementById('routeSelect').addEventListener('change', updateSelectedBusInfo);


const ROUTE_STOPS = [
  { name: "Chittoor Bus Stand", lat: 13.2172, lng: 79.1003 },
  { name: "Puthalapattu",       lat: 13.1580, lng: 79.0850 },
  { name: "Palamaner",          lat: 13.2011, lng: 78.9950 },
  { name: "Gudiyatham",         lat: 12.9450, lng: 78.8700 },
  { name: "Vellore Junction",   lat: 12.9165, lng: 79.1325 }
];

function buildPath(stops, stepsPerLeg) {
  const path = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i], b = stops[i + 1];
    for (let s = 0; s < stepsPerLeg; s++) {
      const t = s / stepsPerLeg;
      path.push({
        lat: a.lat + (b.lat - a.lat) * t,
        lng: a.lng + (b.lng - a.lng) * t,
        legIndex: i
      });
    }
  }
  path.push({ ...stops[stops.length - 1], legIndex: stops.length - 2 });
  return path;
}

const STEPS_PER_LEG = 40;
const PATH = buildPath(ROUTE_STOPS, STEPS_PER_LEG);

const map = L.map("map", { zoomControl: true, attributionControl: true }).setView(
  [ROUTE_STOPS[2].lat, ROUTE_STOPS[2].lng], 10
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const routeLine = L.polyline(
  ROUTE_STOPS.map(s => [s.lat, s.lng]),
  { color: "#3ED6B5", weight: 3, opacity: 0.55 }
).addTo(map);

ROUTE_STOPS.forEach(stop => {
  L.circleMarker([stop.lat, stop.lng], {
    radius: 5, color: "#8B98A5", fillColor: "#121820", fillOpacity: 1, weight: 2
  }).addTo(map).bindTooltip(stop.name, { direction: "top" });
});

const busIcon = L.divIcon({
  className: "bus-marker",
  html: '<div style="width:16px;height:16px;border-radius:50%;background:#3ED6B5;box-shadow:0 0 0 5px rgba(62,214,181,0.25);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const busMarker = L.marker([PATH[0].lat, PATH[0].lng], { icon: busIcon }).addTo(map);
map.fitBounds(routeLine.getBounds(), { padding: [30, 30] });

let pathIndex = 0;

const els = {
  progressLabel: document.getElementById("progressLabel"),
  etaMinutes: document.getElementById("etaMinutes"),
  nextStopName: document.getElementById("nextStopName"),
  directionLabel: document.getElementById("directionLabel"),
  statusPill: document.getElementById("statusPill"),
  crowdPill: document.getElementById("crowdPill"),
  crowdFill: document.getElementById("crowdFill"),
  driverSpeed: document.getElementById("driverSpeed"),
  adherenceReadout: document.getElementById("adherenceReadout"),
  adherenceDetail: document.getElementById("adherenceDetail"),
  driverNextStop: document.getElementById("driverNextStop"),
  driverDistance: document.getElementById("driverDistance"),
  telemetryFeed: document.getElementById("telemetryFeed"),
  fleetTimestamp: document.getElementById("fleetTimestamp")
};

function currentOccupancyPercent() {
  const t = Date.now() / 20000;
  const wave = Math.sin(t) * 0.5 + 0.5;
  return Math.round(15 + wave * 75);
}

function occupancyLabel(pct) {
  if (pct < 40) return { label: "Low", cls: "" };
  if (pct < 75) return { label: "Medium", cls: "pill-amber" };
  return { label: "Full", cls: "pill-red" };
}

function updateCommuterView() {
  const point = PATH[pathIndex];
  busMarker.setLatLng([point.lat, point.lng]);

  const progressPct = Math.round((pathIndex / (PATH.length - 1)) * 100);
  els.progressLabel.textContent = `${progressPct}% along route`;

  const nextStop = ROUTE_STOPS[Math.min(point.legIndex + 1, ROUTE_STOPS.length - 1)];
  els.nextStopName.textContent = nextStop.name;
  els.directionLabel.textContent = "Vellore-bound";

  const stepsRemainingInLeg = STEPS_PER_LEG - (pathIndex % STEPS_PER_LEG);
  const etaMin = Math.max(1, Math.round(stepsRemainingInLeg / 8));
  els.etaMinutes.textContent = etaMin;

  const occ = currentOccupancyPercent();
  const { label, cls } = occupancyLabel(occ);
  els.crowdPill.textContent = `${label} · ${occ}%`;
  els.crowdPill.className = "pill " + cls;
  els.crowdFill.style.width = occ + "%";
  els.crowdFill.style.background =
    occ < 40 ? "var(--teal)" : occ < 75 ? "var(--amber)" : "var(--red)";
}

const FLEET = [
  { bus: "101", route: "Chittoor–Vellore", status: "ontime", stop: "Puthalapattu", occ: 42, driver: "R. Suresh" },
  { bus: "102", route: "Chittoor–Palamaner", status: "delayed", delay: 6, stop: "Chittoor Bus Stand", occ: 78, driver: "K. Anitha" },
  { bus: "204", route: "Gudiyatham–Vellore", status: "ontime", stop: "Gudiyatham", occ: 25, driver: "M. Vijay" },
  { bus: "202", route: "Crosstown Loop", status: "alert", stop: "4th Street (detour)", occ: 61, driver: "S. Farooq" },
  { bus: "115", route: "Vellore–Katpadi", status: "ontime", stop: "Vellore Junction", occ: 33, driver: "P. Lakshmi" }
];

function statusTag(bus) {
  if (bus.status === "ontime") return `<span class="status-tag status-ontime">On time</span>`;
  if (bus.status === "delayed") return `<span class="status-tag status-delayed">Delayed ${bus.delay} min</span>`;
  return `<span class="status-tag status-alert">Attention needed</span>`;
}

function occTag(pct) {
  const { label } = occupancyLabel(pct);
  return `${label} · ${pct}%`;
}

function renderFleetTable() {
  const tbody = document.querySelector("#fleetTable tbody");
  tbody.innerHTML = FLEET.map(bus => `
    <tr>
      <td>${bus.bus}</td>
      <td>${bus.route}</td>
      <td>${statusTag(bus)}</td>
      <td>${bus.stop}</td>
      <td>${occTag(bus.occ)}</td>
      <td>${bus.driver}</td>
    </tr>
  `).join("");
  els.fleetTimestamp.textContent = "Last synced " + new Date().toLocaleTimeString();
}

const DELAYS = [
  { bus: "102", text: "Running 6 min behind schedule near Chittoor Bus Stand.", severe: false },
  { bus: "202", text: "Detour on 4th Street pushing 3 stops back by ~10 min.", severe: true }
];

function renderDelayList() {
  const list = document.getElementById("delayList");
  list.innerHTML = DELAYS.map(d => `
    <li class="${d.severe ? "severe" : ""}">
      ${d.text}
      <span class="notif-bus">Bus ${d.bus}</span>
    </li>
  `).join("");
}

const ASSIGNMENTS = [
  { driver: "R. Suresh", bus: "101", route: "Chittoor–Vellore", shift: "06:00 – 14:00", checked: "Yes" },
  { driver: "K. Anitha", bus: "102", route: "Chittoor–Palamaner", shift: "06:00 – 14:00", checked: "Yes" },
  { driver: "M. Vijay",  bus: "204", route: "Gudiyatham–Vellore", shift: "14:00 – 22:00", checked: "Yes" },
  { driver: "S. Farooq", bus: "202", route: "Crosstown Loop", shift: "06:00 – 14:00", checked: "Pending" },
  { driver: "P. Lakshmi", bus: "115", route: "Vellore–Katpadi", shift: "14:00 – 22:00", checked: "Yes" }
];

function renderAssignmentTable() {
  const tbody = document.querySelector("#assignTable tbody");
  tbody.innerHTML = ASSIGNMENTS.map(a => `
    <tr>
      <td>${a.driver}</td>
      <td>${a.bus}</td>
      <td>${a.route}</td>
      <td>${a.shift}</td>
      <td>${a.checked}</td>
    </tr>
  `).join("");
}

function updateDriverView() {
  const speed = Math.round(28 + Math.sin(Date.now() / 4000) * 10 + Math.random() * 3);
  els.driverSpeed.textContent = Math.max(0, speed);

  const point = PATH[pathIndex];
  const nextStop = ROUTE_STOPS[Math.min(point.legIndex + 1, ROUTE_STOPS.length - 1)];
  els.driverNextStop.textContent = nextStop.name;

  const stepsRemainingInLeg = STEPS_PER_LEG - (pathIndex % STEPS_PER_LEG);
  const distanceKm = (stepsRemainingInLeg * 0.15).toFixed(1);
  els.driverDistance.textContent = `${distanceKm} km`;

  const adherenceMin = Math.round(Math.sin(Date.now() / 15000) * 4);
  if (Math.abs(adherenceMin) <= 1) {
    els.adherenceReadout.textContent = "On time";
    els.adherenceReadout.style.color = "var(--teal)";
    els.adherenceDetail.textContent = "Matching timetable within tolerance.";
  } else if (adherenceMin > 1) {
    els.adherenceReadout.textContent = `${adherenceMin} min ahead`;
    els.adherenceReadout.style.color = "var(--amber)";
    els.adherenceDetail.textContent = "Consider holding briefly at the next stop.";
  } else {
    els.adherenceReadout.textContent = `${Math.abs(adherenceMin)} min behind`;
    els.adherenceReadout.style.color = "var(--red)";
    els.adherenceDetail.textContent = "Depot has been notified automatically.";
  }
}

const sosButton = document.getElementById("sosButton");
const sosStatus = document.getElementById("sosStatus");
let sosTimer = null;

sosButton.addEventListener("click", () => {
  sosButton.classList.add("is-sent");
  sosButton.textContent = "SENT";
  sosStatus.textContent = "Alert sent to depot control with your live location.";
  clearTimeout(sosTimer);
  sosTimer = setTimeout(() => {
    sosButton.classList.remove("is-sent");
    sosButton.textContent = "SOS";
    sosStatus.textContent = "Press and hold in a real emergency. Alerts depot control instantly.";
  }, 4000);
});

function pushTelemetryLine() {
  const point = PATH[pathIndex];
  const speed = Math.max(0, Math.round(28 + Math.sin(Date.now() / 4000) * 10));
  const rpm = 900 + speed * 22;
  const fuel = 61 - Math.round((pathIndex / PATH.length) * 8);
  const payload = {
    vehicle_id: "WL-101",
    lat: point.lat.toFixed(5),
    lng: point.lng.toFixed(5),
    speed_kmph: speed,
    engine_rpm_pid0C: rpm,
    fuel_level_pct_pid2F: fuel,
    ts: new Date().toISOString()
  };

  const feed = els.telemetryFeed;
  const line = document.createElement("div");
  line.textContent = JSON.stringify(payload);
  feed.appendChild(line);

  while (feed.childNodes.length > 30) {
    feed.removeChild(feed.firstChild);
  }
  feed.scrollTop = feed.scrollHeight;
}

const roleButtons = document.querySelectorAll(".role-btn");
const views = document.querySelectorAll(".view");

roleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    roleButtons.forEach(b => {
      b.classList.remove("is-active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");

    const targetId = "view-" + btn.dataset.view;
    views.forEach(v => v.classList.toggle("is-active", v.id === targetId));

    if (targetId === "view-commuter") {
      setTimeout(() => map.invalidateSize(), 50);
    }
  });
});

renderFleetTable();
renderDelayList();
renderAssignmentTable();
updateCommuterView();
updateDriverView();
for (let i = 0; i < 4; i++) pushTelemetryLine();

setInterval(() => {
  pathIndex = (pathIndex + 1) % PATH.length;
  updateCommuterView();
  updateDriverView();
}, 700);

setInterval(pushTelemetryLine, 2200);
setInterval(renderFleetTable, 8000);

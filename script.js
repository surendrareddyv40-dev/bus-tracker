
const routes = [
  {
    id: "101",
    badge: "101",
    name: "Chittoor → Vellore",
    sub: "Vellore-bound · Favorite",
    favorite: true,
    direction: "Vell.",
    stops: [
      { name: "Chittoor Bus Stand", distance: "0.2 mi away", status: "next", eta: 3 },
      { name: "Palamaner", distance: "0.6 mi away", status: "following", eta: 9 },
      { name: "Gudiyatham", distance: "1.1 mi away", status: "following", eta: 15 },
      { name: "Katpadi", distance: "1.7 mi away", status: "following", eta: 21 }
    ],
    connectionStop: "Palamaner",
    connectionTime: "08:50"
  },
  {
    id: "202",
    badge: "202",
    name: "Crosstown",
    sub: "Eastbound",
    favorite: false,
    direction: "East",
    stops: [
      { name: "Market & 2nd", distance: "0.3 mi away", status: "next", eta: 5 },
      { name: "4th Street", distance: "0.9 mi away", status: "following", eta: 12 },
      { name: "Fairview", distance: "1.4 mi away", status: "following", eta: 18 },
      { name: "Harbor Loop", distance: "2.0 mi away", status: "following", eta: 24 }
    ],
    connectionStop: "Fairview",
    connectionTime: "09:05"
  },
  {
    id: "303",
    badge: "303",
    name: "Airport Connector",
    sub: "Southbound",
    favorite: false,
    direction: "South",
    stops: [
      { name: "Terminal A", distance: "0.4 mi away", status: "next", eta: 4 },
      { name: "Cargo Gate", distance: "1.0 mi away", status: "following", eta: 11 },
      { name: "Rental Row", distance: "1.6 mi away", status: "following", eta: 17 },
      { name: "Downtown Hub", distance: "2.3 mi away", status: "following", eta: 26 }
    ],
    connectionStop: "Rental Row",
    connectionTime: "09:20"
  },
  {
    id: "404",
    badge: "404",
    name: "Riverside Express",
    sub: "Westbound",
    favorite: false,
    direction: "West",
    stops: [
      { name: "Riverside Park", distance: "0.2 mi away", status: "next", eta: 2 },
      { name: "Mill Street", distance: "0.8 mi away", status: "following", eta: 8 },
      { name: "Old Bridge", distance: "1.3 mi away", status: "following", eta: 14 },
      { name: "Westgate", distance: "1.9 mi away", status: "following", eta: 20 }
    ],
    connectionStop: "Old Bridge",
    connectionTime: "08:40"
  },
  {
    id: "505",
    badge: "505",
    name: "University Line",
    sub: "Eastbound",
    favorite: false,
    direction: "East",
    stops: [
      { name: "Main Quad", distance: "0.1 mi away", status: "next", eta: 6 },
      { name: "Library Circle", distance: "0.5 mi away", status: "following", eta: 13 },
      { name: "Stadium Gate", distance: "1.2 mi away", status: "following", eta: 19 },
      { name: "East Housing", distance: "1.8 mi away", status: "following", eta: 25 }
    ],
    connectionStop: "Library Circle",
    connectionTime: "09:00"
  }
];

let activeRouteId = "101";

function formatTime(date){
  return date.toTimeString().slice(0,8);
}

function renderRouteCards(){
  const el = document.getElementById("routes");
  el.innerHTML = routes.map(r => `
    <button class="route-card ${r.id === activeRouteId ? "active" : ""}" data-id="${r.id}">
      <span class="route-badge">${r.badge}</span>
      <p class="route-name">${r.name}</p>
      <p class="route-sub">${r.sub}</p>
    </button>
  `).join("");

  el.querySelectorAll(".route-card").forEach(card => {
    card.addEventListener("click", () => {
      activeRouteId = card.dataset.id;
      renderRouteCards();
      renderSnapshot();
      renderStops();
    });
  });
}

function currentRoute(){
  return routes.find(r => r.id === activeRouteId);
}

function renderSnapshot(){
  const r = currentRoute();
  const nextStop = r.stops[0];

  document.getElementById("snapRoute").textContent = `Bus ${r.id}`;
  document.getElementById("snapPath").textContent = `${r.name} · ${r.sub.split(" · ")[0]}`;
  document.getElementById("etaMinutes").textContent = nextStop.eta;
  document.getElementById("nextStop").textContent = nextStop.name;
  document.getElementById("statStops").textContent = `${r.stops.length} total`;
  document.getElementById("statDirection").textContent = r.direction;
  document.getElementById("lastUpdated").textContent = formatTime(new Date());

  document.getElementById("mapBusName").textContent = `Bus ${r.id} is moving`;
  document.getElementById("connectionStop").textContent = r.connectionStop;
  document.getElementById("connectionTime").textContent = r.connectionTime;

  const favBtn = document.getElementById("favBtn");
  favBtn.classList.toggle("is-fav", !!r.favorite);

  document.getElementById("liveAsOf").textContent = `Live as of ${formatTime(new Date()).slice(0,5)}`;
}

function renderStops(){
  const r = currentRoute();
  const list = document.getElementById("stopList");
  list.innerHTML = r.stops.map(s => `
    <li class="stop-item">
      <span class="stop-status ${s.status}"></span>
      <div class="stop-info">
        <p class="stop-name">${s.name}</p>
        <p class="stop-meta">${s.distance} · ${s.status === "next" ? "Next stop" : "Following"}</p>
      </div>
      <div class="stop-eta">
        <p class="stop-time">${s.eta} min</p>
        <p class="stop-arrival">arrival</p>
      </div>
    </li>
  `).join("");
}

function updateDate(){
  const el = document.getElementById("today");
  const opts = { weekday: "long", month: "long", day: "numeric" };
  el.textContent = new Date().toLocaleDateString("en-US", opts).toUpperCase();
}

function simulateProgress(){
  const progress = Math.floor(15 + Math.random() * 20);
  document.getElementById("mapProgress").textContent = `${progress}% along route`;
}

document.getElementById("refreshBtn").addEventListener("click", () => {
  renderSnapshot();
  simulateProgress();
});

document.getElementById("favBtn").addEventListener("click", () => {
  const r = currentRoute();
  r.favorite = !r.favorite;
  renderRouteCards();
  renderSnapshot();
});

updateDate();
renderRouteCards();
renderSnapshot();
renderStops();
simulateProgress();

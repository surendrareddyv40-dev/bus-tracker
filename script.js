const busFleet = [
  { id: "Bus 101", route: "Chittoor → Vellore", type: "APSRTC Express", reg: "AP 03 Z 1012", driver: "K. Ramesh", lic: "AP-03-2018092", shift: "06:00 - 14:00", currentStop: "Gudipala Junction", dest: "Vellore New Bus Stand", progress: 35, eta: 4, speed: 42, speedLimit: 50, passengers: 38, capacity: 55, status: "On Time" },
  { id: "Bus 102", route: "Chittoor → Tirupati", type: "APSRTC Palle Velugu", reg: "AP 03 Z 2041", driver: "S. Venkatesh", lic: "AP-03-2016441", shift: "06:30 - 14:30", currentStop: "Chandragiri Bypass", dest: "Tirupati Central Bus Stand", progress: 60, eta: 11, speed: 48, speedLimit: 50, passengers: 52, capacity: 55, status: "Delayed (+12m)" },
  { id: "Bus 103", route: "Chittoor → Bengaluru", type: "APSRTC Super Luxury", reg: "AP 03 Z 3311", driver: "M. Nageswara Rao", lic: "AP-03-2015002", shift: "07:00 - 15:00", currentStop: "Palamaner Depot", dest: "Majestic (KSRTC) Bengaluru", progress: 22, eta: 8, speed: 65, speedLimit: 70, passengers: 28, capacity: 45, status: "On Time" },
  { id: "Bus 104", route: "Chittoor → Chennai", type: "TNSTC Express", reg: "TN 23 N 1892", driver: "R. Selvam", lic: "TN-23-2017882", shift: "05:30 - 13:30", currentStop: "Ranipet Bypass", dest: "CMBT Koyambedu Chennai", progress: 45, eta: 6, speed: 58, speedLimit: 60, passengers: 49, capacity: 50, status: "On Time" },
  { id: "Bus 105", route: "Tirupati → Vellore", type: "APSRTC Ultra Deluxe", reg: "AP 03 Z 5092", driver: "P. Srinivasa", lic: "AP-03-2019120", shift: "08:00 - 16:00", currentStop: "Panapakam Junction", dest: "Vellore Katpadi Junction", progress: 15, eta: 14, speed: 50, speedLimit: 60, passengers: 40, capacity: 48, status: "Delayed (+8m)" },
  { id: "Bus 106", route: "Chittoor → Madanapalle", type: "APSRTC Express", reg: "AP 03 Z 6112", driver: "G. Harikrishna", lic: "AP-03-2020411", shift: "06:00 - 14:00", currentStop: "Kallur X Road", dest: "Madanapalle Bus Stand", progress: 70, eta: 5, speed: 44, speedLimit: 50, passengers: 22, capacity: 55, status: "On Time" },
  { id: "Bus 107", route: "Vellore → Chittoor", type: "TNSTC City Bus", reg: "TN 23 N 2201", driver: "K. Vijay", lic: "TN-23-2019001", shift: "07:00 - 15:00", currentStop: "Katpadi Bus Stop", dest: "Chittoor Old Bus Stand", progress: 80, eta: 3, speed: 38, speedLimit: 40, passengers: 54, capacity: 55, status: "Crowded" },
  { id: "Bus 108", route: "Tirupati → Bengaluru", type: "FreshBus Electric Express", reg: "AP 03 EV 0042", driver: "D. Siva Kumar", lic: "AP-03-2022019", shift: "09:00 - 17:00", currentStop: "Chittoor Bypass", dest: "Electronic City Bengaluru", progress: 40, eta: 7, speed: 62, speedLimit: 70, passengers: 30, capacity: 42, status: "On Time" },
  { id: "Bus 109", route: "Chittoor → Palamaner", type: "Local Feeder", reg: "AP 03 Z 7018", driver: "T. Anand", lic: "AP-03-2018223", shift: "06:15 - 14:15", currentStop: "Bangarupalyam", dest: "Palamaner Bus Stand", progress: 55, eta: 6, speed: 40, speedLimit: 50, passengers: 45, capacity: 50, status: "On Time" },
  { id: "Bus 110", route: "Pileru → Chittoor", type: "APSRTC Palle Velugu", reg: "AP 03 Z 8820", driver: "V. Bhaskar", lic: "AP-03-2017332", shift: "05:45 - 13:45", currentStop: "Damalcheruvu", dest: "Chittoor Main Depot", progress: 65, eta: 9, speed: 45, speedLimit: 50, passengers: 31, capacity: 55, status: "On Time" },
  { id: "Bus 111", route: "Chittoor → Kuppam", type: "APSRTC Express", reg: "AP 03 Z 9102", driver: "N. Mani", lic: "AP-03-2019881", shift: "07:30 - 15:30", currentStop: "V.Kota Main Junction", dest: "Kuppam Bus Stand", progress: 30, eta: 12, speed: 46, speedLimit: 50, passengers: 36, capacity: 55, status: "On Time" },
  { id: "Bus 112", route: "Madanapalle → Tirupati", type: "APSRTC Super Luxury", reg: "AP 03 Z 1289", driver: "C. Reddy", lic: "AP-03-2014510", shift: "08:30 - 16:30", currentStop: "Pileru Bypass", dest: "Tirupati RTC Stand", progress: 50, eta: 10, speed: 55, speedLimit: 60, passengers: 44, capacity: 48, status: "Delayed (+15m)" },
  { id: "Bus 113", route: "Chittoor → Srikalahasti", type: "APSRTC Express", reg: "AP 03 Z 3390", driver: "B. Suresh", lic: "AP-03-2021009", shift: "06:00 - 14:00", currentStop: "Gajulamandyam", dest: "Srikalahasti Temple Stand", progress: 75, eta: 4, speed: 52, speedLimit: 60, passengers: 48, capacity: 55, status: "On Time" },
  { id: "Bus 114", route: "Tirupati → Chennai", type: "APSRTC Garuda AC", reg: "AP 03 Z 4410", driver: "A. Prasad", lic: "AP-03-2016772", shift: "10:00 - 18:00", currentStop: "Tiruttani Junction", dest: "CMBT Chennai", progress: 50, eta: 15, speed: 60, speedLimit: 70, passengers: 25, capacity: 40, status: "On Time" },
  { id: "Bus 115", route: "Chittoor → Puttur", type: "APSRTC Local", reg: "AP 03 Z 5581", driver: "K. Mohan", lic: "AP-03-2018991", shift: "06:45 - 14:45", currentStop: "Nagari Bus Stop", dest: "Puttur Bus Stand", progress: 85, eta: 2, speed: 36, speedLimit: 40, passengers: 50, capacity: 55, status: "Crowded" },
  { id: "Bus 116", route: "Gudiyatham → Chittoor", type: "TNSTC Shuttle", reg: "TN 23 N 9921", driver: "S. Murugan", lic: "TN-23-2020112", shift: "07:15 - 15:15", currentStop: "Paradami Border", dest: "Chittoor RTC Stand", progress: 40, eta: 8, speed: 41, speedLimit: 50, passengers: 29, capacity: 50, status: "On Time" },
  { id: "Bus 117", route: "Chittoor → Kolar", type: "KSRTC Inter-State", reg: "KA 07 F 1022", driver: "H. Gowda", lic: "KA-07-2017331", shift: "08:00 - 16:00", currentStop: "Mulbagal Bypass", dest: "Kolar Bus Stand", progress: 60, eta: 7, speed: 56, speedLimit: 60, passengers: 33, capacity: 50, status: "On Time" },
  { id: "Bus 118", route: "Bengaluru → Chittoor", type: "KSRTC Rajahamsa", reg: "KA 07 F 3310", driver: "M. Kumar", lic: "KA-07-2015902", shift: "09:30 - 17:30", currentStop: "Hoskote Toll Gate", dest: "Chittoor Main Depot", progress: 25, eta: 20, speed: 64, speedLimit: 70, passengers: 39, capacity: 44, status: "On Time" },
  { id: "Bus 119", route: "Tirupati → Kadapa", type: "APSRTC Express", reg: "AP 04 Z 1109", driver: "Y. Ramaiah", lic: "AP-04-2018221", shift: "06:00 - 14:00", currentStop: "Peileru Road", dest: "Kadapa Seven Roads", progress: 35, eta: 18, speed: 54, speedLimit: 60, passengers: 42, capacity: 55, status: "On Time" },
  { id: "Bus 120", route: "Chittoor → Kanipakam", type: "Temple Special Shuttle", reg: "AP 03 Z 7721", driver: "D. Venkateswarlu", lic: "AP-03-2019441", shift: "05:00 - 13:00", currentStop: "Iruvaram Junction", dest: "Kanipakam Temple Stand", progress: 90, eta: 2, speed: 32, speedLimit: 40, passengers: 55, capacity: 55, status: "Full Capacity" }
];

document.addEventListener("DOMContentLoaded", () => {
  const commuterSelector = document.getElementById("commuter-bus-selector");
  const driverSelector = document.getElementById("driver-bus-selector");
  const fleetTableBody = document.getElementById("fleet-table-body");
  const driverRosterBody = document.getElementById("driver-roster-body");
  const sosBtn = document.getElementById("sos-trigger-btn");

  busFleet.forEach((bus, index) => {
    const opt1 = document.createElement("option");
    opt1.value = index;
    opt1.innerText = `${bus.id} - ${bus.route} (${bus.type})`;
    commuterSelector.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = index;
    opt2.innerText = `${bus.id} - ${bus.route} [Driver: ${bus.driver}]`;
    driverSelector.appendChild(opt2);

    const occupancyPct = Math.round((bus.passengers / bus.capacity) * 100);
    let badgeClass = "badge-success";
    if (occupancyPct > 85) badgeClass = "badge-danger";
    else if (occupancyPct > 60) badgeClass = "badge-warning";

    const tr1 = document.createElement("tr");
    tr1.innerHTML = `
      <td><strong>${bus.id}</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">${bus.reg}</span></td>
      <td>${bus.route}<br><span style="font-size:0.75rem; color:var(--text-muted);">${bus.type}</span></td>
      <td><span class="badge ${bus.status.includes('Delayed') ? 'badge-danger' : 'badge-success'}">${bus.status}</span></td>
      <td>${bus.currentStop}</td>
      <td><span class="badge ${badgeClass}">${occupancyPct}% (${bus.passengers}/${bus.capacity})</span></td>
      <td>${bus.speed} km/h</td>
      <td>${bus.driver}</td>
    `;
    fleetTableBody.appendChild(tr1);

    const tr2 = document.createElement("tr");
    tr2.innerHTML = `
      <td><strong>${bus.driver}</strong></td>
      <td><span style="font-family:monospace; color:var(--accent-blue);">${bus.lic}</span></td>
      <td>${bus.id} (${bus.reg})</td>
      <td>${bus.route}</td>
      <td>${bus.shift}</td>
      <td><span style="color:#3fb950; font-weight:bold;">✓ Verified</span></td>
    `;
    driverRosterBody.appendChild(tr2);
  });

  function updateCommuterView(index) {
    const bus = busFleet[index];
    const occPct = Math.round((bus.passengers / bus.capacity) * 100);

    document.getElementById("active-bus-title").innerText = `${bus.id} - ${bus.route}`;
    document.getElementById("active-bus-desc").innerText = `Operated by ${bus.type} • Vehicle ${bus.reg}`;
    document.getElementById("route-progress").style.width = bus.progress + "%";
    document.getElementById("progress-text").innerText = bus.progress;

    document.getElementById("commuter-eta").innerText = bus.eta;
    document.getElementById("commuter-next-stop").innerText = bus.currentStop;
    document.getElementById("commuter-direction").innerText = bus.dest;
    document.getElementById("commuter-occupancy-count").innerText = `${bus.passengers} / ${bus.capacity} passengers`;

    const crowdBar = document.getElementById("commuter-crowd-bar");
    const crowdBadge = document.getElementById("commuter-crowd-badge");
    crowdBar.style.width = occPct + "%";

    if (occPct > 85) {
      crowdBadge.innerText = `High (${occPct}%)`;
      crowdBadge.className = "badge badge-danger";
      crowdBar.style.background = "var(--accent-red)";
    } else if (occPct > 60) {
      crowdBadge.innerText = `Moderate (${occPct}%)`;
      crowdBadge.className = "badge badge-warning";
      crowdBar.style.background = "var(--accent-yellow)";
    } else {
      crowdBadge.innerText = `Low (${occPct}%)`;
      crowdBadge.className = "badge badge-success";
      crowdBar.style.background = "var(--accent-green)";
    }
  }

  function updateDriverView(index) {
    const bus = busFleet[index];
    document.getElementById("driver-speed").innerHTML = `${bus.speed} <span class="unit">km/h</span>`;
    document.getElementById("driver-speed-limit").innerText = `${bus.speedLimit} km/h`;
    document.getElementById("driver-assigned-name").innerText = bus.driver;
    document.getElementById("driver-route").innerText = bus.route;
    document.getElementById("driver-next-stop").innerText = bus.currentStop;
  }

  commuterSelector.addEventListener("change", (e) => updateCommuterView(e.target.value));
  driverSelector.addEventListener("change", (e) => updateDriverView(e.target.value));

  updateCommuterView(0);
  updateDriverView(0);

  const tabs = document.querySelectorAll(".nav-tab");
  const sections = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");
      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      sections.forEach(sec => sec.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.getElementById(`tab-${targetTab}`).classList.add("active");
    });
  });

  if (sosBtn) {
    sosBtn.addEventListener("click", () => {
      const selectedIndex = driverSelector.value;
      const bus = busFleet[selectedIndex];
      alert(`🚨 SOS ALERT SENT!\n\nBus: ${bus.id} (${bus.reg})\nDriver: ${bus.driver}\nRoute: ${bus.route}\n\nHigh-priority GPS coordinates pushed to Depot Control & Dispatch.`);
    });
  }

  const telemetryLog = document.getElementById("telemetry-log");
  setInterval(() => {
    const randomBus = busFleet[Math.floor(Math.random() * busFleet.length)];
    randomBus.progress = (randomBus.progress + 1) % 100;
    randomBus.speed = Math.floor(30 + Math.random() * 30);

    if (telemetryLog) {
      const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
      const lat = (13.2172 + (Math.random() * 0.05)).toFixed(4);
      const lon = (79.1003 + (Math.random() * 0.05)).toFixed(4);

      const newLog = `[${timestamp}] PUB/MQTT -> ${randomBus.id} (${randomBus.reg}) | SPD:${randomBus.speed}km/h | LAT:${lat} LON:${lon} | PASSENGERS:${randomBus.passengers}/${randomBus.capacity} | QoS:1 ACK\n`;
      telemetryLog.innerText += newLog;
      telemetryLog.scrollTop = telemetryLog.scrollHeight;
    }
  }, 2000);
});

# 🚗 Vehicle Movement on a Map

A frontend-only React application that simulates a vehicle moving along a predefined route on a map using Leaflet.js and dummy GPS coordinates. Built as part of a frontend developer intern assignment.

---

## 🌐 Live Demo

🔗 [https://vehicle-movement-map.vercel.app](https://vehicle-movement-map.vercel.app)

---

## 📂 Project Structure

```
vehicle-movement-map/
├── public/
│   └── dummy-route.json        # Static location data
├── src/
│   ├── App.js                  # Main application logic
│   ├── App.css                 # Optional styling
│   ├── car.png                 # Vehicle icon
│   └── index.css               # Leaflet styles
├── package.json
└── README.md
```

---

## 🗺 Features

- 📍 Displays vehicle position on a Leaflet map.
- 🔁 Simulates real-time movement using static JSON route data.
- 🛣️ Draws full and partial route using `Polyline`.
- ▶️ Includes play/pause/reset simulation controls.
- ⏱ Displays current coordinates, timestamp, step, and speed.

---

## 📦 Tech Stack

- **React.js** (via Create React App)
- **Leaflet.js** for mapping
- **HTML5/CSS3** for UI layout

---

## 🧪 Sample Dummy Route

```json
[
  { "latitude": 17.385044, "longitude": 78.486671, "timestamp": "2024-07-20T10:00:00Z" },
  { "latitude": 17.385120, "longitude": 78.487000, "timestamp": "2024-07-20T10:00:05Z" },
  { "latitude": 17.385300, "longitude": 78.487500, "timestamp": "2024-07-20T10:00:10Z" },
  { "latitude": 17.385550, "longitude": 78.488300, "timestamp": "2024-07-20T10:00:15Z" }
]
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/reddyharshavardhan/vehicle-movement-map.git
cd vehicle-movement-map
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm start
```

The app should open at `http://localhost:3000`

---

## 🌍 Deployment

This project is deployed on **Vercel**.  
You can deploy it yourself with:

```bash
npm install -g vercel
vercel
```



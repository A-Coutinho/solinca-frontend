# 🏋️ Solinca Schedule Tracker

A clean, filterable weekly class schedule viewer for Solinca gyms.

This project extracts, normalizes and displays gym class schedules in a structured, developer-friendly way — with smarter filtering and time-based logic (like afterwork detection).

Live version: https://solinca.antoniocoutinho.pt/

---

## ✨ Why This Exists

The official Solinca schedule is difficult to:
- Compare across gyms
- Filter by time range
- Quickly identify afterwork classes
- Visualize weekly availability

This app solves that by:
- Structuring raw schedule data
- Adding custom time-based logic
- Presenting a clean weekly + daily view
- Making filtering instant and intuitive

---

## 🧠 Architecture

Frontend and backend are fully decoupled.

### Backend
- Python
- FastAPI
- Custom scraper
- Schedule normalization logic
- Time-based tagging (afterwork, etc.)
- Self-hosted server

The backend handles:
- Fetching raw class data
- Parsing & structuring schedules
- Adding computed flags
- Returning clean JSON

### Frontend
- React
- Responsive weekly grid (desktop)
- Daily list view (mobile)
- Multi-filter support (day, gym, class type)
- 20H toggle
- Dynamic filtering without reload

---

## 📊 Core Features

- 📅 Weekly timetable layout
- 📱 Mobile-friendly daily list
- 🔎 Multi-filter dropdowns
- 🕒 20H time format toggle
- 🏷 Afterwork logic detection
- 🏢 Multi-gym support
- ⚡ Fast client-side filtering

---

## 🏗 Data Model (Simplified)

Each class entry contains:

```json
{
  "name": "Les Mills Body Combat",
  "gym": "Gaia",
  "day": "Monday",
  "start_time": "06:45",
  "end_time": "07:30",
  "studio": "Estúdio 1",
  "afterwork": false
}
```

The frontend consumes structured data only — no scraping logic exists in the client.

---

## 🎯 Design Goals

- Clean visual hierarchy
- Fast scanning of time blocks
- Minimal visual noise
- Emphasis on time first
- Clear separation between data and presentation

---

## 🚀 Running Locally

### 1️⃣ Clone

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2️⃣ Install

```bash
npm install
```

### 3️⃣ Start

```bash
npm start
```

Make sure the backend API is running and accessible.

---

## 🔮 Future Improvements

- Class type color-coding
- Favorites / bookmarking
- Time-based grouping (Morning / Afterwork / Evening)
- Calendar (.ics) export
- Occupancy prediction
- UI polish iteration

---

## 📌 Status

Backend logic: Stable  
Frontend: Functional, iterative visual refinement ongoing  

---

## ⚠️ Disclaimer

This project is unofficial and not affiliated with Solinca.
It is a personal project built for learning, experimentation, and improving schedule usability.

---

## 👨‍💻 Author

Built and maintained by António Coutinho  
Portfolio: https://antoniocoutinho.pt/

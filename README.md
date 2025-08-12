# Cauldron

**The simplest way to build and export crafting recipes for your game**  
No spreadsheets. No complex setup. Create, organize, and export to JSON or CSV—ready for Unity or Unreal.

---

## Overview

Cauldron is a visual recipe editor for game developers, designed especially for cozy, crafting, and simulation games.  
It provides a straightforward way to manage crafting recipes without manual data entry, enabling you to focus on gameplay and systems.

---

## Features

- **Visual recipe editor** – Drag and drop ingredients, set quantities, and preview instantly.
- **Full CRUD functionality** – Add, edit, and delete recipes with minimal friction.
- **Engine-ready export formats**  
  - **Unity**: JSON export with an included C# loader script.  
  - **Unreal Engine**: CSV export compatible with Data Tables.
- **Customizable ingredient schema** – Define the fields your game’s crafting system requires.
- **User authentication** – Save work online and access from anywhere.
- **Real-time synchronization** – Powered by Firebase.

---

## How It Works

1. Create recipes visually.
2. Organize by category or type.
3. Export in JSON (Unity) or CSV (Unreal) format.
4. Import into your game engine using the provided helpers.

---

## Tech Stack

- **Frontend:** React + TypeScript  
- **Backend & Hosting:** Firebase (Firestore, Authentication)  
- **Build Tool:** Vite  
- **Planned Backend Option:** Node.js + Express

---

## License

This project is licensed for personal and portfolio use.  
For commercial or team use, please request permission.

## Roadmap

**MVP** – Target: November 2025
- [x] Recipe creation (CRUD)
- [x] Export to JSON and CSV
- [ ] Unity loader script
- [ ] Unreal CSV import guide
- [ ] Public release

**Post-MVP Features**
- [ ] Ingredient schema editor
- [ ] Export profiles (Unity/Unreal/Raw)
- [ ] Import recipes into Cauldron
- [ ] Field alias mapping
- [ ] Preset templates
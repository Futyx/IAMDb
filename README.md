# 🎬 IAMDb: Advanced Movie Management & Search System (3-Route SPA)

A sophisticated, fully reactive Single-Page Application (SPA) developed using **Vue 3** and **Vue Router**. This project connects to an external API to retrieve top movie data and utilizes a clear **three-route structure** to separate core functionalities, demonstrating strong command of dynamic routing and state management.

---

## ✨ Features & Technical Focus

This project is engineered to highlight your expertise in complex data handling, application state, and dynamic components:

* **Three-Route Architecture:** Uses **Vue Router** to manage three primary views (`/`, `/movies`, `/movie/:id`), showcasing best practices for application navigation.
* **Advanced Global Search:** Implements a powerful, unified search input that filters the movie list across **multiple attributes simultaneously** (Title, Release Date, Country, Genres, etc.) directly on the `/movies` route.
* **Inline Favorites Management (State Persistence):** Users can mark movies as favorites directly on the list. The status is **persisted** (likely via Local Storage) without needing a dedicated separate page.
* **Dynamic Detail View:** Features dynamic routing (`/movie/:id`) to display complete and detailed information for a single selected film on a dedicated page.
* **Technology:** Vue 3, Vue Router, JavaScript (ES6+), External API Integration.

---

## 🧭 Page Structure

| Page | Route | Primary Function |
| :--- | :--- | :--- |
| **Home/Welcome** | `/` | A simple landing or welcome page (optional, but standard for this route). |
| **Movie List/Search** | **`/movies`** | Displays the full movie list, provides search, and manages inline favorites status. |
| **Movie Details** | `/movie/:id` | Shows complete, detailed information for a selected film. |

---

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Launch%20Movie%20App-4FC08D?style=for-the-badge&logo=vuedotjs)]()

---

## 🛠️ Getting Started

This project is set up with Vite and Vue 3 and requires Node.js and npm to run.

### Prerequisites

* **Node.js** and **npm** (or yarn/pnpm) installed.

### Installation & Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Compile and Run (Development Mode):**
    ```bash
    npm run dev
    ```
3.  **Compile for Production:**
    ```bash
    npm run build
    ```

---.

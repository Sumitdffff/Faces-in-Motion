 # 🖼️ Faces in Motion – Interactive Portrait Gallery

**Faces in Motion** is a modern, interactive portrait gallery built with React. It features a draggable photo wall, an immersive lightbox, personal profile information, image descriptions, and interactive comments.

---

## 🖥️ Project Overview

Faces in Motion provides a cinematic photography browsing experience with a dark-themed interface and modern glassmorphism design.

### ✨ Highlights

- ✔️ Interactive and draggable portrait gallery
- ✔️ Full-screen photo lightbox
- ✔️ Person information and profile details
- ✔️ Image descriptions and photography tags
- ✔️ Follow button and profile statistics
- ✔️ Live comments with likes
- ✔️ Browser-based comment storage
- ✔️ Previous and Next photo navigation
- ✔️ Modern dark UI with gradient accents

---

## 🚀 Features

### 🖼️ Interactive Photo Gallery
- Explore a collection of portrait photographs.
- Drag the photo wall to navigate through the gallery.
- Click any photograph to open it in the lightbox.
- Enjoy a cinematic, dark-themed interface.

### 👤 Person Information Panel
- Display the person's name, role, and age.
- Show a short biography.
- Display follower, photo, and like statistics.
- Interactive Follow button.
- View image descriptions and photography tags.

### 💬 Comments System
- View comments for individual photographs.
- Add new comments instantly.
- Like comments.
- Save comments in browser `localStorage`.
- Synchronize updates between browser tabs.

### 🔍 Interactive Lightbox
- Display the selected photograph in a larger view.
- Navigate between photos using Previous and Next buttons.
- Show person information on the left.
- Display the photograph in the center.
- Show comments and the comment input on the right.
- Automatically update the panels when switching photos.

### 🎨 Modern UI Design
- Dark background and glassmorphism effects.
- Green and blue gradient accents.
- Rounded panels and smooth styling.
- Three-column lightbox layout.
- Responsive design.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | User interface |
| JavaScript (ES6+) | Application logic |
| HTML5 | Website structure |
| CSS3 | Styling and layouts |
| localStorage | Browser-based comment storage |
| Vite | Development server and build tool |

---

## 📂 Project Structure

```text
Faces-in-Motion/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── photoMeta.js
│   │   ├── PhotoInfoPanel.jsx
│   │   ├── CommentsPanel.jsx
│   │   └── photo-details.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: The actual folder structure may differ depending on your project files.*

---

## ⚙️ Installation and Setup

### Prerequisites
- Node.js
- npm
- Visual Studio Code or another code editor

### Steps to Run

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Open the project folder**

```bash
cd Faces-in-Motion
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the local URL** displayed in your terminal to view the website.

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><b>Interactive Portrait Gallery</b></td>
    <td align="center"><b>Photo Details and Comments</b></td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/e3f33f8d-77df-4c4c-8f14-21d48498cc51" width="500" alt="Interactive Portrait Gallery">
    </td>
    <td align="center">
      <img  src="https://github.com/user-attachments/assets/418ecf46-4748-4cca-8514-fe1d6b1593c6"
        width="500" alt="Photo Details and Comments">
    </td>
  </tr>
</table>

---

## 💡 How It Works

1. The gallery displays portraits in an interactive photo wall.
2. Users drag the wall to explore the collection.
3. Clicking a photograph opens the lightbox.
4. The left panel displays the person's information and image description.
5. The center displays the selected photograph with navigation controls.
6. The right panel displays comments and allows users to post new ones.
7. Comments are stored in the browser and can synchronize between tabs.

**Note:** Comments stored in `localStorage` are not shared between different visitors or devices. A backend such as Firebase, Supabase, or a custom API is required for shared comments.

 <img width="959" height="437" alt="Screenshot 2026-10-29 155706" src="https://github.com/user-attachments/assets/f3ccc8ec-8a21-4851-ac8f-65b7c76799cb" />


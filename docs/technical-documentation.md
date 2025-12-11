# Technical Documentation – Assignment 4

## 1. Overview
This document describes the complete architecture and functionality of my personal portfolio web application for **SWE363 – Web Engineering**.  
The project includes features built across Assignment 1, Assignment 2, and Assignment 3, with final polishing, documentation, and deployment in Assignment 4.

The final result is a fully responsive, interactive, API-powered personal portfolio website deployed using **GitHub Pages**.

---

## 2. System Architecture

### Technologies Used
- **HTML5** – structural layout and semantic sections  
- **CSS3** – styling, themes, animations, responsive design  
- **JavaScript (ES6)** – interactivity and API integration  
- **GitHub REST API** – fetching latest public repositories  
- **LocalStorage** – saving UI state (theme, filters, sorting, username)

### Directory Structure
assignment-4/
├── index.html
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── assets/
│ └── images/
├── docs/
│ ├── ai-usage-report.md
│ └── technical-documentation.md
├── presentation/
│ ├── slides.pdf
│ └── demo-video.mp4
└── README.md

---

## 3. HTML Structure

The `index.html` file is divided into clear sections:

### **Header & Navigation**
- Links to `#about`, `#projects`, `#contact`, `#github`
- Includes theme toggle button

### **About Section**
- Profile picture  
- Short introduction  
- Purpose of the portfolio  

### **Projects Section**
- Project cards with:
  - Title  
  - Image preview  
  - Description  
  - Category (`data-category="web"` or `"cpp"`)

- Sorting dropdown (A→Z, Z→A)  
- Filter buttons (Web / C++)  

### **GitHub API Section**
- Dynamic list of repositories fetched from GitHub’s public API  
- Loading message, error message, retry button  

### **Contact Section**
- Simple frontend-only form with a `mailto:` action

### **Footer**
- Minimal copyright footer  
- Dark/light theme support  

---

## 4. CSS Architecture

### Key Concepts Used
- **CSS Grid** for project card layout  
- **Flexbox** for alignment in About section  
- **Animations**
  - Fade-in animation used for project cards  
- **Dark Theme Styling**
  - Controlled by `.dark-theme` class on `<body>`  

### Responsiveness
Media queries ensure the layout adapts to:
- Mobile screens  
- Tablets  
- Large desktop screens  

### Organization
The CSS file is divided into:
1. Global resets & typography  
2. Section-based styling  
3. Buttons & controls  
4. Animations  
5. Dark-theme overrides  

---

## 5. JavaScript Functionality

All interactivity is handled in `script.js`.

### **5.1 Greeting Message**
Detects the user's time and displays:
- Good Morning  
- Good Afternoon  
- Good Evening  

### **5.2 Theme Toggle (Dark / Light)**
- Stores user preference in `localStorage`  
- Automatically loads saved theme  

### **5.3 Project Filter System**
- Buttons filter by category: Web / C++  
- State saved in `localStorage`  
- Fade animation applied on filtering  

### **5.4 Sorting Functionality**
Sorts projects alphabetically by title:
- A → Z  
- Z → A  

Sorting choice is saved and restored using `localStorage`.

### **5.5 GitHub API Integration**
Fetches latest repositories using:

Displays for each repo:
- Name  
- Stars  
- Forks  
- Language  
- Last updated date  
- Description  

#### **Error Handling**
- Invalid username  
- API rate limit or network failure  
- No repositories available  

UI reacts with:
- Loading text  
- Error message  
- Retry button  

### **5.6 LocalStorage Summary**
The app stores:
- `theme`  
- `selectedFilter`  
- `projectSort`  
- `ghUser`  

This ensures the user's preferred settings persist across visits.

---

## 6. Performance Considerations

### Implemented Optimizations
- Compressed images to reduce load time  
- Used `DocumentFragment` to batch DOM insertions  
- Removed unused CSS and JS  
- Limited GitHub API fetch to 6 repositories  
- Lightweight, static architecture (no backend)

---

## 7. Deployment

The project is deployed using **GitHub Pages**:

1. Repo → Settings → Pages  
2. Source: `Deploy from a branch`  
3. Branch: `main`  
4. Folder: `/ (root)`  

The website is live at:

**https://st4rk-71.github.io/assignment-4/**

---

## 8. Conclusion

Assignment 4 finalizes the portfolio by delivering:
- A polished, responsive UI  
- Interactive filtering & sorting  
- API-powered dynamic content  
- State persistence across sessions  
- Professional deployment  
- Complete documentation and presentation materials  

This marks the completed development of a full personal portfolio web application demonstrating frontend skills, organization, and professional quality.


# CheckMate 🍽️

**CheckMate** is a modern web application designed to solve one of the most common problems after dining out with friends: **accurately splitting a restaurant bill**.

Unlike traditional bill splitters that simply divide the total amount equally among participants, CheckMate calculates exactly how much each diner owes based on the items they actually ordered, including shared dishes, drinks, and service charges.

## Live Demo

🚀 https://yeudawitman.github.io/checkmate/

---

## Why I Built This

Almost everyone has experienced the awkward moment when the bill arrives:

- One person ordered only a salad.
- Someone else had three beers and dessert.
- Two friends shared a pizza.
- Another shared only the appetizers.

Most bill-splitting apps either split everything equally or require complicated manual calculations.

CheckMate was built to make this process simple, accurate, and fast.

---

## Features

### 👥 Participant Management

- Add multiple diners
- Edit or remove participants
- Track each person's portion of the bill

### 🍕 Flexible Item Assignment

- Add any menu item
- Set price and quantity
- Assign items to one or more diners
- Support shared dishes automatically

### 🧮 Accurate Cost Calculation

- Individual items are charged fully to the assigned diner
- Shared items are split evenly between selected diners
- Multiple shared groups are supported

### 💰 Tip / Service Charge Support

- Percentage-based tip calculation
- Fixed amount tip support
- Proportional distribution based on consumption

### 📱 Mobile-Friendly Experience

- Responsive design
- Optimized for real-world restaurant usage
- Quick item entry and bill review

---

## Example

| Item | Price | Shared Between |
|--------|--------|----------------|
| Pizza | $24 | David, Maya |
| Beer | $8 | Ron |
| Salad | $15 | David, Maya, Yael |

CheckMate automatically calculates each diner's share and applies any service charge according to the selected settings.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### State Management

- React State / Context API

### Deployment

- GitHub Pages

---

## Project Goals

This project was created as:

- A practical solution to a real-world problem
- A demonstration of modern React development practices
- A showcase of clean UI and state management
- A portfolio project focused on user experience and business logic

---

## Future Enhancements

Planned ideas include:

- Receipt OCR scanning
- Real-time collaboration via QR code
- Export to payment apps
- Bill history
- Multiple currencies
- Saved restaurant sessions
- Offline support (PWA)
- Multiple locales

---

## Running Locally

```bash
git clone https://github.com/yeudawitman/checkmate.git

cd checkmate

npm install

npm run dev
```

---

## Build

```bash
npm run build
```

---

## About the Author

Built by **Yehuda Witman**.

Full Stack Developer with experience building scalable web applications using React, TypeScript, Node.js, and cloud technologies.

GitHub:
https://github.com/yeudawitman

LinkedIn:
https://www.linkedin.com/in/yeuda-witman

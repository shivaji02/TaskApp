# Task Timer App - React Native  
A simple React Native Task Timer App that allows users to:  
✅ Create timers for different tasks.  
✅ Track and organize timers with sorting (Name, Duration, Category).  
✅ View completed timers in a history screen.  
✅ Navigate between Home, Add Timer, and History screens.  
✅ Persist timers in memory during the session.  

---

## 📌 Project Overview
This project was built using React Native with TypeScript, implementing React Context API for state management. The app features real-time countdown timers, sorting, and history tracking.  

I built this project as a learning exercise to improve my skills in React Native development, state management, and UI handling. It is designed to be a lightweight and functional app without relying on third-party state management libraries.  

---

## 📌 Features
🔹 Add Timer – Create a new timer with a name, duration, and category.  
🔹 Track Countdown – Timers countdown in real-time, updating the UI every second.  
🔹 Sorting – Sort timers by Name (A-Z), Duration (asc/desc), and Category.  
🔹 Complete Timers – Move finished timers to history.  
🔹 View History – Track past timers with sorting options.  
🔹 Navigation – Move smoothly between Home, Add Timer, and History screens.  
🔹 State Management – Implemented using React Context API.  

---

## 📌 Tech Stack
- React Native – Core framework for mobile development.  
- TypeScript – Used for type safety and better code maintainability.  
- React Context API – Manages global state for timers and sorting preferences.  
- React Navigation – Handles navigation between screens.  

---

## 📌 Project Structure
```
/TaskTimerApp
│── /src
│   ├── /contexts
│   │   ├── TimerContext.tsx   # Handles global timer state
│   ├── /screens
│   │   ├── HomeScreen.tsx     # Displays active timers & sorting
│   │   ├── AddTimerScreen.tsx # Allows adding new timers
│   │   ├── HistoryScreen.tsx  # Shows completed timers & sorting
│   ├── /types
│   │   ├── timerTypes.ts      # Type definitions for timers
│── App.tsx                     # Main app entry & navigation setup
│── README.md                   # This documentation
```

---

## 📌 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/shivaji02/TaskApp.git
cd TaskApp
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the App
#### For Android
```sh
npx react-native run-android
```
#### For iOS
```sh
npx react-native run-ios
```
*(iOS requires Xcode installed on macOS.)*

---

## 📌 Usage Guide
### 1️⃣ Adding a Timer
1. Click "Add Timer" on the Home Screen.  
2. Enter Name, Duration, and Category.  
3. Click "Create Timer" to save it.  

### 2️⃣ Viewing & Sorting Timers
- Timers update automatically (countdown every second).  
- Click sorting headers to sort by:
    - Name (A-Z)  
    - Duration (asc/desc)  
    - Category  

### 3️⃣ Completing a Timer
- Click "✅ Mark Complete" on a timer to move it to History.

### 4️⃣ Viewing History
- Click "View History" on Home Screen.  
- Sort completed timers by:
    - Name  
    - Category  
    - Completion Time  

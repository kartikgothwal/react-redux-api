# React Redux Table

This project is a React application built using Redux and TypeScript, designed to fetch and manage user data from an external API. It supports basic CRUD operations on a data table.

## Tech Stack

- **React** - Frontend framework
- **Redux Toolkit** - State management
- **Material UI** - UI components
- **Tailwind CSS** - Styling
- **Axios** - API handling
- **Vite** - Development and build tool
- **TypeScript** - Static typing
- **React Toast** - Toast messages

## Features

- Fetch and display user data in a table.
- List columns: `ID`, `Name`, `Email`, `Phone`, `City with Zip Code`.
- Add new records.
- Edit existing records.
- Delete records from the table.

## API Integration

This project integrates the following API:

```plaintext
https://jsonplaceholder.typicode.com/users
```

## Installation 

```
git clone https://github.com/yourusername/react-redux-table.git
cd react-redux-table
npm install
```

## Running the Project
```
npm start
```

## Available Scripts
```
npm start - Start the development server.
npm run build - Build the project.
npm run lint - Run ESLint.
npm run preview - Preview production build.

```

## 🛠️ ESLint Configuration
If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

Configure the top-level parserOptions property like this:
```
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.  
- Optionally add `...tseslint.configs.stylisticTypeChecked`.  
- Install `eslint-plugin-react` and update the ESLint config:

```
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the React version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the React plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})

```
## 📂 Folder Structure  
```plaintext
.
├── node_modules        # Dependencies installed via npm
├── public              # Public assets like SVGs, images, etc.
│   ├── vite.svg        # Vite logo (example asset)
├── src                 # Main source code
│   ├── app             # Redux store configuration
│   │   ├── store.ts    # Main Redux store setup
│   ├── assets          # Static assets like images and icons
│   ├── feature/user    # Redux slice and API calls for user data
│   │   ├── User.tsx    # User component
│   │   ├── userAPI.ts  # API service for user-related requests
│   │   ├── userSlice.ts# Redux slice for managing user state
│   ├── types           # TypeScript type definitions
│   │   ├── index.ts    # Global TypeScript types
│   ├── utils           # Utility functions
│   ├── App.tsx         # Main app component
│   ├── App.css         # Global styles for the app
│   ├── main.tsx        # Entry point of the application
│   ├── vite-env.d.ts   # TypeScript environment variables
├── .gitignore          # Git ignore file
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template for the app
├── package-lock.json   # Dependency lock file
├── package.json        # Project dependencies and scripts
├── README.md           # Documentation file (this file)
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.app.json   # TypeScript configuration for the app
├── tsconfig.json       # Global TypeScript configuration
├── tsconfig.node.json  # TypeScript configuration for Node.js
├── vite.config.ts      # Vite configuration file

```

## 📌 Author
 Developed by Kartik Gotwal for Dreamcast.



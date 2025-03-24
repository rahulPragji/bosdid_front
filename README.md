# BOSDID Frontend

A modern web application for managing DTEF (Department of Tertiary Education Financing) beneficiaries. This application provides a user-friendly interface for administrators to manage and track student beneficiaries of the DTEF program.

## Features

- **Authentication System**
  - Secure login functionality
  - Protected routes
  - Session management

- **Beneficiary Management**
  - View all beneficiaries in a grid layout
  - Search functionality for beneficiaries
  - Detailed beneficiary information display
  - Profile images for easy identification
  - Pagination for better performance

- **Beneficiary Details**
  - Personal information display
  - University details
  - Financial information
  - Eligibility status
  - Interactive modal for detailed view

- **Modern UI/UX**
  - Responsive design
  - Clean and intuitive interface
  - Consistent color scheme
  - Loading states and error handling
  - Smooth transitions and animations

## Tech Stack

- React with TypeScript
- React Router for navigation
- Context API for state management
- CSS Modules for styling
- Modern CSS features (CSS Variables, Flexbox, Grid)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd bosdid_front
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components
├── context/        # React Context providers
├── pages/          # Page components
├── services/       # API services
├── styles/         # Global styles and CSS modules
└── utils/          # Utility functions
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- DTEF for providing the opportunity to work on this project
- All contributors who have helped shape this application

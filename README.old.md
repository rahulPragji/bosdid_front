# Botswana Secure Digital ID (BoSDID) Frontend

A React.js application for DTEF (Department of Tertiary Education Financing) to manage beneficiary loan repayments.

## Features

- User authentication (login/logout)
- Beneficiary management with two main views:
  - Granted Accounts
  - Eligible to Pay
- Detailed beneficiary information modal
- Search and pagination functionality
- Responsive greyscale design

## Tech Stack

- React.js
- React Router v6
- Axios (for API calls)
- CSS3 with Flexbox/Grid
- Jest & React Testing Library

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── context/           # React context providers
├── services/          # API service functions
├── styles/            # Global styles and CSS modules
├── utils/             # Helper functions
└── App.js             # Main application component
```

## API Integration

The application currently uses simulated data. To integrate with the real API:

1. Uncomment the API calls in the respective service files
2. Update the API endpoints in `src/services/api.js`
3. Add proper error handling and loading states

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

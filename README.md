<<<<<<< HEAD
# SpeedBay Project Overview

## Project Structure
This project will be built as a monorepo containing:
- **Backend**: Node.js + TypeScript
- **Frontend**: React + Vite + TypeScript

## Development Process
The project will be built systematically using Cursor Composer prompts:
- Commands will start with slashes (e.g., `/refactor`, `/install`)
- Each command should be executed sequentially
- Prompts will be pasted into Cursor one at a time

## Deployment Target
The project will be prepared for deployment on Railway.

## Build Process
1. Set up monorepo structure
2. Configure backend (Node.js + TypeScript)
3. Configure frontend (React + Vite + TypeScript)
4. Prepare deployment configuration

## Note
This README serves as a reference for the project structure and build process. The actual implementation will be done through a series of Cursor Composer prompts that will be provided separately. 
=======
# SpeedBay - EMS Navigator

## Project Overview
SpeedBay is an EMS navigation system that helps connect emergency services with hospital bay availability.

## Project Structure
```
SpeedBay/
├── client/           # React frontend
│   ├── src/
│   │   ├── pages/   # React components for each page
│   │   └── ...
└── server/          # Express backend
    ├── src/
    └── routes/      # API routes
```

## Current Status
- Basic server setup with Express
- React frontend with Tailwind CSS
- Login page implementation in progress
- Railway deployment configured

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm
- Git

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/IHatePickles32/SpeedBay.git
cd SpeedBay
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Start development servers:
```bash
# Start client (in client directory)
npm run dev

# Start server (in server directory)
npm run dev
```

## Deployment
The project is deployed on Railway with two services:

1. Client Service:
- Build Command: `cd client && npm install && npm run build`
- Start Command: `echo "Static build complete"`

2. Server Service (SpeedBay):
- Build Command: `cd server && npm install && npm run build`
- Start Command: `cd server && node dist/index.js`

## Next Steps
1. Complete login page functionality
2. Implement user authentication
3. Add hospital bay management features
4. Connect frontend to backend APIs

## Contributing
1. Create a new branch for your feature
2. Make your changes
3. Test locally
4. Push to GitHub
5. Railway will automatically deploy your changes

## Tech Stack
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Deployment: Railway
- Version Control: Git/GitHub 
>>>>>>> 8af061e1f551ff1c92401f2bec1a5a59c6bb3f84



# Rule Engine with AST

A application for managing and evaluating dynamic business rules using Abstract Syntax Tree (AST). The system allows creation, combination, and evaluation of complex eligibility rules based on user attributes.

## Architecture & Design Choices

### Tech Stack
- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **API Style**: RESTful

### Why These Technologies?

1. **React.js & Material-UI**
   - Component-based architecture for reusable UI elements
   - Rich ecosystem of libraries
   - Material-UI provides pre-built components for faster development
   - Virtual DOM for efficient rendering

2. **Node.js & Express.js**
   - JavaScript across the full stack reduces context switching
   - Event-driven architecture suitable for handling multiple rule evaluations
   - Express.js provides robust middleware support
   - Excellent package ecosystem via npm

3. **MongoDB**
   - Flexible schema perfect for storing dynamic rule structures
   - JSON-like documents align well with AST storage
   - Scalable for large rule sets
   - Strong query capabilities for rule management

### Core Components

#### AST Data Structure
```javascript
{
  type: String,    // "operator" or "operand"
  left: Node,      // Left child reference
  right: Node,     // Right child reference
  value: Mixed     // Value for operand nodes
}
```

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Installation
- MongoDB Setup

### Installation
1. MongoDB Setup
```bash
# Ubuntu
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verify installation
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```
2. Backend Setup
```bash # Clone the repository
git clone <your-repo-url>
cd rule-engine-ast

# Install backend dependencies
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and other configurations

# Start the server
npm run dev
```
3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### API Endpoints
- POST /api/rules/create Creates a new rule from rule string
  - Returns AST representation


- POST /api/rules/combine
  - Combines multiple rules into single AST
  - Optimizes for efficiency

- POST /api/rules/evaluate
  - Evaluates data against rule set
  - Returns boolean eligibility result

### Dependencies
- Frontend
``` 
{
  "@emotion/react": "^11.13.3",
  "@emotion/styled": "^11.13.0",
  "@mui/material": "^6.1.4",
  "axios": "^1.7.7",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0"
}
```

- Backend
``` {
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "mongoose": "^7.0.3",
  "nodemon": "^2.0.22"
}```

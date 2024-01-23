# QuickFinance Server

## Table Of Content
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variable](#environment-variables)
- [Running Locally](#running-locally)
- [Contributors](#contributors)


## Technologies

- Built with **Mongoose** & **Express**
- Used **MongoDB** as database


## Installation

**Prerequisites:**

- **Node.js:** Ensure you have Node.js (version 14 or higher) installed on your system. If not, download and install it from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

1. Clone the repository:
   ```bash
    git clone https://github.com/its-asif/QuickFinance-server-side.git
   ```
2. Install dependencies:
   ```bash
    npm install
   ```

## Running Locally

1. Start the development server:
   ```bash
    nodemon index.js
   ```
2. Access the application in your browser at `http://localhost:3000/`.


## Environment Variables

1. Create a file named `.env` in the root directory of the project.
2. Replace the following placeholder values with your own database credentials:

```.md
DB_USERNAME=YOUR_MongoDB_USERNAME
DB_PASSWORD=YOUR_MongoDB_PASSWORD
DB_NAME=YOUR_MongoDB_DATABASE_NAME
```

- You can obtain these values from the MongoDB Database access for your MongoDB project.

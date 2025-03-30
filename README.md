
# Product Management

## Overview
The Product Management repository is designed to manage various products and their details. It is a full-stack application built primarily using JavaScript, CSS, and HTML, with JavaScript constituting 98.3% of the codebase.

## Technologies Used
- **JavaScript**: The primary programming language used for both front-end and back-end development.
- **CSS**: For styling the web pages.
- **HTML**: For structuring the web pages.
- **Node.js**: For the back-end server environment.
- **Express.js**: For building the back-end API.

## Project Structure
The project is divided into two main parts: the front-end and the back-end.

### Front-End
- Built using JavaScript, HTML, and CSS.
- Provides a user interface for managing products.

### Back-End
- Built using Node.js and Express.js.
- Handles the logic and data storage for the application.
- Interacts with a database for CRUD operations.

## Core Logic
The core logic of the application revolves around CRUD (Create, Read, Update, Delete) operations for managing products. The back-end handles requests from the front-end, processes the data, and interacts with the database to perform the required operations.

## Routes
The following are the main routes/endpoints in the application:

### Product Routes
- **GET /products**: Retrieves a list of all products.
- **GET /products/:id**: Retrieves details of a specific product by ID.
- **POST /products**: Creates a new product.
- **PUT /products/:id**: Updates an existing product by ID.
- **DELETE /products/:id**: Deletes a product by ID.

### User Routes
- **GET /users**: Retrieves a list of all users.
- **GET /users/:id**: Retrieves details of a specific user by ID.
- **POST /users**: Creates a new user.
- **PUT /users/:id**: Updates an existing user by ID.
- **DELETE /users/:id**: Deletes a user by ID.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/sumitkumar2005/ProductMangement.git
   cd ProductMangement
Install the dependencies:

bash
npm install
Create a .env file in the root directory and add the following environment variables:

bash
CONNECTION_STRING=<your-database-connection-string>
PORT=<your-port-number>
JWT_SECRET=<your-jwt-secret-key>
Start the application:

bash
npm start
The application should now be running on http://localhost:<your-port-number>.

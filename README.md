# Project: Online Beverage Sales Website

## Overview
This project is an online platform for selling beverages, including bubble tea, coffee, and soft drinks. It allows customers to browse the menu, place orders. The platform is built using modern web development technologies.

## Features
- **User Authentication:** Sign up, login, and manage user accounts.
- **Product Browsing:** Browse through a wide range of beverages.
- **Shopping Cart:** Add products to the cart and manage orders.
- **Order Tracking:** Track the status of orders in real-time.
- **Admin Dashboard:** Manage products, orders, and users.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, React.js
- **Backend:** Node.js, Express.js
- **Database:** SQL
- **Authentication:** JWT (JSON Web Tokens)

## Setup and Installation
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nhat27072003/project.git
   cd project
2. **Navigate to the beverage directory:**
   ```bash
   cd beverage
3. **Install dependencies for both frontend and backend:**

   - **Frontend:**
     ```bash
     cd frontend
     npm install
     ```

   - **Backend:**
     ```bash
     cd ../backend
     npm install
     ```

4. **Set up environment variables:**
Create a .env file in the backend directory and add the following:
   ```bash
   DB_CONNECTION_STRING=your_sql_connection_string
   JWT_SECRET=your_jwt_secret
5. **Run the development servers:**
   **Frontend:**
   ```bash
   cd ../frontend
   npm start
   ```
   **Backend:**
   ```bash
   cd ../backend
   npm start
   ```

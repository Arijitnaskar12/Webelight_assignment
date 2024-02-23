# FMGC Commercial App

The FMGC (Fast-Moving Consumer Goods) Commercial App is a RESTful API designed for managing products and customers. It provides endpoints for user registration, authentication, managing products, and fetching customer data.

## Technologies Used

- Express.js
- Mongoose
- Joi
- Dotenv
- Bcrypt
- JSON Web Token (JWT)

## Endpoints

### 1. Register User

- **Endpoint:** `/user/register`
- **Method:** POST
- **Description:** Registers a new user.
- **Request Body:**
  - `username`: Username of the user.
  - `password`: Password of the user.
  - `role`: Role of the user (admin or user).

### 2. Login User

- **Endpoint:** `/user/login`
- **Method:** POST
- **Description:** Logs in a user and generates a JWT token.
- **Request Body:**
  - `username`: Username of the user.
  - `password`: Password of the user.

### 3. Get All Customers

- **Endpoint:** `/user/allcustomers`
- **Method:** GET
- **Description:** Retrieves customers data with pagination.
- **Authorization:** Required (admin token)
- **Query Parameters:**
  - `page`: Page number for pagination.
- **Response:** Returns a list of customers with default limit of 5 items per page.

### 4. Get All Products

- **Endpoint:** `/products/allproducts`
- **Method:** GET
- **Description:** Retrieves all products data with pagination.
- **Query Parameters:**
  - `page`: Page number for pagination.
- **Authorization:** Not required
- **Response:** Returns a list of products with default limit of 5 items per page.

### 5. Add Product

- **Endpoint:** `/products/addProduct`
- **Method:** POST
- **Description:** Adds a new product to the database.
- **Authorization:** Required (admin token)
- **Request Body:**
  - `name`: Name of the product.
  - `category`: Category of the product.
  - `price`: Price of the product.

### 6. Update Product

- **Endpoint:** `/products/updateProduct`
- **Method:** PUT
- **Description:** Updates an existing product in the database.
- **Authorization:** Required (admin token)
- **Request Body:**
  - `_id`: ID of the product to update.
  - `updated`: Object containing updated fields (name, category, price).

### 7. Delete Product

- **Endpoint:** `/products/deleteProduct/:id`
- **Method:** DELETE
- **Description:** Deletes a product from the database.
- **Authorization:** Required (admin token)
- **Parameters:**
  - `id`: ID of the product to delete.

### 8. Filter Products

- **Endpoint:** `/products/filter`
- **Method:** GET
- **Description:** Filters products based on category, price, name, and pagination.
- **Authorization:** Not required
- **Query Parameters:**
  - `category`: Category name to filter products.
  - `minprice`: Minimum price to filter products.
  - `maxprice`: Maximum price to filter products.
  - `name`: Product name to filter products.
  - `page`: Page number for pagination.
- **Response:** Returns a list of filtered products with default limit of 5 items per page.

## Authentication and Authorization

- Users can register and log in using username and password.
- Upon login, a JWT token is generated that expires in 2 hours.
- Admins have access to all endpoints.
- Users have restricted access to certain endpoints.

## Pagination

- Pagination is implemented for endpoints `/user/allcustomers`, `/products/allproducts`, and `/products/filter`.
- Default limit is set to 5 items per page.

## Installation

1. Clone the repository: [FMGC Commercial App](https://github.com/Arijitnaskar12/Webelight_assignment.git)
2. Install Node Modules
3. Run the Server

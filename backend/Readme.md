# Backend API Endpoints Documentation

## API Endpoints

### Authentication
**Base URL:** `/api/auth`

#### Register
- **Endpoint:** `/register`
- **Method:** POST  
- **Description:** Creates a new user.  
- **Body:**  
  - `username`: String (required)  
  - `email`: String (required)  
  - `password`: String (required)  
  - `role`: String (optional – default is 'user')

#### Login
- **Endpoint:** `/login`
- **Method:** POST  
- **Description:** Logs in an existing user.  
- **Body:**  
  - `email`: String (required)  
  - `password`: String (required)

#### Get Profile
- **Endpoint:** `/profile`
- **Method:** GET  
- **Description:** Returns the current logged in user’s profile.  
- **Middleware:** Requires authentication (valid token cookie)

#### Get Current User
- **Endpoint:** `/current`
- **Method:** GET  
- **Description:** Returns the current authenticated user.  
- **Middleware:** Requires authentication

#### Logout
- **Endpoint:** `/logout`
- **Method:** GET  
- **Description:** Logs out the current user.  
- **Middleware:** Requires authentication

### Products
**Base URL:** `/api/products`

#### Get All Products
- **Endpoint:** `/all`
- **Method:** GET  
- **Description:** Retrieves all products.

#### Create Product
- **Endpoint:** `/create`
- **Method:** POST  
- **Description:** Creates a new product.  
- **Middleware:**  
  - Requires authentication  
  - Requires admin privileges  
  - Uses multer middleware for file upload (image)  
- **Body:**  
  - `name`: String (required)  
  - `description`: String (required)  
  - `price`: Number (required)  
  - `stock`: Number (required)  
  - `image`: File (optional)

#### Update Product
- **Endpoint:** `/:id`
- **Method:** PUT  
- **Description:** Updates an existing product.  
- **Middleware:**  
  - Requires authentication  
  - Requires admin privileges  
  - Uses multer middleware for file upload (image)  
- **Parameters:**  
  - `id`: Product Id  
- **Body:** Fields to update (e.g., name, description, price, image, stock)

#### Delete Product
- **Endpoint:** `/:id`
- **Method:** DELETE  
- **Description:** Deletes a product.  
- **Middleware:**  
  - Requires authentication  
  - Requires admin privileges  
- **Parameters:**  
  - `id`: Product Id

### Orders
**Base URL:** `/api/orders`

#### Place Order
- **Endpoint:** `/`
- **Method:** POST  
- **Description:** Places an order with the current user's cart items.  
- **Middleware:** Requires authentication

#### Get User Orders
- **Endpoint:** `/my-orders`
- **Method:** GET  
- **Description:** Retrieves orders for the current user.  
- **Middleware:** Requires authentication

#### Get All Orders
- **Endpoint:** `/all`
- **Method:** GET  
- **Description:** Retrieves all orders.  
- **Middleware:**  
  - Requires authentication  
  - Requires admin privileges

### Cart
**Base URL:** `/api/cart`

#### Get Cart
- **Endpoint:** `/`
- **Method:** GET  
- **Description:** Retrieves the current user's cart.  
- **Middleware:** Requires authentication

#### Add to Cart
- **Endpoint:** `/add`
- **Method:** POST  
- **Description:** Adds a product to the cart.  
- **Middleware:** Requires authentication  
- **Body:**  
  - `productId`: ID of the product

#### Remove from Cart
- **Endpoint:** `/remove/:productId`
- **Method:** DELETE  
- **Description:** Removes a product from the cart.  
- **Middleware:** Requires authentication  
- **Parameters:**  
  - `productId`: ID of the product to remove

#### Clear Cart
- **Endpoint:** `/clear`
- **Method:** DELETE  
- **Description:** Clears all products from the cart.  
- **Middleware:** Requires authentication

## Middleware

- **Authentication Middleware:** `isAuthenticated`  
  Verifies user's JWT token sent via cookies.

- **Admin Middleware:** `isAdmin`  
  Checks if the authenticated user has an admin role.

- **Multer Middleware:** `upload`  
  Handles file uploads for product images.

## Notes

- Uploaded images are stored temporarily and then uploaded to Cloudinary.
- After uploading, local image files are deleted.
- Ensure proper error handling and response statuses while consuming the API.
- The








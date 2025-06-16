# Single Vendor Website - Frontend

[DeployedLink]()

## Features

### Routing & Navigation
- Uses React Router for routing with pages for Home, Login, Signup, Cart, My Orders, and an Admin Dashboard.
- Implements protected routes to ensure that only authenticated users (and admins) can access certain pages.

### Authentication
- Login and Signup pages integrate with backend API endpoints.
- Utilizes a custom hook (`useGetCurrentUser.jsx`) to fetch and update the current logged-in user.
- Redux state management (via `authSlice.js`) is used to store user information and manage the loading state.

### Products Display
- The `ProductGrid.jsx` component fetches all products from the backend API.
- `ProductCard.jsx` displays individual product information and allows users to add items to the cart.

### Shopping Cart
- The `CartPage.jsx` component fetches the user's cart.
- Allows removal of items, clearing the cart, and checkout (placing orders).
- Redux state management (via `cartSlice.js`) is employed to maintain the cart state.

### Admin Dashboard
- The `AdminDashboard.jsx` page allows admin users to create, update, and delete products, as well as view all orders.
- Uses FormData for handling image file uploads and product management.

### State Management
- The Redux store is configured in `store.js` with slices for authentication, cart, and products.

### API Integration
- All API requests use Axios with `withCredentials` enabled to support cookie-based authentication.
- Integrated endpoints include:
  - **Authentication:** `/api/auth`
  - **Products:** `/api/products`
  - **Orders:** `/api/orders`
  - **Cart:** `/api/cart`

## Technologies Used
- **React & Vite**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Tailwind CSS** (for styling)
- **Cloudinary** (backend integration for image uploads)





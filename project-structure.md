# WinMobile E-Commerce Project Structure

This document provides a comprehensive overview of the WinMobile e-commerce application structure, explaining the organization of directories, key files, and the relationships between different components.

## Project Overview

WinMobile is an e-commerce application built with React, TypeScript, and Vite. The application follows a modular architecture with clear separation of concerns between different parts of the application. It includes both user-facing and admin interfaces for managing products, categories, and orders.

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router v6
- **UI Components**: Ant Design
- **Styling**: SCSS and Tailwind CSS
- **Animation**: AOS (Animate On Scroll)
- **HTTP Client**: Axios
- **Payment Processing**: PayPal

## Directory Structure

### Root Structure

```
e-commerce-fe/
├── node_modules/       # Dependencies
├── public/             # Static assets
├── src/                # Source code
└── package.json        # Project configuration
```

### Source Code Structure

```
src/
├── assets/             # Images, fonts, and other static assets
├── components/         # Reusable UI components
│   ├── base/           # Base components (modals, inputs, etc.)
│   ├── icons/          # Icon components
│   ├── layout/         # Layout components (header, footer)
│   └── payment/        # Payment-related components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Core libraries and utilities
│   └── reducer/        # Redux reducers and slices
├── modules/            # Feature modules
│   ├── admin/          # Admin interface components
│   │   ├── auth/       # Admin authentication
│   │   ├── layout/     # Admin layout
│   │   └── menu/       # Admin menu sections
│   │       ├── category-manager/
│   │       ├── dashboard/
│   │       ├── order-manager/
│   │       └── product-manager/
│   └── app/            # User interface components
│       ├── auth/       # User authentication
│       └── home/       # User home and product pages
│           ├── _components/
│           ├── check-out-page/
│           ├── history/
│           ├── landing/
│           ├── product-detail/
│           └── profile/
├── pages/              # Page components
│   ├── payment-error/
│   └── payment-success/
├── plugins/            # Plugin configurations
├── routers/            # Routing configuration
├── services/           # API service classes
├── stylesheet/         # Global styles
│   ├── base/
│   └── taildwind/
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Key Components

### Application Entry Points

- **main.tsx**: The entry point of the application that sets up Redux, routing, and other global configurations.
- **App.tsx**: The root component that renders the router provider.

### Routing

- **routers/index.tsx**: Defines all routes for both user and admin interfaces using React Router's `createBrowserRouter`.

### Layouts

- **components/layout/TheLayout.tsx**: Main layout for user interface with header and footer.
- **modules/admin/layout/TheLayoutAdmin.tsx**: Layout for admin interface with sidebar navigation.
- **modules/app/auth/TheLayoutAuth.tsx**: Layout for authentication pages.

### State Management

- **lib/store.ts**: Redux store configuration with persistence.
- **lib/reducer/**: Contains Redux slices for different parts of the application state:
  - **cartSlice.ts**: Manages shopping cart state.
  - Other slices for authentication, products, etc.

### API Services

The `services/` directory contains service classes that handle API communication:

- **authService.ts**: Authentication-related API calls.
- **productService.ts**: Product-related API calls.
- **categoryService.ts**: Category-related API calls.
- **orderService.ts**: Order-related API calls.
- **cartService.ts**: Shopping cart-related API calls.
- **paymentService.ts**: Payment processing API calls.

### Feature Modules

#### Admin Module

The admin module (`modules/admin/`) contains components for the admin interface:

- **Dashboard**: Analytics and overview.
- **Product Manager**: CRUD operations for products.
- **Category Manager**: CRUD operations for categories.
- **Order Manager**: Order processing and management.

#### App Module

The app module (`modules/app/`) contains components for the user interface:

- **Authentication**: Login and registration.
- **Home**: Landing page and product listings.
- **Product Detail**: Detailed product information.
- **Cart**: Shopping cart management.
- **Checkout**: Order placement and payment.
- **Profile**: User profile management.
- **Order History**: Past order tracking.

### UI Components

The `components/` directory contains reusable UI components:

- **Base Components**: Generic UI elements like modals, inputs, and buttons.
- **Layout Components**: Header, footer, and other layout elements.
- **Payment Components**: Payment-related UI components.

## Data Flow

1. **API Communication**: Service classes in the `services/` directory handle API requests and responses.
2. **State Management**: Redux slices in `lib/reducer/` manage application state.
3. **Component Rendering**: React components consume state from Redux and render the UI.
4. **Routing**: React Router handles navigation between different pages.

## Authentication Flow

1. User enters credentials in the login form.
2. `authService.ts` sends a login request to the backend.
3. On successful authentication, the backend returns a token.
4. The token is stored in Redux state and persisted with Redux Persist.
5. Protected routes check for the token before rendering.

## Payment Flow

1. User adds products to cart.
2. User proceeds to checkout.
3. PayPal payment component handles payment processing.
4. On successful payment, the order is created in the backend.
5. User is redirected to a success page.

## Styling Approach

The application uses a combination of:

- **SCSS**: For global styles and component-specific styling.
- **Tailwind CSS**: For utility-based styling.
- **Ant Design**: For pre-styled UI components.

## Conclusion

The WinMobile e-commerce application follows a well-structured architecture that separates concerns and promotes code reusability. The modular approach makes it easy to maintain and extend the application with new features.

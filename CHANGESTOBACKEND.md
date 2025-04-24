# Tóm tắt các thay đổi trong codebase phía BackendBackend

## Loại bỏ Google Authentication

- Loại bỏ hoàn toàn chức năng đăng nhập bằng Google
- Xóa file `src/controllers/auth/passportController.ts`
- Loại bỏ các route `/auth/google` và `/auth/google/callback` trong `src/routes/authRouter.ts`
- Loại bỏ các thư viện `passport` và `passport-google-oauth2` trong `package.json`
- Loại bỏ các type `@types/passport` và `@types/passport-google-oauth2` trong `package.json`

## Loại bỏ Logger

- Loại bỏ hoàn toàn thư viện `pino` và `pino-http` (logger)
- Thay thế tất cả các lệnh `logger.info`, `logger.error`, `logger.warn` bằng `console.log`, `console.error`, `console.warn`
- Loại bỏ middleware `requestLogger`
- Cập nhật tất cả các file service để không còn sử dụng logger

## Mô hình dữ liệu

### 1. Bảng User

- Loại bỏ trường `favoriteProducts`
- Loại bỏ trường `shippingAddress`
- Loại bỏ các hàm `deleteMany` và `insertMany`

### 2. Bảng Product

- Loại bỏ các trường: `brand`, `variants`, `reviews`, `productModel`, `operatingSystem`
- Giữ lại các trường cơ bản: `name`, `description`, `categories`, `images`, `price`
- Loại bỏ các hàm `deleteMany` và `insertMany`

### 3. Bảng Order

- Loại bỏ các trường: `variantId`, `reviewed`, `trackingNumber`, `note`, `phoneNumber`
- Đơn giản hóa cấu trúc `items` chỉ còn `productId` và `quantity`

### 4. Bảng đã xóa

- Xóa hoàn toàn bảng `Review`

## Enum và Constants

### 1. Order Status

- Loại bỏ enum `EOrderReviewed`
- Giữ lại các enum: `EOrderStatus`, `EPaymentStatus`, `EPaymentMethod`

## Services

### 1. ProductService

- Loại bỏ các phương thức liên quan đến sản phẩm yêu thích: `addToMyFavoriteProduct`, `removeFromMyFavoriteProduct`, `getMyFavoriteProducts`, `checkFavoriteProduct`
- Đơn giản hóa các phương thức tìm kiếm và lọc sản phẩm
- Loại bỏ các tham chiếu đến `reviews` và `variants`

### 2. OrderService

- Loại bỏ hàm `generateTrackingNumber`
- Đơn giản hóa hàm `create` để không còn `note`, `phoneNumber`, `trackingNumber`
- Loại bỏ tham số `trackingNumber` trong hàm `findAllOrderByAdmin`

### 3. Services đã xóa

- Xóa hoàn toàn `ReviewService`

## Controllers

### 1. ProductController

- Loại bỏ các phương thức liên quan đến sản phẩm yêu thích: `addToMyFavoriteProduct`, `removeFromMyFavoriteProduct`, `getMyFavoriteProducts`, `checkFavoriteProduct`
- Giữ lại các phương thức CRUD cơ bản

### 2. Controllers đã xóa

- Xóa hoàn toàn `ReviewController`

## Routes

### 1. ProductRouter

- Loại bỏ các endpoint liên quan đến sản phẩm yêu thích
- Giữ lại các endpoint CRUD cơ bản

### 2. Routes đã xóa

- Xóa hoàn toàn `ReviewRouter`

## Thư viện và Middleware

### 1. Thư viện đã loại bỏ

- Loại bỏ thư viện `pino` và `pino-http` (logger)
- Loại bỏ thư viện `@faker-js/faker`, `faker` và `faker-js`
- Loại bỏ thư viện `@google/generative-ai`

### 2. Middleware đã loại bỏ

- Loại bỏ middleware `requestLogger`

## Seeders

### 1. Seeders đã cập nhật

- Đơn giản hóa `user_seeders.ts` để không còn sử dụng faker
- Đơn giản hóa `category_seeders.ts` để không còn sử dụng faker
- Đơn giản hóa `product_seeder.ts` để không còn sử dụng faker

### 2. Seeders đã xóa

- Xóa hoàn toàn `review_seeder.ts`

## Các thay đổi khác

### 1. Package.json

- Loại bỏ các thư viện không cần thiết
- Cập nhật script `start` để không còn sử dụng `pino-pretty`

### 2. Server.ts

- Loại bỏ import và sử dụng logger
- Loại bỏ middleware `requestLogger`

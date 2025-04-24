# Tài liệu ứng dụng WinMobile E-Commerce

## Tổng quan
WinMobile là ứng dụng thương mại điện tử đầy đủ tính năng dành cho thiết bị di động và phụ kiện. Ứng dụng được xây dựng bằng React, TypeScript và Vite, với giao diện người dùng hiện đại sử dụng Ant Design và Tailwind CSS.

## Các tính năng chính

### Tính năng người dùng

#### Xác thực
- **Đăng ký người dùng**: Người dùng mới có thể tạo tài khoản với email, mật khẩu và tên
- **Đăng nhập người dùng**: Người dùng hiện có có thể đăng nhập bằng thông tin đăng nhập của họ
- **Đăng nhập quản trị viên**: Đăng nhập riêng cho quản trị viên với các quyền đặc biệt

#### Duyệt sản phẩm
- **Trang chủ**: Hiển thị các sản phẩm và danh mục nổi bật
- **Danh sách sản phẩm**: Xem tất cả sản phẩm với các tùy chọn lọc và sắp xếp
- **Tìm kiếm sản phẩm**: Tìm kiếm sản phẩm theo tên hoặc mô tả
- **Danh mục sản phẩm**: Duyệt sản phẩm theo danh mục
- **Chi tiết sản phẩm**: Xem thông tin chi tiết về sản phẩm, bao gồm hình ảnh, mô tả, giá và biến thể

#### Giỏ hàng
- **Thêm vào giỏ hàng**: Thêm sản phẩm vào giỏ hàng
- **Cập nhật giỏ hàng**: Sửa đổi số lượng hoặc xóa các mục khỏi giỏ hàng
- **Tóm tắt giỏ hàng**: Xem tổng giỏ hàng và chi tiết mục

#### Quy trình thanh toán
- **Thông tin vận chuyển**: Nhập địa chỉ giao hàng và thông tin liên hệ
- **Phương thức thanh toán**: Chọn giữa các tùy chọn thanh toán khác nhau
- **Xác nhận đơn hàng**: Xem lại và xác nhận chi tiết đơn hàng
- **Theo dõi đơn hàng**: Theo dõi trạng thái đơn hàng sau khi mua

#### Hồ sơ người dùng
- **Quản lý hồ sơ**: Xem và cập nhật thông tin cá nhân
- **Lịch sử đơn hàng**: Xem các đơn hàng trước đây và trạng thái của chúng
- **Yêu thích**: Lưu và quản lý các sản phẩm yêu thích

### Tính năng quản trị

#### Bảng điều khiển
- **Tổng quan bán hàng**: Xem thống kê và số liệu bán hàng
- **Đơn hàng gần đây**: Theo dõi hoạt động đơn hàng gần đây
- **Hiệu suất sản phẩm**: Theo dõi hiệu suất sản phẩm và hàng tồn kho

#### Quản lý sản phẩm
- **Danh sách sản phẩm**: Xem tất cả sản phẩm với tìm kiếm và phân trang
- **Thêm sản phẩm**: Tạo sản phẩm mới với chi tiết, hình ảnh và biến thể
- **Chỉnh sửa sản phẩm**: Cập nhật thông tin sản phẩm hiện có
- **Xóa sản phẩm**: Xóa sản phẩm khỏi danh mục

#### Quản lý danh mục
- **Danh sách danh mục**: Xem tất cả danh mục sản phẩm
- **Thêm danh mục**: Tạo danh mục mới với tên và mô tả
- **Chỉnh sửa danh mục**: Cập nhật thông tin danh mục hiện có
- **Xóa danh mục**: Xóa danh mục khỏi hệ thống

#### Quản lý đơn hàng
- **Danh sách đơn hàng**: Xem tất cả đơn hàng với các tùy chọn lọc
- **Chi tiết đơn hàng**: Xem thông tin chi tiết về từng đơn hàng
- **Trạng thái đơn hàng**: Cập nhật trạng thái đơn hàng (đang xử lý, đã giao hàng, v.v.)
- **Trạng thái thanh toán**: Theo dõi trạng thái thanh toán cho từng đơn hàng

## Kiến trúc kỹ thuật

### Công nghệ Frontend
- **React**: Thư viện UI để xây dựng giao diện người dùng
- **TypeScript**: JavaScript an toàn kiểu để có trải nghiệm phát triển tốt hơn
- **Vite**: Công cụ xây dựng nhanh và máy chủ phát triển
- **Redux Toolkit**: Quản lý trạng thái cho ứng dụng
- **React Router**: Xử lý điều hướng và định tuyến
- **Ant Design**: Thư viện component UI
- **Tailwind CSS**: Framework CSS tiện ích
- **Axios**: HTTP client cho các yêu cầu API
- **Redux Persist**: Lưu trữ và khôi phục Redux store

### Các thành phần chính
- **Layout Components**: Header, Footer và cấu trúc layout chính
- **Authentication Components**: Form đăng nhập và đăng ký
- **Product Components**: Card sản phẩm, danh sách và xem chi tiết
- **Cart Components**: Giỏ hàng và quy trình thanh toán
- **Admin Components**: Bảng điều khiển, quản lý sản phẩm và quản lý đơn hàng

### Quản lý trạng thái
- **User State**: Quản lý xác thực người dùng và thông tin hồ sơ
- **Cart State**: Quản lý các mục giỏ hàng và tổng
- **UI State**: Quản lý các trạng thái liên quan đến UI như chỉ báo tải và modals

### Tích hợp API
- Tích hợp API RESTful cho tất cả các hoạt động dữ liệu
- Xác thực dựa trên token cho các yêu cầu API an toàn
- Tải lên và quản lý hình ảnh cho hình ảnh sản phẩm

## Triển khai
Ứng dụng được xây dựng bằng Vite và có thể được triển khai đến bất kỳ dịch vụ lưu trữ tĩnh nào.

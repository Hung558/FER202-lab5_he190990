# FER202 - Lab 5 & 6

> **Môn học:** FER202 - Front-End Web Development with React  
> **Mã sinh viên:** HE190990  
> **Dự án:** Ứng dụng Web React (Lab 5 & 6 / Practical Exam)

---

## 📌 Giới thiệu (Overview)

Dự án này là bài thực hành Lab 5 & 6 của môn học **FER202** (FPT University), được xây dựng trên nền tảng **React 18** và **Create React App**. Ứng dụng tích hợp điều hướng (routing), gọi API, giao diện responsive với Bootstrap/React-Bootstrap, cùng với mock server (JSON Server).

---

## 🛠 Công nghệ sử dụng (Tech Stack)

- **Framework / Thư viện chính:** [React 18](https://react.dev/)
- **Điều hướng (Routing):** [React Router DOM v6](https://reactrouter.com/) (`^6.13.0`)
- **Giao diện & UI Component:**
  - [Bootstrap 5](https://getbootstrap.com/) (`^5.3.3`)
  - [React-Bootstrap](https://react-bootstrap.github.io/) (`^2.10.2`)
- **HTTP Client:** [Axios](https://axios-http.com/) (`^1.6.7`)
- **Mock REST API:** [JSON Server](https://github.com/typicode/json-server) (`^1.0.0-beta.15`)
- **Testing:** React Testing Library & Jest DOM

---

## 📁 Cấu trúc thư mục (Project Structure)

```text
lab56_he190990/
├── public/                # Static assets & file index.html chính
│   ├── favicon.ico
│   ├── index.html         # Template HTML gốc
│   ├── manifest.json
│   └── robots.txt
├── src/                   # Mã nguồn React
│   ├── App.js             # Root component
│   └── index.js           # Điểm khởi chạy của ứng dụng (ReactDOM root)
├── .gitignore             # Khai báo các file/thư mục bỏ qua khi commit Git
├── package.json           # Danh sách dependencies & scripts
├── package-lock.json      # Khóa phiên bản dependencies
└── README.md              # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy (Getting Started)

### Yêu cầu tiên quyết (Prerequisites)
- [Node.js](https://nodejs.org/) (phiên bản khuyến nghị: v16.x, v18.x hoặc mới hơn)
- Quản lý gói: `npm` (đi kèm Node.js) hoặc `yarn` / `pnpm`

### 1. Cài đặt các thư viện (Dependencies)
Mở terminal tại thư mục gốc của dự án (`lab56_he190990`) và chạy:

```bash
npm install
```

### 2. Khởi chạy Mock API Server (nếu sử dụng json-server)
Nếu bài lab yêu cầu backend giả lập để lưu/đọc dữ liệu (ví dụ file `db.json`):

```bash
npx json-server --watch db.json --port 9999
```
*(Bạn có thể thay đổi cổng hoặc tên file dữ liệu theo yêu cầu đề bài, ví dụ `--port 5000` hoặc `--port 9999`).*

### 3. Khởi chạy ứng dụng React
Chạy lệnh sau để khởi động development server:

```bash
npm start
```
Ứng dụng sẽ tự động mở tại trình duyệt theo địa chỉ: [http://localhost:3000](http://localhost:3000).

---

## 📜 Các Scripts có sẵn (Available Scripts)

Trong thư mục dự án, bạn có thể thực thi các lệnh:

- **`npm start`**: Chạy ứng dụng ở môi trường phát triển (Development Mode). Trang sẽ tự động reload khi có chỉnh sửa code.
- **`npm run build`**: Đóng gói và tối ưu ứng dụng cho môi trường Production vào thư mục `build/`.
- **`npm test`**: Khởi chạy test runner ở chế độ tương tác (watch mode).
- **`npm run eject`**: *(Lưu ý: Thao tác một chiều)* Tách cấu hình webpack và scripts ra ngoài.

---

## 📝 Ghi chú phát triển (Notes)

- Khi sử dụng Bootstrap trong dự án, đảm bảo import stylesheet tại `src/index.js` hoặc `src/App.js` nếu chưa có:
  ```javascript
  import 'bootstrap/dist/css/bootstrap.min.css';
  ```
- File `.gitignore` đã được cấu hình để tự động bỏ qua `node_modules`, thư mục `build/`, các file môi trường `.env` và cấu hình IDE để giữ repository gọn gàng.


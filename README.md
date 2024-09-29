# Human Resource Management system

[![CI](https://github.com/CircuitVerse/mobile-app/actions/workflows/ci.yml/badge.svg)](https://github.com/CircuitVerse/mobile-app/actions/workflows/ci.yml)
[![CD](https://github.com/CircuitVerse/mobile-app/actions/workflows/cd.yml/badge.svg)](https://github.com/CircuitVerse/mobile-app/actions/workflows/cd.yml)

Tôi đang sử dụng Next.js 14 và Nodejs express và dùng mongooes để xây dựng một trang web quản lý nguồn nhân lực. Trang web của tôi được thiết kế nhằm tối ưu hóa quy trình quản lý nhân sự, bao gồm việc theo dõi thông tin nhân viên, xử lý yêu cầu nghỉ phép và quản lý bảng lương. Với giao diện thân thiện và dễ sử dụng, hệ thống của tôi giúp cải thiện hiệu quả trong công tác quản lý và nâng cao trải nghiệm cho người dùng.

## Sau đây là các bước để chạy website sẽ gồm 2 phần lần lượt là FE và BE:
### Đây là hướng dẫn run project ở FE:
Bước: 1
 - Bạn phải tải source code  từ github của tôi về.
Bước: 2
 - Sau đó bạn phải cài môi trường nodejs bản 20.4.0
Bước: 3
 - Tiếp tục bạn  hãy mở source code bằng Visual Studio Code và bận Terminal lên
Bước: 4
 - Bạn dùng câu lệnh là npm install để cài các package của project
Bước: 5
 - Bạn hãy kiểm tra  file .env xem có biến môi trường như này chưa NEXT_PUBLIC_API_BE_HR="https://nguyentuananh-be-human-resource-manager.onrender.com"
Bước: 6
 - Biến môi trường này là để gọi API từ backend. ở đây thì tôi đã setup và deploy rồi nên nếu bạn chạy localhost thì bạn hãy  đổi thành http://localhost:8080
Bước: 7
  - Bạn dùng câu lệnh là npm run dev để run project thì nó sẽ ở cổng http://localhost:3000/ bạn hãy truy cập vào cổng này.

### Đây là hướng dẫn run project ở BE:
Bước: 1
 - Bạn phải tải source code  từ github BE của tôi về [tại đây](https://www.figma.com/design/DaUHqGmrJTtzrQZ4NkVMRo/Adnroid-NC_App_%C4%90i%E1%BB%87n-Tho%E1%BA%A1i?node-id=0-1&t=FwSXPviwQM8RXsnq-1).
Bước: 2
 - Sau đó bạn phải cài môi trường nodejs bản 20.4.0 nếu đã cài rồi thì thôi 
Bước: 3
 - Tiếp tục bạn  hãy mở source code bằng Visual Studio Code và bận Terminal lên
Bước: 4
 - Bạn dùng câu lệnh là npm install để cài các package của project
Bước: 5
 - Bạn hãy kiểm tra  file .env xem có biến môi trường chưa nếu chưa hãy mở file .env example  và tạo file .env trong cây thư mục src nhá
Bước: 7
  - Bạn dùng câu lệnh là npm run dev để run project  thì lúc này các API đã hoạt động để FE sử dụng rùi nha.
### Lưu ý:
- Bạn phải chạy 2 project FE  và BE riêng nha không thì không lên website được đâu

### Các chức năng chính
Admin
- Đăng nhập.
- Thống kê số lượng tài khoản,nhân viên,phòng ban, vị trí ,yêu cầu nghỉ phép, trạng thái nghỉ đang được chờ, tiền lương, tiền thưởng
- Quản lý tài khoản(Thêm,sửa,xóa) và hiển thị danh sách tài khoản.
- Quản lý nhân viên(Thêm,sửa,xóa) và hiển thị danh sách nhân viên và xem thông tin chi tiết nhân viên.
- Quản lý phòng ban(Thêm,sửa,xóa) và hiển thị danh sách phòng ban.
- Quản lý vị trí(Thêm,sửa,xóa) và hiển thị danh sách vị trí.
- Quản lý yêu cầu nghỉ phép(Thêm,sửa,xóa) và hiển thị danh sách yêu cầu nghỉ phép.
- Quản lý bảng lương(Thêm,sửa,xóa) và hiển thị danh sách bảng lương.
- Quản lý điểm danh (Thêm,sửa,xóa) và hiển thị danh sách điểm danh.
==> sẽ bổ sung và nâng cấp thêm các tính năng sớm nhất.
User
- Đăng nhập bằng tài khoản admin cấp
- xem chi tiết thông tin trạng thái của mình
- Gửi và sửa yêu cầu nghỉ phép.
==> sẽ bổ sung và nâng cấp thêm các tính năng sớm nhất.
## Hình ảnh 
<p>
  
<img src="https://res.cloudinary.com/ddaxowlyn/image/upload/v1727619246/hr_manager/15_fsjnv0.png" alt="Splash View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/dangnhap.jpg?raw=true" alt="Home View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/dangky.jpg?raw=true" alt="NavDrawer View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/quenmatkhau.jpg?raw=true" alt="NavDrawer View Login" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangchu.jpg?raw=true" alt="Teachers View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangdanhsachsanpham.jpg?raw=true" alt="About View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/chitietsanpham.jpg?raw=true" alt="Contribute View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/thongsosanpham.jpg?raw=true" alt="Groups View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/timkiemsanpham.jpg?raw=true" alt="Assignment Details View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/tranggiohang.jpg?raw=true" alt="Assignment Date View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangthanhtoan.jpg?raw=true" alt="Assignment Time View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangdathang.jpg?raw=true" alt="Login View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangcanhan.jpg?raw=true" alt="Register View" width="200">
<img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangthongtincanhan.jpg?raw=true" alt="Profile View" width="200">
 <img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangyeuthichs.jpg?raw=true" alt="Profile View" width="200">
 <img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangdiachi.jpg?raw=true" alt="Profile View" width="200">
  <img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/trangdoimatkhau.jpg?raw=true" alt="Profile View" width="200">
   <img src="https://github.com/Tanh2003/host-file-anh/blob/main/Images_TechPhone/tranglichsudonhang.jpg?raw=true" alt="Profile View" width="200">
 
</p>

## The End

The project is implemented by Nguyen Tuan Anh.

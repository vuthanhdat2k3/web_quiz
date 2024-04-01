document.getElementById("logout").addEventListener('click', function(e){
  e.preventDefault(); // Thay vì event.defaultPrevented(), sử dụng e.preventDefault()
  localStorage.setItem("static", "false"); // Thay false thành "false" để lưu giá trị dưới dạng chuỗi
  window.location.href = "../../assets/features/dang-nhap.html"; // Chuyển hướng đến trang đăng nhập
  localStorage.removeItem('userId'); // Xóa session userId khi  đăng xuất
});

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = form.querySelector("input[name='username']").value;
    const password = form.querySelector("input[name='password']").value;
    const admin = {
      username: "admin",
      password: "123",
    };

    // Kiểm tra username và password
    // Hiển thị thông báo lỗi nếu không hợp lệ

    if (username === "" || password === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    else if(username !== admin.username || password !== admin.password){
      alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
    }
    else{
      window.location.href= "../../assets/features/dashboard-admin.html";
    }
});

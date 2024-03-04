// Kiểm tra tính hợp lệ của thông tin đăng ký

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = form.querySelector("input[name='username']").value;
    const email = form.querySelector("input[name='email']").value;
    const password = form.querySelector("input[name='password']").value;
    const confirmPassword = form.querySelector("input[name='confirm_password']").value;

    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    else if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }
    else {
      // Get existing users from localStorage
      var users = JSON.parse(localStorage.getItem("users")) || [];

      var existingUser = users.find(function(user) {
        return user.username === username;
      });

      if (!existingUser) {
        var user = {
          username: username,
          email: email,
          password: password,
        };
        // Add the new user to the existing exams
        users.push(user);

        // Save all users back to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert('Đăng ký thành công!');
        window.location.href="dang-nhap.html";
        // Clear form fields
      } else {
        alert('Username đã tồn tại!');
      }
    }
});
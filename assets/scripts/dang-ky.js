// // Kiểm tra tính hợp lệ của thông tin đăng ký

// const form = document.querySelector("form");

// form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const username = form.querySelector("input[name='username']").value;
//     const email = form.querySelector("input[name='email']").value;
//     const password = form.querySelector("input[name='password']").value;
//     const confirmPassword = form.querySelector("input[name='confirm_password']").value;

//     if (username === "" || email === "" || password === "" || confirmPassword === "") {
//         alert("Vui lòng nhập đầy đủ thông tin!");
//         return;
//     }

//     else if (password !== confirmPassword) {
//         alert("Mật khẩu xác nhận không khớp!");
//         return;
//     }
//     else {
//       // Get existing users from localStorage
//       var users = JSON.parse(localStorage.getItem("users")) || [];

//       var existingUser = users.find(function(user) {
//         return user.username === username;
//       });

//       if (!existingUser) {
//         var user = {
//           username: username,
//           email: email,
//           password: password,
//         };
//         // Add the new user to the existing exams
//         users.push(user);

//         // Save all users back to localStorage
//         localStorage.setItem("users", JSON.stringify(users));

//         alert('Đăng ký thành công!');
//         window.location.href="dang-nhap.html";
//         // Clear form fields
//       } else {
//         alert('Username đã tồn tại!');
//       }
//     }
// });

// document.getElementById("registrationForm").addEventListener("submit", function(event) {
//   event.preventDefault(); // Ngăn chặn gửi form mặc định

//   // Lấy giá trị từ các input
//   var username = form.querySelector("input[name='username']").value;
//   var email = form.querySelector("input[name='email']").value;
//   var password = form.querySelector("input[name='password']").value;
//   var role = "user"; // Đây là giá trị cố định cho vai trò

//   // Tạo object chứa dữ liệu
//   var data = {
//       "username": username,
//       "email": email,
//       "password": password
//   };
// console.log(data);

//   // Gửi request POST đến máy chủ
//   fetch("http://localhost:8080/api/auth/signup", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json" // Đặt header Content-Type là JSON
//       },
//       body: JSON.stringify(data) // Chuyển đổi object thành JSON string trước khi gửi
//   })
//   .then(response => response.json()) // Chuyển đổi response thành JSON
//   .then(data => {
//       console.log(data); // Xử lý dữ liệu phản hồi từ máy chủ nếu cần
//       window.location.href="dang-nhap.html";
//   })
//   .catch(error => {
//       console.error('Error:', error); // Xử lý lỗi nếu có
//   });
// });

const form = document.getElementById("registrationForm");
const usernameInput = form.querySelector("input[name='username']");
const usernameError = document.getElementById("username-error");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = form.querySelector("input[name='username']").value;
    const email = form.querySelector("input[name='email']").value;
    const password = form.querySelector("input[name='password']").value;

    try {
        const response = await fetch('http://localhost:3000/N18/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, email: email, password: password , role: "user"})
        });

        if (response.ok) {
            // Đăng ký thành công
            console.log('Đăng ký thành công');

            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);

            // Chuyển hướng đến trang đăng nhập
            window.location.href="dang-nhap.html";
        }else if(response.status === 409){
            console.error('Username đã tồn tại');
            usernameError.style.display = "block";
        } 
        else {
            // Đăng ký thất bại
            console.error('Đăng ký thất bại:', response.statusText);
            // Xử lý lỗi, hiển thị thông báo cho người dùng, vv.
        }
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        // Xử lý lỗi, hiển thị thông báo cho người dùng, vv.
    }
});

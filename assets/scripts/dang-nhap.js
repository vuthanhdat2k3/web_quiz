// // Kiểm tra tính hợp lệ của thông tin đăng nhập

// const form = document.querySelector("form");

// form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const username = form.querySelector("input[name='username']").value;
//     const password = form.querySelector("input[name='password']").value;
//     const users = JSON.parse(localStorage.getItem("users"));
//     var user = null;
//     for(var i = 0 ; i < users.length ; i++){
//       if(users[i].username == username){
//         user = users[i];
//         break;
//       }
//     }

//     if (username === "" || password === "") {
//         alert("Vui lòng nhập đầy đủ thông tin!");
//         return;
//     }
//     else if(user === null){
//       alert("Tài khoản không tồn tại!");
//     }
//     else if(password !== user.password){
//       alert("Mật khẩu không chính xác!");
//     }
//     else{
//       localStorage.setItem('currentUsername', username);
//       window.location.href= "../../assets/features/trang-user.html";
//     }
// });

const form = document.querySelector("form");
const passwordError = document.getElementById("password-error");


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = form.querySelector("input[name='username']").value;
    const password = form.querySelector("input[name='password']").value;
    

    try {
        const response = await fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        });

        if (response.ok) {
            // Login successful
            const responseData = await response.json();
            console.log(responseData); // Handle the response data as needed
            // Redirect the user to the next page or perform other actions
            localStorage.setItem('static',"true");
            localStorage.setItem('userId', responseData.userId);
            window.location.href="../../assets/features/trang-user.html";
        } else {
            // Login failed
            console.error('Login failed:', response.statusText);
            passwordError.style.display = 'block';
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Handle the error, display a message to the user, etc.
    }
});


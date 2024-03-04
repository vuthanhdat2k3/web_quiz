function searchFeature() {
  event.preventDefault();
  var input = document.getElementById('searchInput').value.toUpperCase().trim();
  var ul = document.getElementById('list-exam');
  var a = ul.getElementsByTagName('a');
  console.log(input);
  for (var i = 0; i < a.length; i++) {
      
      var txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(input) > -1) {
          a[i].style.display = "";
      } else {
          a[i].style.display = "none";
      }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  var avatar = document.getElementById("avatar");
  var dropdownContent = document.getElementById("dropdownContent");

  // Hiển thị hoặc ẩn các dòng chữ khi click vào avatar
  avatar.addEventListener("click", function() {
      dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".category__option-item").forEach(function(link) {
      link.addEventListener("click", function(e) {
          e.preventDefault();
          var targetId = this.getAttribute("href").substring(1);

          // Ẩn tất cả các phần tử section
          document.querySelectorAll(".content").forEach(function(section) {
              section.style.display = "none";
          });

          // Hiển thị phần tử mà người dùng đã chọn
          if(targetId == "thong-ke") window.location.href = "trang-thong-ke.html";
          else if(targetId == "ket-qua") window.location.href = "trang-ket-qua-admin.html";
          else document.getElementById(targetId).style.display = "block";
      });
    });
});


document.addEventListener("DOMContentLoaded", function() {
  // Simulated data for exams and users

  var exams = JSON.parse(localStorage.getItem('exams')) || [];
  

  // Display exams
  function displayExams() {
    var examList = document.getElementById("danh-sach-ky-thi");
    examList.innerHTML = "";
    exams.forEach(function(exam) {
      var listItemInfo = document.createElement("div");
      listItemInfo.classList.add("content__item-info")
      var listItemButton = document.createElement("div");
      listItemButton.classList.add("content__item-button")
      var listItem = document.createElement("li");
      listItem.classList.add("content__item");
      var a = document.createElement('a');
      a.classList.add("content__item-heading");
      a.textContent = exam.tenKyThi;
      a.setAttribute("value", exam.tenKyThi);
      listItemInfo.appendChild(a);
      var p1 = document.createElement('p');
      p1.textContent = "Thời Gian: " + exam.thoiGian + " phút.";
      listItemInfo.appendChild(p1);
      var p2 = document.createElement('p');
      p2.textContent = "Loại: " + exam.loaiKyThi;
      listItemInfo.appendChild(p2);
      listItem.appendChild(listItemInfo);
      var iconButton1 = document.createElement('button');
      var iconButton2 = document.createElement('button');
      iconButton1.classList.add("content__icon-btn");
      iconButton2.classList.add("content__icon-btn");
      var iconEdit = document.createElement('i');
      iconEdit.classList.add('fas','fa-edit');
      iconEdit.classList.add('chinh-sua-ky-thi');
      iconButton1.appendChild(iconEdit);
      var iconDelete = document.createElement('i');
      iconDelete.classList.add('fas','fa-trash');
      iconDelete.classList.add('xoa-ky-thi');
      iconButton2.appendChild(iconDelete);
      listItemButton.appendChild(iconButton1);
      listItemButton.appendChild(iconButton2);
      listItem.appendChild(listItemButton);
      examList.appendChild(listItem);

      // Add click event listener to highlight selected exam
      listItem.addEventListener("click", function() {
        // Remove the "selected" class from all exam items
        examList.querySelectorAll("li").forEach(function(item) {
            item.classList.remove("selected");
        });

        // Highlight the selected exam
        this.classList.add("selected");
      });
    });
  }
  // Event delegation for edit exams
  document.getElementById("danh-sach-ky-thi").addEventListener("click", function(e) {
    var exams = JSON.parse(localStorage.getItem('exams')) || [];
    console.log(e.target);
    if (e.target && e.target.matches("i.chinh-sua-ky-thi")) {
      var listItem = e.target.parentElement.parentElement.parentElement;
      console.log(listItem);
      var tenKyThi = listItem.querySelector(".content__item-heading").getAttribute("value");
      console.log(tenKyThi);
      // Lấy thông tin của exam từ localStorage
      var examToEdit = exams.find(function(exam) {
          return exam.tenKyThi === tenKyThi;
      });

      localStorage.setItem('examToEdit', JSON.stringify(examToEdit));
      window.location.href = "chinh-sua-ky-thi.html";
    }
  });

  // Event delegation for deleting exams
  document.getElementById("danh-sach-ky-thi").addEventListener("click", function(e) {
      if (e.target && e.target.matches("i.xoa-ky-thi")) {
          var listItem = e.target.parentElement.parentElement.parentElement;
          var tenKyThi = listItem.querySelector(".content__item-heading").getAttribute("value");
          if (confirm("Bạn có chắc chắn muốn xóa kỳ thi này không?")) {
              exams = exams.filter(function(exam) {
                  return exam.tenKyThi !== tenKyThi;
              });
              localStorage.setItem('exams', JSON.stringify(exams));
              displayExams();
          }
      }
  });
  
  // Function to display users
  function displayUsers() {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var userList = document.getElementById("danh-sach-nguoi-dung");
    userList.innerHTML = "";
    users.forEach(function(user) {
      

        var listItemInfo = document.createElement("div");
      listItemInfo.classList.add("content__item-info")
      var listItemButton = document.createElement("div");
      listItemButton.classList.add("content__item-button")
      var listItem = document.createElement("li");
      listItem.classList.add("content__item");
      var a = document.createElement('a');
      a.classList.add("content__item-heading");
      a.textContent = user.username;
      a.setAttribute("value", user.username);
      listItemInfo.appendChild(a);
      listItem.appendChild(listItemInfo);
      var iconButton1 = document.createElement('button');
      var iconButton2 = document.createElement('button');
      iconButton1.classList.add("content__icon-btn");
      iconButton2.classList.add("content__icon-btn");
      var iconEdit = document.createElement('i');
      iconEdit.classList.add('fas','fa-edit');
      iconEdit.classList.add('chinh-sua-nguoi-dung');
      iconButton1.appendChild(iconEdit);
      var iconDelete = document.createElement('i');
      iconDelete.classList.add('fas','fa-trash');
      iconDelete.classList.add('xoa-nguoi-dung');
      iconButton2.appendChild(iconDelete);
      listItemButton.appendChild(iconButton1);
      listItemButton.appendChild(iconButton2);
      listItem.appendChild(listItemButton);
      userList.appendChild(listItem);
    });
  }
    // Event delegation for editing users
    document.getElementById("danh-sach-nguoi-dung").addEventListener("click", function(e) {
      var users = JSON.parse(localStorage.getItem('users')) || [];
      if (e.target && e.target.matches("i.chinh-sua-nguoi-dung")) {
        // Hiển thị form edit-user-form
        document.getElementById("edit-user-form").style.display = "block";
        modal.style.display = "flex";
        // Lấy username của người dùng từ phần tử đã click
        var listItem = e.target.parentElement.parentElement.parentElement;
        var username = listItem.querySelector("a").getAttribute("value");

        // Lấy thông tin của người dùng từ localStorage
        var userToEdit = users.find(function(user) {
            return user.username === username;
        });

        // Điền thông tin của người dùng vào các trường trong form
        document.getElementById('edit-user-form').querySelector("input[name='email']").value = userToEdit.email;
        document.getElementById('edit-user-form').querySelector("input[name='password']").value = userToEdit.password;

        // Lắng nghe sự kiện submit của form
      var editUserForm = document.getElementById('edit-user-form');
      var submitHandler = function(event) {
          event.preventDefault(); // Ngăn chặn gửi form

          // Lấy thông tin chỉnh sửa từ các trường trong form
          var emailEdit = document.getElementById('edit-user-form').querySelector("input[name='email']").value;
          var passwordEdit = document.getElementById('edit-user-form').querySelector("input[name='password']").value;

          // Cập nhật thông tin của người dùng trong mảng users
          users.forEach(function(user){
              if(user.username === username){
                user.username = username;
                user.email = emailEdit;
                user.password = passwordEdit;
              }
          });

          // Lưu lại thông tin đã cập nhật vào localStorage
          localStorage.setItem('users', JSON.stringify(users));

          // Ẩn form chỉnh sửa người dùng
          document.getElementById("edit-user-form").style.display = "none";
          modal.style.display = "none";

          // Hiển thị lại danh sách người dùng sau khi chỉnh sửa
          displayUsers();
          
          // Thông báo thành công
          alert('Sửa tài khoản user thành công!');

          // Loại bỏ sự kiện submit sau khi đã xử lý
          editUserForm.removeEventListener("submit", submitHandler);
      };

      editUserForm.addEventListener("submit", submitHandler);
      }
    });


      // Event delegation for deleting user
      document.getElementById("danh-sach-nguoi-dung").addEventListener("click", function(e) {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        if (e.target && e.target.matches("i.xoa-nguoi-dung")) {
          var listItem = e.target.parentElement.parentElement.parentElement;
          var username = listItem.querySelector("a").getAttribute("value");
          if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
              users = users.filter(function(user) {
                  return user.username !== username;
              });
              localStorage.setItem('users', JSON.stringify(users));
              displayUsers();
          }
        }
    });

  // Display initial data
  displayExams();
  displayUsers();

  // Function to add a new exam
  document.getElementById("them-ky-thi").addEventListener("click", function() {
      window.location.href = "tao-ky-thi.html";
  });

  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  // Lắng nghe sự kiện click vào nút "Thêm mới"
  document.getElementById("them-nguoi-dung").addEventListener("click", function() {
      // Hiển thị form thêm mới người dùng
      modal.style.display = "flex";
      document.getElementById("add-user-form").style.display = "block";
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("edit-user-form").style.display = "none";
    document.getElementById("add-user-form").style.display = "none";

  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById("edit-user-form").style.display = "none";
      document.getElementById("add-user-form").style.display = "none";
    }
  }

  document.getElementById('cancelButtonAdd').addEventListener('click', function() {
    modal.style.display = "none";
  });
  document.getElementById('cancelButtonEdit').addEventListener('click', function() {
    modal.style.display = "none";
  });
  
  // Xử lý sự kiện của form khi người dùng hoàn thành nhập liệu
  document.getElementById('add-user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi form đi và làm mới trang
    // Lấy thông tin từ form
    const username = document.querySelector("input[name='username']").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const confirmPassword = document.querySelector("input[name='confirm_password']").value;

    // Thực hiện xử lý dữ liệu (ví dụ: thêm người dùng vào danh sách)
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    } else if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    } else {
      // Get existing users from localStorage
      var users = JSON.parse(localStorage.getItem('users')) || [];

      var existingUser = users.find(function(user) {
          return user.username === username;
      });

      if (!existingUser) {
          var user = {
              username: username,
              email: email,
              password: password,
          };
          // Add the new user to the existing users
          users.push(user);

          // Save all users back to localStorage
          localStorage.setItem('users', JSON.stringify(users));

          alert('Thêm user thành công!');
      } else {
          alert('Username đã tồn tại!');
      }
    }
    // Ẩn form sau khi hoàn thành nhập liệu
    document.getElementById('add-user-form').style.display = 'none';
    modal.style.display = "none";
    // Hiển thị danh sách người dùng sau khi thêm mới
    resetForm();
    displayUsers();
    function resetForm(){
      document.querySelector("input[name='username']").value = "";
      document.querySelector("input[name='email']").value = "";
      document.querySelector("input[name='password']").value = "";
      document.querySelector("input[name='confirm_password']").value = "";
    }
  });
});

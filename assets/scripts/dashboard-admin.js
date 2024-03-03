document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("ul a").forEach(function(link) {
      link.addEventListener("click", function(e) {
          e.preventDefault();
          var targetId = this.getAttribute("href").substring(1);

          // Ẩn tất cả các phần tử section
          document.querySelectorAll("section").forEach(function(section) {
              section.style.display = "none";
          });

          // Hiển thị phần tử mà người dùng đã chọn
          document.getElementById(targetId).style.display = "block";
      });
    });
});  
document.addEventListener("DOMContentLoaded", function() {
  // Simulated data for exams and users

  var exams = JSON.parse(localStorage.getItem('exams'));
  var users = JSON.parse(localStorage.getItem('users'));

  // Display exams
  function displayExams() {
    var examList = document.getElementById("danh-sach-ky-thi");
    examList.innerHTML = "";
    exams.forEach(function(exam) {
      var listItem = document.createElement("li");
      listItem.textContent = exam.tenKyThi;
      listItem.setAttribute("value", exam.tenKyThi);
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

      // Add event listener for editing exam
      listItem.addEventListener("click", function() {
        // Hide all edit buttons first
        document.querySelectorAll("#danh-sach-ky-thi button").forEach(function(btn) {
          btn.style.display = "none";
        });

        // Show edit and delete buttons for the selected exam
        var editButton = document.getElementById("chinh-sua-ky-thi");
        var deleteButton = document.getElementById("xoa-ky-thi");
        editButton.style.display = "inline-block";
        deleteButton.style.display = "inline-block";

        // Add event listener for editing exam name
        editButton.addEventListener("click", function(e) {
          e.stopPropagation(); // Prevent click propagation to listItem
          var newName = prompt("Nhập tên kỳ thi mới:");
          if (newName) {
            exam.name = newName;
            displayExams();
          }
        });

        // Add event listener for deleting exam
        deleteButton.addEventListener("click", function(e) {
          e.stopPropagation(); // Prevent click propagation to listItem
          if (confirm("Bạn có chắc chắn muốn xóa kỳ thi này không?")) {
            var tenKyThi = listItem.getAttribute("value");
            exams = exams.filter(function(exam) {
              return exam.tenKyThi !== tenKyThi;
            });
            localStorage.setItem('exams', JSON.stringify(exams));
            displayExams();
          }
        });
      });
    });
  }

  // Display users
  function displayUsers() {
    var userList = document.getElementById("danh-sach-nguoi-dung");
    userList.innerHTML = "";
    users.forEach(function(user) {
      var listItem = document.createElement("li");
      listItem.textContent = user.username;
      listItem.setAttribute("value", user.username);
      userList.appendChild(listItem);

      // Add click event listener to highlight selected user
      listItem.addEventListener("click", function() {
        // Remove the "selected" class from all user items
        userList.querySelectorAll("li").forEach(function(item) {
            item.classList.remove("selected");
        });

        // Highlight the selected user
        this.classList.add("selected");
      });

      // Add event listener for editing user
      listItem.addEventListener("click", function() {
        // Hide all edit buttons first
        document.querySelectorAll("#danh-sach-nguoi-dung button").forEach(function(btn) {
          btn.style.display = "none";
        });

        // Show edit and delete buttons for the selected user
        var editButton = document.getElementById("chinh-sua-nguoi-dung");
        var deleteButton = document.getElementById("xoa-nguoi-dung");
        editButton.style.display = "inline-block";
        deleteButton.style.display = "inline-block";

        // Add event listener for editing username
        editButton.addEventListener("click", function(e) {
          e.stopPropagation(); // Prevent click propagation to listItem
          var newName = prompt("Nhập tên người dùng mới:");
          if (newName) {
            user.name = newName;
            displayUsers();
          }
        });

        // Add event listener for deleting user
        deleteButton.addEventListener("click", function(e) {
          e.stopPropagation(); // Prevent click propagation to listItem
          if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            var username = listItem.getAttribute("value");
            users = users.filter(function(user) {
              return user.username !== username;
            });
            localStorage.setItem('users', JSON.stringify(users));
            displayUsers();
          }
        });
      });
    });
  }

  // Display statistics
  function displayStatistics() {
    var statisticsDiv = document.getElementById("thong-ke-result");
    statisticsDiv.innerHTML = "";

    var totalParticipants = 0;
    var averageParticipants = 0;
    exams.forEach(function(exam) {
      totalParticipants += exam.participants;
    });

    if (exams.length > 0) {
      averageParticipants = totalParticipants / exams.length;
    }

    var statisticsHTML = "<p>Tổng số người tham gia: " + totalParticipants + "</p>";
    statisticsHTML += "<p>Số lượng kỳ thi: " + exams.length + "</p>";
    statisticsHTML += "<p>Số người tham gia trung bình mỗi kỳ thi: " + averageParticipants.toFixed(2) + "</p>";

    statisticsDiv.innerHTML = statisticsHTML;
  }

  // Display initial data
  displayExams();
  displayUsers();
  displayStatistics();

  // Function to add a new exam
  document.getElementById("them-ky-thi").addEventListener("click", function() {
    var newName = prompt("Nhập tên kỳ thi mới:");
    if (newName) {
      var newId = exams.length > 0 ? exams[exams.length - 1].id + 1 : 1;
      exams.push({ id: newId, name: newName, participants: 0 });
      displayExams();
      displayStatistics();
    }
  });

  // Function to add a new user
  document.getElementById("them-nguoi-dung").addEventListener("click", function() {
    var newName = prompt("Nhập tên người dùng mới:");
    if (newName) {
      var newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      users.push({ id: newId, name: newName });
      displayUsers();
    }
  });
});


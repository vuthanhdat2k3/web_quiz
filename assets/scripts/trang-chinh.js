// Xử lý chức năng tìm kiếm kỳ thi


function searchExam() {
    event.preventDefault();
    var input = document.getElementById('searchInput').value.toUpperCase().trim();
    var filter = document.getElementById('statusFilter').value.toUpperCase();
    var ul = document.getElementById('list-exam');
    var a = ul.getElementsByTagName('a');
    console.log(input);
    for (var i = 0; i < a.length; i++) {
        var h4 = a[i].getElementsByTagName("h4")[0];
        var txtValue = h4.textContent || h4.innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1 && (filter == "ALL" || a[i].getAttribute("value").toUpperCase() == filter)) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
};

function displayExams() {
    var exams = JSON.parse(localStorage.getItem("exams"));
    console.log(exams.tenKyThi);
    var examList = document.getElementById('list-exam');
    examList.innerHTML = "";
    exams.forEach(function(exam){
      var listItem = document.createElement('a');
      listItem.setAttribute("value", exam.loaiKyThi);
      listItem.href= "../../assets/features/trang-bai-thi.html"; 
      listItem.classList.add("category__option-item");
      var h4 = document.createElement('h4');
      h4.textContent = exam.tenKyThi;
      
      // Thêm sự kiện click để lưu tên kỳ thi vào localStorage
    h4.addEventListener("click", function() {
        localStorage.setItem("currentExam", exam.tenKyThi);
    });
      
      var p1 = document.createElement('p');
      p1.textContent = "Thời gian: " + exam.thoiGian + " phút";
      var p2 = document.createElement('p');
      p2.textContent = "Loại: " + exam.loaiKyThi;
      
      listItem.appendChild(h4);
      listItem.appendChild(p1);
      listItem.appendChild(p2);
      examList.appendChild(listItem);
    })
  }
  
document.addEventListener("DOMContentLoaded", displayExams);
document.addEventListener("DOMContentLoaded", function() {
    var avatar = document.getElementById("avatar");
    var dropdownContent = document.getElementById("dropdownContent");
  
    // Hiển thị hoặc ẩn các dòng chữ khi click vào avatar
    avatar.addEventListener("click", function() {
        dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
    });
});
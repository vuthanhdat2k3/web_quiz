document.addEventListener("DOMContentLoaded", function() {
  var avatar = document.getElementById("avatar");
  var dropdownContent = document.getElementById("dropdownContent");

  // Hiển thị hoặc ẩn các dòng chữ khi click vào avatar
  avatar.addEventListener("click", function() {
      dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
  });
});

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

var countdownElement = document.getElementById('countdown');
var timeLeft = 0;
var selectedUser = [];
const exams = JSON.parse(localStorage.getItem('exams'));
const currentExam = localStorage.getItem('currentExam');
var exam = null;
// Lấy phần tử main để chèn câu hỏi vào
const main = document.querySelector('main');

// Kiểm tra nếu không có bài thi nào trong localStorage
if (!exams || exams.length === 0) {
    main.innerHTML = "<p>Không có bài thi nào được tìm thấy.</p>";
} else {
    // Duyệt qua từng bài thi và hiển thị lên trang
    for(var i = 0 ; i < exams.length; i++) {
      exam = exams[i];
      if(exam.tenKyThi === currentExam){
        const section = document.createElement('section');
        section.classList.add('question');
        section.innerHTML = `<h2 class="exam__name">${exam.tenKyThi}</h2>
                             <p class="exam__time">Thời Gian: ${exam.thoiGian} phút.</p>`;
        const ul = document.createElement('ul');
        ul.classList.add("question__list");
        var choices = ['A', 'B', 'C', 'D'];
        var index = 0;
        exam.cauHoi.forEach((question, questionIndex) => {
            const li = document.createElement('li');
            li.classList.add("question__item");
            li.innerHTML = `<label><b>Câu hỏi ${questionIndex + 1}:</b> ${question.question}</label><br>`;
            for(var i = 0 ; i < question.answers.length ; i++) {
                answer = question.answers[i];
                const div = document.createElement('div');
                div.classList.add("question__answer");

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${questionIndex + 1}`;
                input.setAttribute("value", choices[i]);

                div.appendChild(input);
                const span = document.createElement('span');
                span.textContent = ` ${answer}`;
                div.appendChild(span);
                div.appendChild(document.createElement('br'));
                li.appendChild(div)
            };
            ul.appendChild(li);
        });
        section.appendChild(ul);
        main.appendChild(section);
        timeLeft = exam.thoiGian * 60;
        break;
      }
    };
}

function startTimer() {
    var minutes, seconds;
    var countdown = setInterval(function() {
        minutes = parseInt(timeLeft / 60, 10);
        seconds = parseInt(timeLeft % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdownElement.textContent = minutes + ':' + seconds;

        if (--timeLeft < 0) {
            clearInterval(countdown);
            countdownElement.textContent = 'Hết giờ';
            submitExam();
        }
    }, 1000);
}

startTimer();

function checkAnswer() {
  var correctAnswers = 0;
  exam.cauHoi.forEach((question, index) => {
    var radios = document.querySelectorAll(`input[name="question${index + 1}"]:checked`);
    if (radios.length > 0 && radios[0].value === question.correctAnswer) {
      correctAnswers++;
    }
    if(radios.length > 0) selectedUser.push(radios[0].value);
    else  selectedUser.push('null');
  });
  localStorage.setItem('selectedUser', selectedUser);
  var result = {
    totalQuestions: exam.cauHoi.length,
    correctAnswers: correctAnswers,
    point: (correctAnswers / exam.cauHoi.length) * 100,
  };
  return result;
}

function validateCandidateInfo() {
  var fullname = document.getElementById("fullname").value.trim();
  var studentId = document.getElementById("student-id").value.trim();
  var studentClass = document.getElementById("class").value.trim();

  if (fullname === "" || studentId === "" || studentClass === "") {
      alert("Vui lòng nhập đủ thông tin thí sinh.");
      return false;
  }
  candidate = {
    hoTen: fullname,
    maSv: studentId,
    lop: studentClass
  };
  localStorage.setItem('candidate' , JSON.stringify(candidate));
  return true;
}


function submitExam() {
  if (!validateCandidateInfo()) {
    return; // Dừng hàm nếu thông tin thí sinh không hợp lệ
  } else {
    const result = JSON.stringify(checkAnswer());
    localStorage.setItem("result", result);
    window.location.href= "../../assets/features/trang-ket-qua.html";
  }
  
}

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
    if(exam.tenKyThi === currentExam) {
      listItem.classList.add("category__option-item--active");
    }

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
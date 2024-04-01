document.addEventListener("DOMContentLoaded", function() {
  var avatar = document.getElementById("avatar");
  var dropdownContent = document.getElementById("dropdownContent");

  // Hiển thị hoặc ẩn các dòng chữ khi click vào avatar
  avatar.addEventListener("click", function() {
      dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
  });
});

var submitted = false;

function searchExam() {
  event.preventDefault();
  if(submitted){
    return;
  }
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

// var countdownElement = document.getElementById('countdown');
// var timeLeft = 0;
// var selectedUser = [];
// const exams = JSON.parse(localStorage.getItem('exams'));
// const currentExam = localStorage.getItem('currentExam');
// var exam = null;
// // Lấy phần tử main để chèn câu hỏi vào
// const main = document.querySelector('main');

// // Kiểm tra nếu không có bài thi nào trong localStorage
// if (!exams || exams.length === 0) {
//     main.innerHTML = "<p>Không có bài thi nào được tìm thấy.</p>";
// } else {
//     // Duyệt qua từng bài thi và hiển thị lên trang
//     for(var i = 0 ; i < exams.length; i++) {
//       exam = exams[i];
//       if(exam.tenKyThi === currentExam){
//         const section = document.createElement('section');
//         section.classList.add('question');
//         section.innerHTML = `<h2 class="exam__name">${exam.tenKyThi}</h2>
//                              <p class="exam__time">Thời Gian: ${exam.thoiGian} phút.</p>`;
//         const ul = document.createElement('ul');
//         ul.classList.add("question__list");
//         var choices = ['A', 'B', 'C', 'D'];
//         var index = 0;
//         exam.cauHoi.forEach((question, questionIndex) => {
//             const li = document.createElement('li');
//             li.classList.add("question__item");
//             li.innerHTML = `<label><b>Câu hỏi ${questionIndex + 1}:</b> ${question.question}</label><br>`;
//             for(var i = 0 ; i < question.answers.length ; i++) {
//                 answer = question.answers[i];
//                 const div = document.createElement('div');
//                 div.classList.add("question__answer");

//                 const input = document.createElement('input');
//                 input.type = 'radio';
//                 input.name = `question${questionIndex + 1}`;
//                 input.setAttribute("value", choices[i]);

//                 div.appendChild(input);
//                 const span = document.createElement('span');
//                 span.textContent = ` ${answer}`;
//                 div.appendChild(span);
//                 div.appendChild(document.createElement('br'));
//                 li.appendChild(div)
//             };
//             ul.appendChild(li);
//         });
//         section.appendChild(ul);
//         main.appendChild(section);
//         timeLeft = exam.thoiGian * 60;
//         break;
//       }
//     };
// }

var countdownElement = document.getElementById('countdown');
var timeLeft = 0;
var selectedUser = [];
const currentExamId = localStorage.getItem('currentExamId'); // Thay vì lấy currentExam, lấy currentExamId từ localStorage
const currentExamTime = localStorage.getItem('currentExamTime');
var exam = [];
const main = document.querySelector('main');
var contest = {
  userId: parseInt(localStorage.getItem('userId')),
  fullName: "",
  maSV: "",
  score: 0,
  examName: localStorage.getItem("currentExamName")
}

//Tao contest
fetch('http://localhost:3000/api/v1/createContest', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(contest) // Chuyển đổi object thành chuỗi JSON và gửi đi
    })
  .then(response => {
    if (response.ok) {
        return response.json(); // Chuyển đổi phản hồi thành JSON
    } else {
        // Nếu có lỗi, thông báo lỗi
        throw new Error('Failed to create contest');
    }
  })
  .then(data =>{
    // Kiểm tra xem data có thuộc tính contestId không
    if (data && data.contestId) {
        // Lưu contestId từ dữ liệu nhận được vào localStorage
        localStorage.setItem("contestId", data.contestId);
    } else {
        throw new Error('ContestId not found in response data');
    }
  })
  .catch(error => console.error('Error creating contest:', error))
  .finally(() => {
    // Thực hiện các hành động cuối cùng (nếu có)
  });




// Gửi yêu cầu AJAX để lấy danh sách câu hỏi từ cơ sở dữ liệu
fetch(`http://localhost:3000/api/v1/exams2/${currentExamId}`) // Sử dụng examId để lấy danh sách câu hỏi
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    return response.json();
  })
  .then(questions => {
    exam.cauHoi = questions;
    // Kiểm tra nếu không có câu hỏi cho kỳ thi hiện tại
    if (questions.length === 0) {
      main.innerHTML = "<p>Không có câu hỏi nào được tìm thấy cho kỳ thi này.</p>";
    } else {
      // Hiển thị câu hỏi lên trang
      const section = document.createElement('section');
      section.classList.add('question');
      section.innerHTML = `<h2 class="exam__name">Kỳ thi ${localStorage.getItem('currentExamName')}</h2>`;

      const ul = document.createElement('ul');
      ul.classList.add("question__list");

      var choices = ['A', 'B', 'C', 'D'];
      questions.forEach((question, questionIndex) => {
        const li = document.createElement('li');
        li.classList.add("question__item");
        li.innerHTML = `<label><b>Câu hỏi ${questionIndex + 1}:</b> ${question.content}</label><br>`;
        choices.forEach((choice, index) => {
          const div = document.createElement('div');
          div.classList.add("question__answer");

          const input = document.createElement('input');
          input.type = 'radio';
          input.name = `question${questionIndex + 1}`;
          input.setAttribute("value", choice);

          div.appendChild(input);
          const span = document.createElement('span');
          span.textContent = ` ${question[`option${choice}`]}`;
          div.appendChild(span);
          div.appendChild(document.createElement('br'));
          li.appendChild(div);
        });
        ul.appendChild(li);
      });
      section.appendChild(ul);
      main.appendChild(section);

      timeLeft = currentExamTime * 60;
      console.log(currentExamTime);
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

})
.catch(error => {
  console.error('Error fetching questions:', error);
  main.innerHTML = "<p>Có lỗi xảy ra khi tải câu hỏi.</p>";
});


function checkAnswer() {
  var correctAnswers = 0;
  var userAnswers = [];
  exam.cauHoi.forEach((question, index) => {
    var userAnswer = {
      userId: parseInt(localStorage.getItem('userId')),
      questionId: question.questionId,
      examId: parseInt(localStorage.getItem('currentExamId'))
    };
    var radios = document.querySelectorAll(`input[name="question${index + 1}"]:checked`);
    if (radios.length > 0 && radios[0].value === question.optionCorrect) {
      correctAnswers++;
    }
    if(radios.length > 0) {
      selectedUser.push(radios[0].value);
      userAnswer.selectedAnswer = radios[0].value;
    }
    else  {
      selectedUser.push('null');
      userAnswer.selectedAnswer = "null";
    }    
    userAnswers.push(userAnswer);
  });
  localStorage.setItem('selectedUser', selectedUser);
  var result = {
    totalQuestions: exam.cauHoi.length,
    correctAnswers: correctAnswers,
    point: parseFloat((correctAnswers / exam.cauHoi.length) * 10).toFixed(2),
  };
  contest.score = result.point;
  console.log(userAnswers[0]);

  userAnswers.forEach((userAnswer) => {
    fetch('http://localhost:3000/api/v1/postAnswer', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userAnswer) // Chuyển đổi object thành chuỗi JSON và gửi đi
    })
  .then(response => {
    if (response.ok) {
    } else {
        // Nếu có lỗi, thông báo lỗi
        throw new Error('Failed to add user');
    }
  })
  .catch(error => console.error('Error adding user:', error))
  .finally(() => {
  });
  })
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
  contest.fullName = fullname;
  contest.maSV = studentId;
  contest.examName = localStorage.getItem("currentExamName");
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
    var contestId = parseInt(localStorage.getItem("contestId"));
    // submitted = true;
    fetch(`http://localhost:3000/api/v1/updateContest/${contestId}`,{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(contest) // Chuyển đổi object thành chuỗi JSON và gửi đi
      })
    .then(response => {
      if (response.ok) {
          return response.json(); // Chuyển đổi phản hồi thành JSON
      } else {
          // Nếu có lỗi, thông báo lỗi
          throw new Error('Failed to create contest');
      }
    })
    .catch(error => console.error('Error creating contest:', error))
    .finally(() => {
      // Thực hiện các hành động cuối cùng (nếu có)
    });
    window.location.href= "../../assets/features/trang-ket-qua.html";
    
  }
  
}

// function displayExams() {
//   var exams = JSON.parse(localStorage.getItem("exams"));
//   console.log(exams.tenKyThi);
//   var examList = document.getElementById('list-exam');
//   examList.innerHTML = "";
//   exams.forEach(function(exam){
//     var listItem = document.createElement('a');
//     listItem.setAttribute("value", exam.loaiKyThi);
//     listItem.href= "../../assets/features/trang-bai-thi.html"; 
//     listItem.classList.add("category__option-item");
//     if(exam.tenKyThi === currentExam) {
//       listItem.classList.add("category__option-item--active");
//     }

//     var h4 = document.createElement('h4');
//     h4.textContent = exam.tenKyThi;
    
//     // Thêm sự kiện click để lưu tên kỳ thi vào localStorage
//   h4.addEventListener("click", function() {
//       localStorage.setItem("currentExam", exam.tenKyThi);
//   });
    
//     var p1 = document.createElement('p');
//     p1.textContent = "Thời gian: " + exam.thoiGian + " phút";
//     var p2 = document.createElement('p');
//     p2.textContent = "Loại: " + exam.loaiKyThi;
    
//     listItem.appendChild(h4);
//     listItem.appendChild(p1);
//     listItem.appendChild(p2);
//     examList.appendChild(listItem);
//   })
// }
function displayExams() {
  fetch('http://localhost:3000/api/v1/listExam', {
          method: 'GET'
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Failed to fetch exams!');
          }
      })
      .then(exams => {
          var examList = document.getElementById('list-exam');
          examList.innerHTML = "";
          exams.forEach(function(exam) {
              var listItem = document.createElement('a');
              listItem.setAttribute("value", exam.type);
              listItem.href = "../../assets/features/trang-bai-thi.html";
              listItem.classList.add("category__option-item");
              var h4 = document.createElement('h4');
              h4.textContent = exam.examName;


              //Thêm sự kiện click để lưu tên kỳ thi vào localStorage
                h4.addEventListener("click", function() {
              localStorage.setItem("currentExamId", exam.examId);
              localStorage.setItem("currentExamTime", exam.time);
              localStorage.setItem("currentExamName", exam.examName);
            });

              var p1 = document.createElement('p');
              p1.textContent = "Thời gian: " + exam.time + " phút";
              var p2 = document.createElement('p');
              p2.textContent = "Loại: " + exam.type;

              listItem.appendChild(h4);
              listItem.appendChild(p1);
              listItem.appendChild(p2);
              examList.appendChild(listItem);
          });
      })
      .catch(error => console.error('Error fetching exams:', error));
}

document.addEventListener("DOMContentLoaded", displayExams);
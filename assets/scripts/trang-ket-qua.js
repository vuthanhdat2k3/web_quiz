var correctAnswers = 0;
var totalQuestions = 0;
var point = 0;
// Giả sử có một hàm để lấy dữ liệu về số câu trả lời đúng và tổng số câu
function getSummary() {
    var result = JSON.parse(localStorage.getItem("result"));
    correctAnswers = result.correctAnswers; // Số câu trả lời đúng
    totalQuestions = result.totalQuestions; // Tổng số câu
    point = result.point;
}

function displaySummary() {
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('score').textContent = point;
}

window.onload = function() {
  getSummary();
  displaySummary();
}

function reviewAnswers() {
  // Lấy dữ liệu từ localStorage
  var result = JSON.parse(localStorage.getItem("result"));
  
  // Kiểm tra xem có dữ liệu không
  if (!result) {
      console.log("Không có dữ liệu câu trả lời.");
      return;
  }

  var questions = "trang-bai-thi.html".getElementsByTagName('ul');
  var answersHTML = ""; // Chuỗi HTML để hiển thị câu trả lời chi tiết

  // Duyệt qua mỗi câu hỏi và hiển thị câu trả lời và đáp án đúng
  for (var i = 0; i < questions.length; i++) {
      var questionNumber = i + 1; // Số thứ tự của câu hỏi
      var userAnswer = result.answers[i]; // Câu trả lời của người dùng
      var correctAnswer = result.correctAnswers[i]; // Đáp án đúng của câu hỏi

      // Tạo HTML cho câu hỏi và câu trả lời
      var questionHTML = "<p>Câu hỏi " + questionNumber + ": " + questions[i].textContent + "</p>";
      var userAnswerHTML = "<p>Câu trả lời của bạn: " + userAnswer + "</p>";
      var correctAnswerHTML = "<p>Đáp án đúng: " + correctAnswer + "</p>";

      // Kết hợp HTML của câu hỏi và câu trả lời
      var questionAnswerHTML = questionHTML + userAnswerHTML + correctAnswerHTML;

      // Thêm vào chuỗi HTML tổng thể
      answersHTML += questionAnswerHTML;
  }
  console.log(answersHTML);
  // Hiển thị chuỗi HTML đã tạo vào phần #answers trên trang
  document.getElementById("answers").innerHTML = answersHTML;
}



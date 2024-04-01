var correctAnswers = 0;
var totalQuestions = 0;
var point = 0;
var hoTen = "";
var maSv = "";
var lop = "";
// Giả sử có một hàm để lấy dữ liệu về số câu trả lời đúng và tổng số câu
function getSummary() {
    var result = JSON.parse(localStorage.getItem("result"));
    correctAnswers = result.correctAnswers; // Số câu trả lời đúng
    totalQuestions = result.totalQuestions; // Tổng số câu
    point = parseFloat(result.point).toFixed(2);
}

function getInfo(){
  var candidate = JSON.parse(localStorage.getItem('candidate'));
  hoTen = candidate.hoTen;
  maSv = candidate.maSv;
  lop = candidate.lop;
}

function displaySummary() {
  document.getElementById('name').textContent = hoTen;
  document.getElementById('id-student').textContent = maSv;
  document.getElementById('classroom').textContent = lop;
  document.getElementById('correctAnswers').textContent = correctAnswers;
  document.getElementById('totalQuestions').textContent = totalQuestions;
  document.getElementById('score').textContent = point;
}

window.onload = function() {
  getSummary();
  getInfo();
  displaySummary();
}

let answerShown = false; // Biến để theo dõi xem đáp án đã được hiển thị hay chưa
var selectedUser = localStorage.getItem('selectedUser');

function reviewAnswers() {
    if (!answerShown) { // Kiểm tra xem đáp án đã được hiển thị chưa
      const currentExamId = localStorage.getItem('currentExamId');
      fetch(`http://localhost:3000/api/v1/exams2/${currentExamId}`) // Sử dụng examId để lấy danh sách câu hỏi
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then(questions => {
        // const exams = JSON.parse(localStorage.getItem('exams'));
        // const currentExam = localStorage.getItem('currentExam');
        
        // // Tìm bài thi hiện tại trong mảng exams
        // const currentExamData = exams.find(exam => exam.tenKyThi === currentExam);
        
        // Lấy phần tử section.question để chèn câu hỏi vào
        const questionSection = document.querySelector('.detail-answer');   
        
        // Hiển thị câu hỏi và đáp án
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add("question");
            questionDiv.innerHTML = `<p class = "question-heading"><b>Câu hỏi ${index + 1}:</b> ${question.content}</p>`;
            
            // Hiển thị 4 đáp án và đáp án đúng
            const answersDiv = document.createElement('div');
            answersDiv.classList.add("answer");
            for(var i = 0 ; i < 4 ; i++){
              const answerDiv = document.createElement('div');
              answerDiv.classList.add("answer-item");
              const answerInput = document.createElement('input');
              const answerLabel = document.createElement('label');
              answerInput.type = 'radio';
              answerInput.name = `answer${index}`;
              answerInput.value = String.fromCharCode(65 + i);
              if(answerInput.value === selectedUser[2 * index]) {
                answerInput.checked = true;
                if(answerInput.value === question.optionCorrect){
                  answerLabel.style.color = "green";
                }
                else{
                  answerLabel.style.color = "red";
                }
              }
              answerLabel.appendChild(answerInput);
              answerLabel.appendChild(document.createTextNode(` ${question[`option${String.fromCharCode(65 + i)}`]}`));
              answerDiv.appendChild(answerLabel);
              // answerDiv.innerHTML = <label><input type="radio" name="answer${index}" value="${String.fromCharCode(65 + i)}"> ${answer}</label>;
              answersDiv.appendChild(answerDiv);
            }
            // question.answers.forEach((answer, i) => {
            //     const answerDiv = document.createElement('div');
            //     answerDiv.classList.add("answer-item");
            //     const answerInput = document.createElement('input');
            //     const answerLabel = document.createElement('label');
            //     answerInput.type = 'radio';
            //     answerInput.name = `answer${index}`;
            //     answerInput.value = String.fromCharCode(65 + i);
            //     if(answerInput.value === selectedUser[2 * index]) {
            //       answerInput.checked = true;
            //       if(answerInput.value === question.correctAnswer){
            //         answerLabel.style.color = "green";
            //       }
            //       else{
            //         answerLabel.style.color = "red";
            //       }
            //     }
            //     answerLabel.appendChild(answerInput);
            //     answerLabel.appendChild(document.createTextNode(answer));
            //     answerDiv.appendChild(answerLabel);
            //     // answerDiv.innerHTML = <label><input type="radio" name="answer${index}" value="${String.fromCharCode(65 + i)}"> ${answer}</label>;
            //     answersDiv.appendChild(answerDiv);

                
            // });
            questionDiv.appendChild(answersDiv);
            
            const correctAnswerDiv = document.createElement('div')
            correctAnswerDiv.classList.add("answer-correct");
            correctAnswerDiv.innerHTML = `<p>Đáp án đúng: ${question.optionCorrect}</p>`;
            questionDiv.appendChild(correctAnswerDiv);
            
            questionSection.appendChild(questionDiv);
            document.getElementById('viewAnswer').style.display = "none";
        });

        answerShown = true; // Đặt biến answerShown thành true để chỉ hiển thị một lần duy nhất
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        main.innerHTML = "<p>Có lỗi xảy ra khi tải câu hỏi.</p>";
      });
    }
}
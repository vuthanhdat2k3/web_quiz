var countdownElement = document.getElementById('countdown');
var totalTime = 60 * 30;
var timeLeft = totalTime;

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
  var questions = document.getElementsByTagName('ul');
  var correctAnswers = 0;
  for(var i = 0 ; i < questions.length ; i++){
    var radios = questions[i].querySelectorAll('input[type="radio"]');
    var answer = null;
    for(var j = 0 ; j < radios.length ; j++){
      if(radios[j].checked){
        answer = radios[j].value;
        break;
      }
    }
    if(answer === "true"){
      correctAnswers ++;
    }
  }
  var result = {
    totalQuestions: questions.length,
    correctAnswers: correctAnswers,
    point: (correctAnswers / questions.length) * 100,
  };
  return result;
}

function submitExam() {
  const result = JSON.stringify(checkAnswer());
  localStorage.setItem("result", result);
  window.location.href= "trang-ket-qua.html";
}

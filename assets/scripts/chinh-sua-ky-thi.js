document.addEventListener("DOMContentLoaded", function() {
  var kyThiForm = document.getElementById("ky-thi-form");
  var cauHoiContainer = document.getElementById("cau-hoi-container");
  var index = document.querySelectorAll(".cau-hoi-input").length + 1;

  var examToEdit = JSON.parse(localStorage.getItem('examToEdit'));
  document.getElementById("ten-ky-thi").value = examToEdit ? examToEdit.tenKyThi : "";
  document.getElementById("thoi-gian").value = examToEdit ? examToEdit.thoiGian : "";
  document.getElementById("loai-ky-thi").value = examToEdit ? examToEdit.loaiKyThi : "";

  // Add questions from Excel to the question creation section
  if (examToEdit) {
    examToEdit.cauHoi.forEach(function(questionData) {
      var cauHoiInput = createQuestionInput();
      cauHoiInput.querySelector(".cau-hoi-content").value = questionData.question;
      questionData.answers.forEach(function(answer, index) {
        cauHoiInput.querySelectorAll(".dap-an-input")[index].value = answer;
      });
      cauHoiInput.querySelector(".dap-an-dung").value = questionData.correctAnswer;
      cauHoiContainer.appendChild(cauHoiInput);
    });
  }

  // Update question index after adding questions
  index = document.querySelectorAll(".cau-hoi-input").length + 1;

  kyThiForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission
    saveFormState(); // Save form state when submitting
    alert('Dữ liệu câu hỏi và đáp án đã được lưu vào localStorage.');
  });

  // Thêm sự kiện cho button "Thêm câu hỏi"
  document.getElementById("them-cau-hoi").addEventListener("click", function() {
    var cauHoiInput = createQuestionInput();
    cauHoiContainer.appendChild(cauHoiInput);
    // Tạo một dòng trống giữa các câu hỏi
    cauHoiContainer.appendChild(document.createElement("hr"));
    index++; // Tăng số thứ tự câu hỏi
    saveFormState(); // Save form state after adding question
  });

  // Load form state when the page is loaded
  loadFormState();

  function createQuestionInput() {
    var cauHoiInput = document.createElement("div");
    cauHoiInput.classList.add("cau-hoi-input");

    var label = document.createElement("label");
    label.textContent = "Câu hỏi " + index + ":";
    cauHoiInput.appendChild(label);

    var cauHoiContentInput = document.createElement("input");
    cauHoiContentInput.setAttribute("type", "text");
    cauHoiContentInput.setAttribute("placeholder", "Nhập câu hỏi");
    cauHoiContentInput.classList.add("cau-hoi-content");
    cauHoiInput.appendChild(cauHoiContentInput);

    // Tạo 4 input cho đáp án A, B, C, D
    var dapAnLabels = ["A", "B", "C", "D"];
    for (var i = 0; i < 4; i++) {
      var dapAnInput = document.createElement("input");
      dapAnInput.setAttribute("type", "text");
      dapAnInput.setAttribute("placeholder", "Nhập các đáp án " + dapAnLabels[i]);
      dapAnInput.classList.add("dap-an-input");
      cauHoiInput.appendChild(dapAnInput);
    }

    // Tạo phần nhập đáp án chính xác
    var dapAnDungInput = document.createElement("input");
    dapAnDungInput.setAttribute("type", "text");
    dapAnDungInput.setAttribute("placeholder", "Đáp án đúng là(ví dụ: A)");
    dapAnDungInput.classList.add("dap-an-dung");
    cauHoiInput.appendChild(dapAnDungInput);

    // Tạo button xóa câu hỏi
    var xoaButton = document.createElement("button");
    xoaButton.textContent = "Xóa";
    xoaButton.classList.add("xoa-cau-hoi-btn");
    xoaButton.addEventListener("click", function() {
      cauHoiInput.remove();
      index--; // Giảm số thứ tự câu hỏi
      saveFormState(); // Save form state after removing question
    });
    cauHoiInput.appendChild(xoaButton);

    return cauHoiInput;
  }

  function saveFormState() {
    var formState = {
      tenKyThi: document.getElementById("ten-ky-thi").value.toUpperCase(),
      thoiGian: document.getElementById("thoi-gian").value,
      loaiKyThi: document.getElementById("loai-ky-thi").value,
      cauHoi: []
    };

    var cauHoiInputs = cauHoiContainer.querySelectorAll(".cau-hoi-input");
    cauHoiInputs.forEach(function(cauHoiInput) {
      var question = cauHoiInput.querySelector(".cau-hoi-content").value;
      var answers = Array.from(cauHoiInput.querySelectorAll(".dap-an-input")).map(function(dapAnInput) {
        return dapAnInput.value;
      });
      var correctAnswer = cauHoiInput.querySelector(".dap-an-dung").value;
      formState.cauHoi.push({ question: question, answers: answers, correctAnswer: correctAnswer });
    });

    localStorage.setItem("kythiFormSate", JSON.stringify(formState));

    // Thay thế exam có tên giống với formState trong mảng exams
    var exams = JSON.parse(localStorage.getItem("exams")) || [];
    var existingExamIndex = exams.findIndex(function(exam) {
      return exam.tenKyThi === formState.tenKyThi;
    });
    if (existingExamIndex !== -1) {
      exams[existingExamIndex] = formState;
      localStorage.setItem("exams", JSON.stringify(exams));
    }
  }

  function loadFormState() {
    var formState = JSON.parse(localStorage.getItem("kyThiFormState"));
    var exams = JSON.parse(localStorage.getItem("exams")) || [];
    var exam = exams.find(function(exam){
      return exam.tenKyThi === formState.tenKyThi;
    })
    if (exam) {
      document.getElementById("ten-ky-thi").value = exam.tenKyThi;
      document.getElementById("thoi-gian").value = exam.thoiGian;
      document.getElementById("loai-ky-thi").value = exam.loaiKyThi;
  
      cauHoiContainer.innerHTML = ""; // Clear existing questions
      exam.cauHoi.forEach(function(questionData, questionIndex) {
        var cauHoiInput = createQuestionInput();
        cauHoiInput.querySelector(".cau-hoi-content").value = questionData.question;
        questionData.answers.forEach(function(answer, answerIndex) {
          cauHoiInput.querySelectorAll(".dap-an-input")[answerIndex].value = answer;
        });
        cauHoiInput.querySelector(".dap-an-dung").value = questionData.correctAnswer;
        cauHoiContainer.appendChild(cauHoiInput);
  
        // Update question index
        var label = cauHoiInput.querySelector("label");
        label.textContent = "Câu hỏi " + (questionIndex + 1) + ":";
      });
      index = exam.cauHoi.length + 1; // Update index
    }
  }
  
});

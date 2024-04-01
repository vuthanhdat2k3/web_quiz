document.addEventListener("DOMContentLoaded", function() {
  event.preventDefault();
  var kyThiForm = document.getElementById("ky-thi-form");
  var cauHoiContainer = document.getElementById("cau-hoi-container");
  var index = document.querySelectorAll(".cau-hoi-input").length + 1;

  var examToEdit = {};
  
  var examId = localStorage.getItem('editExamId');

    fetch(`http://localhost:3000/api/v1/exams1/${examId}`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(exam => {
        // Điền thông tin của kỳ thi vào các trường trong form
        document.getElementById("ten-ky-thi").value = exam[0].examName;
        document.getElementById("thoi-gian").value = exam[0].time;
        document.getElementById("loai-ky-thi").value = exam[0].type;
        examToEdit.examName = exam[0].examName;
        examToEdit.time = exam[0].time;
        examToEdit.type = exam[0].type;


  fetch(`http://localhost:3000/api/v1/exams2/${examId}`, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        return response.json();
      }
    })
    .then(questions => {
      examToEdit.cauHoi = questions;
      console.log(examToEdit.cauHoi);
      if (examToEdit) {
        for(var i = 0 ; i < examToEdit.cauHoi.length ; i++) {
          var cauHoiInput = createQuestionInput();
          cauHoiInput.querySelector(".cau-hoi-content").value = examToEdit.cauHoi[i].content;
          cauHoiInput.querySelectorAll(".dap-an-input")[0].value = examToEdit.cauHoi[i].optionA;
          cauHoiInput.querySelectorAll(".dap-an-input")[1].value = examToEdit.cauHoi[i].optionB;
          cauHoiInput.querySelectorAll(".dap-an-input")[2].value = examToEdit.cauHoi[i].optionC;
          cauHoiInput.querySelectorAll(".dap-an-input")[3].value = examToEdit.cauHoi[i].optionD;
          cauHoiInput.querySelector(".dap-an-dung").value = examToEdit.cauHoi[i].optionCorrect;
          cauHoiContainer.appendChild(cauHoiInput);
        }
      }
      localStorage.setItem("kyThiFormState", JSON.stringify(examToEdit));
      console.log(examToEdit.examName);
    // Update question index after adding questions
    index = document.querySelectorAll(".cau-hoi-input").length + 1;
  
    kyThiForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent default form submission
      saveFormState(); // Save form state when submitting
      alert('Sửa thành công.');
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
    
      index++; // Tăng số thứ tự câu hỏi sau khi thêm câu hỏi vào container
    
      return cauHoiInput;
    }
    
  
    function saveFormState() {
      var formState = {
        examName: document.getElementById("ten-ky-thi").value.toUpperCase(),
        time: document.getElementById("thoi-gian").value,
        type: document.getElementById("loai-ky-thi").value,
        cauHoi: []
      };
      
      var cauHoiInputs = cauHoiContainer.querySelectorAll(".cau-hoi-input");
      cauHoiInputs.forEach(function(cauHoiInput) {
        var content = cauHoiInput.querySelector(".cau-hoi-content").value;
        var optionA = cauHoiInput.querySelectorAll(".dap-an-input")[0].value;
        var optionB = cauHoiInput.querySelectorAll(".dap-an-input")[1].value;
        var optionC = cauHoiInput.querySelectorAll(".dap-an-input")[2].value;
        var optionD = cauHoiInput.querySelectorAll(".dap-an-input")[3].value;
        var optionCorrect = cauHoiInput.querySelector(".dap-an-dung").value;
        formState.cauHoi.push({ content: content, optionA: optionA, optionB: optionB, optionC: optionC, optionD: optionD, optionCorrect: optionCorrect, examId: examId});
      });
    
      localStorage.setItem("kyThiFormState", JSON.stringify(formState)); // Chỉnh sửa key thành kyThiFormState
      
      // Thay thế exam có tên giống với formState trong mảng exams
      // var exams = JSON.parse(localStorage.getItem("exams")) || [];
      // var existingExamIndex = exams.findIndex(function(exam) {
      //   return exam.tenKyThi === formState.tenKyThi;
      // });
      // if (existingExamIndex !== -1) {
      //   exams[existingExamIndex] = formState;
      //   localStorage.setItem("exams", JSON.stringify(exams));
      //   localStorage.setItem("examToEdit", JSON.stringify(formState));
      // } else {
      //   localStorage.removeItem("kyThiFormState"); // Xóa dữ liệu nếu không tìm thấy exam
      // }


      var examEdit = {
        examName: formState.examName,
        time: formState.time,
        type: formState.type,
      }
      

      fetch('http://localhost:3000/api/v1/deleteQuestion/' + examId, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
            } else {
                throw new Error('Failed to update user');
            }
        })
        .catch(error => console.error('Error updating user:', error));

      console.log(formState.cauHoi);

      for(var i = 0 ; i < formState.cauHoi.length ; i++){
        fetch('http://localhost:3000/api/v1/createQuestion', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formState.cauHoi[i])
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to create exam');
            }
        })
        .catch(error => console.error('Error adding user:', error))
        .finally(() => {
        });  
      }
      
        
      


      // var questionEdit = {
      //   examId: formState.cauHoi[0].examId,
      //   content: formState.cauHoi[0].content,
      //   optionA: formState.cauHoi[0].optionA,
      //   optionB: formState.cauHoi[0].optionB,
      //   optionC: formState.cauHoi[0].optionC,
      //   optionD: formState.cauHoi[0].optionD,
      //   optionCorrect: formState.cauHoi[0].optionCorrect
        
      // }

    //   fetch('http://localhost:3000/api/v1/edit-question/' + formState.cauHoi[0].questionId, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(questionEdit)
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //         } else {
    //             throw new Error('Failed to update user');
    //         }
    //     })
    //     .catch(error => console.error('Error updating user:', error));

    }
  
    function loadFormState() {
      var formState = JSON.parse(localStorage.getItem("kyThiFormState"));
      var exams = JSON.parse(localStorage.getItem("exams")) || [];
      var exam = exams.find(function(exam){
        return exam.tenKyThi === formState.tenKyThi;
      })
      if (formState) {
        document.getElementById("ten-ky-thi").value = formState.examName;
        document.getElementById("thoi-gian").value = formState.time;
        document.getElementById("loai-ky-thi").value = formState.type;
    
        cauHoiContainer.innerHTML = ""; // Clear existing questions
        for(var i = 0 ; i < formState.cauHoi.length ; i++) {
          var cauHoiInput = createQuestionInput();
          cauHoiInput.querySelector(".cau-hoi-content").value = formState.cauHoi[i].content;
          cauHoiInput.querySelectorAll(".dap-an-input")[0].value = formState.cauHoi[i].optionA;
          cauHoiInput.querySelectorAll(".dap-an-input")[1].value = formState.cauHoi[i].optionB;
          cauHoiInput.querySelectorAll(".dap-an-input")[2].value = formState.cauHoi[i].optionC;
          cauHoiInput.querySelectorAll(".dap-an-input")[3].value = formState.cauHoi[i].optionD;
          cauHoiInput.querySelector(".dap-an-dung").value = formState.cauHoi[i].optionCorrect;
          cauHoiContainer.appendChild(cauHoiInput);
    
          // Update question index
          var label = cauHoiInput.querySelector("label");
          label.textContent = "Câu hỏi " + (i + 1) + ":";
        }
        index = formState.cauHoi.length + 1; // Update index
      }
    }
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
  })
  .catch(error => {
    console.error('Error fetching exam data:', error);
  });
});   
  
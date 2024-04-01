document.addEventListener("DOMContentLoaded", function() {
  var kyThiForm = document.getElementById("ky-thi-form");
  var cauHoiContainer = document.getElementById("cau-hoi-container");
  var index = document.querySelectorAll(".cau-hoi-input").length + 1;
  var error = document.getElementById("exam-error");
  kyThiForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent default form submission

      // Get form data
      var tenKyThi = document.getElementById("ten-ky-thi").value.toUpperCase();
      var thoiGian = document.getElementById("thoi-gian").value;
      var loaiKyThi = document.getElementById("loai-ky-thi").value;
      
      // Get danh sách câu hỏi
      var cauHoiInputs = cauHoiContainer.querySelectorAll(".cau-hoi-input");
      
      var cauHoiArray = Array.from(cauHoiInputs).map(function(cauHoiInput) {
          var cauHoiContent = cauHoiInput.querySelector(".cau-hoi-content").value;
          var dapAnInputs = cauHoiInput.querySelectorAll(".dap-an-input");
          var correctAnswer = cauHoiInput.querySelector(".dap-an-dung").value;
          var dapAnArray = Array.from(dapAnInputs).map(function(dapAnInput) {
              return dapAnInput.value;
          });
          return { content: cauHoiContent, answers: dapAnArray, optionCorrect: correctAnswer};
      });


      

      // Get existing exams from localStorage
      // var exams = JSON.parse(localStorage.getItem("exams")) || [];

      // var existingExam = exams.find(function(exam) {
      //   return exam.tenKyThi === tenKyThi;
      // });

        // Construct exam object
        var exam = {
          examName: tenKyThi,
          time: parseInt(thoiGian),
          type: loaiKyThi
        };
        // // Add the new exam to the existing exams
        // exams.push(exam);
        // // Save all exams back to localStorage
        // localStorage.setItem("exams", JSON.stringify(exams));

        // alert('Dữ liệu câu hỏi và đáp án đã được lưu vào localStorage.');
        // // Clear form fields
        // resetForm();
        
        // Gửi yêu cầu POST để tạo mới kỳ thi
      fetch('http://localhost:3000/api/v1/createExam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exam)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
          error.style.display = "block";
            throw new Error('Failed to create exam');
        }
    })
    .then(data => {
        console.log('Exam created:', data);
        // Lấy id của kỳ thi mới được tạo
        var examId = data.examId;
        console.log('Exam ID:', examId);

        for(var i = 0 ; i < cauHoiArray.length ; i++){
            var question = {
              content: cauHoiArray[i].content,
              optionA: cauHoiArray[i].answers[0],
              optionB: cauHoiArray[i].answers[1],
              optionC: cauHoiArray[i].answers[2],
              optionD: cauHoiArray[i].answers[3],
              optionCorrect: cauHoiArray[i].optionCorrect,
              examId: examId,
            }

            fetch('http://localhost:3000/api/v1/createQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(question) // Chuyển đổi object thành chuỗi JSON và gửi đi
            })
            .then(response => {
                if (response.ok) {
                  resetForm();
                } else {
                    // Nếu có lỗi, thông báo lỗi
                    throw new Error('Failed to add user');
                    
                }
            })
            .catch(error => console.error('Error adding user:', error))
            .finally(() => {
            });


        }
        
      })
  });

  // Thêm sự kiện cho button "Thêm câu hỏi"
  document.getElementById("them-cau-hoi").addEventListener("click", function() {
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
      xoaButton.setAttribute("type", "button");
      xoaButton.classList.add("xoa-cau-hoi-btn");
      xoaButton.addEventListener("click", function() {
          cauHoiInput.remove();
          index --;
      });
      cauHoiInput.appendChild(xoaButton);

      // Thêm câu hỏi mới vào container
      cauHoiContainer.appendChild(cauHoiInput);

      // Tạo một dòng trống giữa các câu hỏi
      cauHoiContainer.appendChild(document.createElement("hr"));

      index++; // Tăng số thứ tự câu hỏi
  });
  document.getElementById('file-input').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var tenKyThi = document.getElementById("ten-ky-thi").value.toUpperCase();
    var thoiGian = document.getElementById("thoi-gian").value;
    var loaiKyThi = document.getElementById("loai-ky-thi").value;
    var exam = {
      examName: tenKyThi,
      time: parseInt(thoiGian),
      type: loaiKyThi
    };
    

    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var sheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[sheetName];  
      // Convert Excel data to JSON
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Convert JSON data to question and answer format
      var questionsAndAnswers = [];
  
      for (var i = 1; i < jsonData.length; i++) {
          var cauHoiContent = jsonData[i][0];
          var dapAnInputs = jsonData[i].slice(1, 5); // Assuming there are 4 answer options
          var correctAnswer = jsonData[i][5];
  
          var questionAndAnswers = {
              question: cauHoiContent,
              answers: dapAnInputs,
              correctAnswer: correctAnswer
          };
  
          questionsAndAnswers.push(questionAndAnswers);
      }
  
      // Add questions from Excel to the question creation section
      questionsAndAnswers.forEach(function(questionData) {
          var cauHoiInput = document.createElement("div");
          cauHoiInput.classList.add("cau-hoi-input");
  
          var label = document.createElement("label");
          label.textContent = "Câu hỏi " + index + ":";
          cauHoiInput.appendChild(label);
  
          var cauHoiContentInput = document.createElement("input");
          cauHoiContentInput.setAttribute("type", "text");
          cauHoiContentInput.setAttribute("placeholder", "Nhập câu hỏi");
          cauHoiContentInput.classList.add("cau-hoi-content");
          cauHoiContentInput.value = questionData.question;
          cauHoiInput.appendChild(cauHoiContentInput);
  
          questionData.answers.forEach(function(answer, index) {
              var dapAnInput = document.createElement("input");
              dapAnInput.setAttribute("type", "text");
              dapAnInput.setAttribute("placeholder", "Nhập đáp án " + String.fromCharCode(65 + index));
              dapAnInput.classList.add("dap-an-input");
              dapAnInput.value = answer;
              cauHoiInput.appendChild(dapAnInput);
          });
  
          var dapAnDungInput = document.createElement("input");
          dapAnDungInput.setAttribute("type", "text");
          dapAnDungInput.setAttribute("placeholder", "Đáp án đúng là (ví dụ: A)");
          dapAnDungInput.classList.add("dap-an-dung");
          dapAnDungInput.value = questionData.correctAnswer;
          cauHoiInput.appendChild(dapAnDungInput);
  
          var xoaButton = document.createElement("button");
          xoaButton.textContent = "Xóa";
          xoaButton.setAttribute("type", "button");
          xoaButton.classList.add("xoa-cau-hoi-btn");
          xoaButton.addEventListener("click", function() {
              cauHoiInput.remove();
              index--;
          });
          cauHoiInput.appendChild(xoaButton);
  
          cauHoiContainer.appendChild(cauHoiInput);
          cauHoiContainer.appendChild(document.createElement("hr"));
  
          index++; // Increase the question index
      });
  
      // Update question index after adding questions
      index = document.querySelectorAll(".cau-hoi-input").length + 1;
  };
  
  
    reader.readAsArrayBuffer(file);
    function resetForm() {
      document.getElementById("ten-ky-thi").value = "";
      document.getElementById("thoi-gian").value = "";
      document.getElementById("loai-ky-thi").value = "";
      error.style.display = "none";
    }
    
  });

  function resetForm() {
      document.getElementById("ten-ky-thi").value = "";
      document.getElementById("thoi-gian").value = "";
      document.getElementById("loai-ky-thi").value = "";
      cauHoiContainer.innerHTML = ""; // Clear danh sách câu hỏi
      index = 1; // Reset lại số thứ tự câu hỏi
      error.style.display = "none";
  }
});




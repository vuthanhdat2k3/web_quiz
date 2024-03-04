const students = [
  {
    name: "Nguyen Van A",
    id: "B21DCCN001",
    exams: [
      {
        name: "Ky thi giua ky",
        score: 8,
        status: "Hoan thanh",
        time: "10:00:00 12/12/2023",
        details: [
          {
            question: "Loai qua nao khong an duoc?",
            answer: "A.Qua xoai",
            correctAnswer: "B.Qua dan",
            explanation: "Qua dan an vao la chet",
          },
          {
            question: "Dao dien cua phim 'Toi thay hoa vang tren co xanh', chuyen the tu tac pham cung ten cua nha van Nguyen Nhat Anh, la ai?",
            answer: "A.Nguyen Quang Dung",
            correctAnswer: "C.Victor Vu",
            explanation: "Giai thich ....",
          },
          // Them cau hoi khac neu can
        ],
      },
      {
        name: "Ky thi cuoi ky",
        score: 7,
        status: "Hoan thanh",
        time: "10:00:00 12/12/2023",
        details: [
          {
            question: "Con song nao ngan cach Dang Trong va Dang Ngoai thoi ky Trinh - Nguyen phan tranh?",
            answer: "C.Song Thu Bon",
            correctAnswer: "B.Song Gianh",
            explanation: "Giai thich ...",
          },
          {
            question: "Dot ret muon cuoi cung vao cuoi thang 3 o mien Bac co ten la gi?",
            answer: "B.Ret Nang Kieu",
            correctAnswer: "A.Ret Nang Ban",
            explanation: "Giai thich ....",
          },
          // Them cau hoi khac neu can
        ],
      },
      // Them ky thi khac neu can
    ],
  },
  {
    name: "Nguyen Van B",
    id: "B21DCCN002",
    exams: [
      {
        name: "Ky thi giua ky",
        score: 9,
        status: "Hoan thanh",
        time: "10:00:00 12/12/2023",
        details: [
          {
            question: "Cau hoi 1",
            answer: "Dap an cua sinh vien",
            correctAnswer: "Dap an dung",
            explanation: "Giai thich cho cau hoi 1",
          },
          {
            question: "Cau hoi 2",
            answer: "Dap an cua sinh vien",
            correctAnswer: "Dap an dung",
            explanation: "Giai thich cho cau hoi 2",
          },
          // Them cau hoi khac neu can
        ],
      },
      {
        name: "Ky thi cuoi ky",
        score: 6,
        status: "Hoan thanh",
        time: "10:00:00 12/12/2023",
        details: [
          {
            question: "Cau hoi 1",
            answer: "Dap an cua sinh vien",
            correctAnswer: "Dap an dung",
            explanation: "Giai thich cho cau hoi 1",
          },
          {
            question: "Cau hoi 2",
            answer: "Dap an cua sinh vien",
            correctAnswer: "Dap an dung",
            explanation: "Giai thich cho cau hoi 2",
          },
          // Them cau hoi khac neu can
        ],
      },
      // Them ky thi khac neu can
    ],
  },
  // Them sinh vien khac neu can
];


function searchStudent() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const examResults = document.getElementById("examResults");
  examResults.innerHTML = "";

  students.forEach(student => {
    // Tìm sinh viên theo tên hoặc mã số sinh viên
    if (student.name.toLowerCase().includes(searchInput) || student.id.toLowerCase().includes(searchInput)) {
      const studentDiv = document.createElement("div");
      studentDiv.classList.add("student");
      studentDiv.innerHTML = `<h2>${student.name} (${student.id})</h2>`;
      
      // Hiển thị danh sách các kỳ thi
      student.exams.forEach(exam => {
        const examDiv = document.createElement("div");
        examDiv.classList.add("exam");
        examDiv.innerHTML = `
          <h3>${exam.name}</h3>
          <p>Score: ${exam.score}</p>
          <p>Status: ${exam.status}</p>
          <p>Time: ${exam.time}</p>
        `;

        // Hiển thị chi tiết kết quả cho mỗi kỳ thi
        exam.details.forEach(detail => {
          const detailDiv = document.createElement("div");
          detailDiv.classList.add("detail");
          detailDiv.innerHTML = `
            <h5>Question: ${detail.question}</h5>
            <p>Student's Answer: ${detail.answer}</p>
            <p>Correct Answer: ${detail.correctAnswer}</p>
            <p>Explanation: ${detail.explanation}</p>
          `;
          examDiv.appendChild(detailDiv);
        });

        studentDiv.appendChild(examDiv);
      });

      examResults.appendChild(studentDiv);
    }
  });
}

function exportToPdf() {
  // Tạo một instance của jsPDF
  const doc = new jsPDF();
  doc.setFontSize(8);
  let y = 10; // Điểm bắt đầu của dòng đầu tiên

  students.forEach(student => {
    // Tạo trang mới sau mỗi sinh viên
    doc.addPage();

    // Thêm thông tin sinh viên vào trang PDF
    doc.text(`Name: ${student.name} (${student.id})`, 10, y);
    y += 10;

    student.exams.forEach(exam => {
      // Kiểm tra xem nội dung đã đầy trang chưa
      if (y > 280) { // 280 là giới hạn chiều cao trang (tùy chỉnh theo kích thước trang của bạn)
        doc.addPage(); // Nếu đã đầy, thêm một trang mới
        y = 10; // Đặt lại điểm bắt đầu của dòng đầu tiên
      }

      doc.text(`Exam: ${exam.name}`, 10, y);
      y += 10;

      doc.text(`Score: ${exam.score}`, 20, y);
      y += 10;

      doc.text(`Status: ${exam.status}`, 20, y);
      y += 10;

      doc.text(`Time: ${exam.time}`, 20, y);
      y += 10;

      exam.details.forEach(detail => {
        doc.text(`Question: ${detail.question}`, 20, y);
        y += 10;

        doc.text(`Student's Answer: ${detail.answer}`, 20, y);
        y += 10;

        doc.text(`Correct Answer: ${detail.correctAnswer}`, 20, y);
        y += 10;

        doc.text(`Explanation: ${detail.explanation}`, 20, y);
        y += 10;
      });
    });

    // Thêm một dòng trống giữa các sinh viên
    y += 10;
  });

  // Tạo tệp PDF và tải xuống
  doc.save('exam_results.pdf');
}
// Lấy tham chiếu đến các phần tử DOM
const searchButton = document.getElementById("searchButton");
const exportBtn = document.getElementById("exportBtn");

// Đăng ký sự kiện click cho nút tìm kiếm
searchButton.addEventListener("click", function() {
  // Kiểm tra nếu input không trống thì hiển thị nút export
    exportBtn.style.display = "block";
});

document.getElementById('exportBtn').addEventListener('click', exportToPdf);


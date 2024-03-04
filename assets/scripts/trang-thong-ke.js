
document.addEventListener("DOMContentLoaded", function() {
  // Các dữ liệu mẫu cho bảng thống kê
  const data = [
    { id: 1, name: "Nguyen Van A", staticExam: "Tu do", totalAttempts: 5, completionRate: "80%", averageScore: 8.5, date: "2022-05-10" },
    { id: 2, name: "Tran Thi B", staticExam: "Thoi gian cu the", totalAttempts: 3, completionRate: "60%", averageScore: 6.5, date: "2022-06-15" },
    { id: 3, name: "Pham Van C", staticExam: "Tu do", totalAttempts: 7, completionRate: "70%", averageScore: 7.8, date: "2022-07-20" },
    { id: 4, name: "Le Thi D", staticExam: "Thoi gian cu the", totalAttempts: 4, completionRate: "90%", averageScore: 5.8, date: "2022-08-12" },
    { id: 5, name: "Hoang Van E", staticExam: "Thoi gian cu the", totalAttempts: 6, completionRate: "75%", averageScore: 8.2, date: "2022-09-05" },
    { id: 6, name: "Vo Thi F", staticExam: "Tu do", totalAttempts: 8, completionRate: "85%", averageScore: 5.9, date: "2022-10-18" },
    { id: 7, name: "Do Van G", staticExam: "Tu do", totalAttempts: 3, completionRate: "65%", averageScore: 6.7, date: "2022-11-21" },
    { id: 8, name: "Truong Thi H", staticExam: "Thoi gian cu the", totalAttempts: 5, completionRate: "78%", averageScore: 8.3, date: "2022-12-07" },
    { id: 9, name: "Nguyen Van I", staticExam: "Tu do", totalAttempts: 6, completionRate: "72%", averageScore: 8.0, date: "2023-01-14" },
    { id: 10, name: "Le Thi K", staticExam: "Thoi gian cu the", totalAttempts: 4, completionRate: "87%", averageScore: 8.6, date: "2023-02-28" }
];

  // Function để thêm dữ liệu vào bảng
  function populateTable(data) {
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = ""; // Xóa nội dung cũ của bảng trước khi thêm dữ liệu mới
      data.forEach((student, index) => {
          const row = `<tr class="student-row">
                          <td>${index + 1}</td>
                          <td>${student.name}</td>
                          <td>${student.staticExam}</td>
                          <td>${student.totalAttempts}</td>
                          <td>${student.completionRate}</td>
                          <td>${student.averageScore}</td>
                          <td>${student.date}</td>
                      </tr>`;
          
          tableBody.innerHTML += row;
      });
  }

  // Hiển thị dữ liệu mặc định khi trang được tải
  populateTable(data);

  // Lắng nghe sự kiện khi thay đổi lựa chọn trong dropdown
  document.getElementById("filter-select").addEventListener("change", function() {
      const selectedOption = this.value;
      const studentRows = document.querySelectorAll(".student-row");

      studentRows.forEach(function(row) {
          const examCell = row.querySelector("td:nth-child(3)"); // Lấy ô chứa thông tin về kỳ thi
          const examValue = examCell.textContent.trim(); // Lấy giá trị của ô chứa thông tin về kỳ thi và loại bỏ khoảng trắng ở hai đầu

          if (selectedOption === "Tất cả" || examValue === selectedOption) {
              row.style.display = "table-row";
          } else {
              row.style.display = "none";
          }
      });
  });

  // Hàm để tạo và tải xuống tệp PDF
  function exportToPDF() {
    var doc = new jsPDF('p', 'pt', 'a4');
    doc.setFont("Arial Unicode MS"); // Sử dụng font hỗ trợ Unicode
    const table = document.getElementById("report-table");
    const options = {
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
        styles: { fontSize: 8 },
        margin: { top: 20 },
        startY: 20,
        cellSpacing: 5,
    };

    doc.autoTable({ html: table, options });

    doc.save("report.pdf");
  }



  // Hàm để tạo và tải xuống tệp Excel
  function exportToExcel() {
      const htmlTable = document.getElementById("report-table");
      const ws = XLSX.utils.table_to_sheet(htmlTable);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "report.xlsx");
  }

  // Lắng nghe sự kiện khi nhấn nút xuất PDF
  document.getElementById("export-pdf").addEventListener("click", exportToPDF);

  // Lắng nghe sự kiện khi nhấn nút xuất Excel
  document.getElementById("export-excel").addEventListener("click", exportToExcel);

    // Hàm để vẽ biểu đồ phân phối điểm số
    function drawScoreDistributionChart(data) {
      const scores = data.map(student => student.averageScore);
      const ctx = document.getElementById('average-score-chart').getContext('2d');

      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: Array.from(Array(11).keys()), // Mảng từ 0 đến 10
              datasets: [{
                  label: 'Số lượng học sinh',
                  data: getScoreDistribution(scores),
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: 'Số lượng học sinh'
                      }
                  },
                  x: {
                      title: {
                          display: true,
                          text: 'Điểm số'
                      }
                  }
              }
          }
      });
  }

  // Hàm để tính phân phối điểm số
  function getScoreDistribution(scores) {
      const distribution = Array(11).fill(0); // Khởi tạo mảng chứa số lượng học sinh có điểm số từ 0 đến 10
      scores.forEach(score => {
          distribution[Math.floor(score)]++; // Tăng số lượng học sinh có điểm số tương ứng
      });
      return distribution;
  }

  // Hiển thị dữ liệu mặc định khi trang được tải
  populateTable(data);
  drawScoreDistributionChart(data);
});

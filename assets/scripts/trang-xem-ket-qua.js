// Bổ sung chức năng JavaScript cho trang

const examSelect = document.querySelector("select[name='exam_id']");
const studentSelect = document.querySelector("select[name='student_id']");
const resultElement = document.querySelector(".result");

// Lấy danh sách kỳ thi và sinh viên

const getExams = () => {
    // Gửi yêu cầu đến server để lấy danh sách kỳ thi

    // Sau khi nhận dữ liệu từ server, cập nhật select `examSelect`
};

const getStudents = () => {
    // Gửi yêu cầu đến server để lấy danh sách sinh viên

    // Sau khi nhận dữ liệu từ server, cập nhật select `studentSelect`
};

// Lấy kết quả của sinh viên

const getStudentResult = () => {
    const examId = examSelect.value;
    const studentId = studentSelect.value;

    // Gửi yêu cầu đến server để lấy kết quả của sinh viên

    // Sau khi nhận dữ liệu từ server, hiển thị kết quả trong `resultElement`

    resultElement.innerHTML = `
        <table>
            <tr>
                <th>Câu hỏi</th>
                <th>Đáp án</th>
                <th>Điểm</th>
            </tr>
            ${data.answers.map((answer) => `
                <tr>
                    <td>${answer.question}</td>
                    <td>${answer.answer}</td>
                    <td>${answer.score}</td>
                </tr>
            `).join("")}
            <tr>
                <th>Tổng điểm</th>
                <td></td>
                <td>${data.totalScore}</td>
            </tr>
        </table>
    `;
};

// Lắng nghe sự kiện thay đổi của select `examSelect`

examSelect.addEventListener("change", getStudents);

// Lắng nghe sự kiện thay đổi của select `studentSelect`

studentSelect.addEventListener("change", getStudentResult);

// Gọi getExams() và getStudents() lần đầu tiên

getExams();
getStudents();

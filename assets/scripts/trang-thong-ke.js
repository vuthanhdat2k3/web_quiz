// Bổ sung chức năng JavaScript cho trang

const filter = document.querySelector(".filter select");
const totalExamsElement = document.getElementById("total-exams");
const completedExamsElement = document.getElementById("completed-exams");
const completionRateElement = document.getElementById("completion-rate");
const averageScoreElement = document.getElementById("average-score");
const chartCanvas = document.getElementById("chart");

// Lấy dữ liệu thống kê từ server
// Ví dụ: sử dụng Ajax

const fetchData = () => {
    const selectedFilter = filter.value;

    // Gửi yêu cầu đến server với filter được chọn

    // Sau khi nhận dữ liệu từ server, cập nhật các phần tử trên trang

    totalExamsElement.textContent = data.totalExams;
    completedExamsElement.textContent = data.completedExams;
    completionRateElement.textContent = `${data.completionRate}%`;
    averageScoreElement.textContent = data.averageScore;

    // Cập nhật biểu đồ
    // Sử dụng thư viện Chart.js để vẽ biểu đồ

    const ctx = chartCanvas.getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.labels,
            datasets: [{
                label: "Số bài thi hoàn thành",
                data: data.completedExamsData,
                borderColor: "#000",
                backgroundColor: "#ccc",
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: data.totalExams,
                    },
                }],
            },
        },
    });
};

// Lắng nghe sự kiện thay đổi filter
// Gọi lại fetchData() khi filter thay đổi

filter.addEventListener("change", fetchData);

// Gọi fetchData() lần đầu tiên
fetchData();

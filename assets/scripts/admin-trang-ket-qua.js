function sort(columnIndex) {
  alert("Sort by column " + columnIndex);
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("products-datatable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[columnIndex];
      y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  setAttribute();
}

console.log(document.getElementById("products-datatable"));

function setAttribute() {
  var table = document.getElementById("products-datatable");
  for (var i = 1; i < table.rows.length - 1; i++) {
    if (i % 2 !== 0) {
      table.rows[i].classList.add("odd");
    } else {
      table.rows[i].classList.remove("odd");
    }
  }
}

setAttribute();

var ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['ATTT', 'CNTT', 'KT', 'ĐPT', 'MR', 'TT'],
    datasets: [{
      label: 'Lượng truy cập trong ngày',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("products-datatable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

var deleteButtons = document.getElementsByClassName('delete-user');

// Thêm sự kiện click vào mỗi nút xóa
for (var i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', function () {
    // Xóa hàng chứa nút xóa đã được nhấp
    this.parentNode.parentNode.parentNode.remove();
    
  });
};

//Thêm thông tin 
// Lấy tất cả các exams
fetch('http://localhost:3000/api/v1/listExam',{
  method: "GET"
}) // Gửi yêu cầu GET đến endpoint '/listExam'
  .then(response => {
    if (!response.ok) {
      throw new Error('Lỗi lấy dữ liệu từ máy chủ'); // Ném ra một lỗi nếu không nhận được phản hồi 200 OK
    }
    return response.json(); // Chuyển đổi phản hồi thành JSON
  })
  .then(exams => {
    // Xử lý dữ liệu nhận được từ máy chủ
    if (exams.length > 0) {
      exams.forEach(exam => {
        var examName = exam.examName;
        //Lay contest
        fetch(`http://localhost:3000/api/v1/contests/${examName}`,{
          method: "GET"
        }) // Gửi yêu cầu GET đến endpoint '/contests/{examName}'
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi lấy dữ liệu từ máy chủ'); // Ném ra một lỗi nếu không nhận được phản hồi 200 OK
            }
            return response.json(); // Chuyển đổi phản hồi thành JSON
        })
        .then(contests => {
            // Xử lý dữ liệu nhận được từ máy chủ
            if (Array.isArray(contests)) {
                if (contests.length > 0) {
                    //
                    
                    var results = {};

                    // Lặp qua danh sách các cuộc thi để tính số lần thi và điểm trung bình của từng sinh viên
                    contests.forEach(contest => {
                        var maSV = contest.maSV;
                        var diem = contest.score;

                        // Nếu mã sinh viên đã tồn tại trong đối tượng results
                        if (results.hasOwnProperty(maSV)) {
                            // Cập nhật thông tin của sinh viên
                            results[maSV].soLanThi++;
                            results[maSV].tongDiem += diem;
                        } else {
                            // Nếu mã sinh viên chưa tồn tại trong đối tượng results, thêm mới
                            results[maSV] = {
                                soLanThi: 1,
                                tongDiem: diem,
                                fullName: contest.fullName,
                                examName: contest.examName,                      
                            };
                        }
                    });
                    for(var maSV in results){
                      if (results.hasOwnProperty(maSV)){
                        var newStudent = {
                          name: results[maSV].fullName,
                          code: maSV,
                          status: results[maSV].examName,
                          semester: results[maSV].soLanThi,
                          percentage: `${results[maSV].tongDiem / results[maSV].soLanThi * 10}%`,
                          grade: results[maSV].tongDiem / results[maSV].soLanThi,
                          result: results[maSV].tongDiem /results[maSV].soLanThi >= 5 ? "Qua môn" : "Trượt"
                        };
                        addRow();
                      }
                    }
                    
                    function addRow() {
                      var tbody = document.querySelector('tbody'); // Lấy phần tử tbody của bảng
                    
                      // Tạo một hàng mới
                      var newRow = document.createElement('tr');
                    
                      // Tạo và thêm các ô dữ liệu vào hàng mới
                      newRow.innerHTML = `
                          <td>${newStudent.name}</td>
                          <td class="table-user">${newStudent.code}</td>
                          <td>${newStudent.status}</td>
                          <td>${newStudent.semester}</td>
                          <td>${newStudent.percentage}</td>
                          <td>${newStudent.grade}</td>
                          <td><span class="badge bg-success">${newStudent.result}</span></td>
                      `;
                    
                      // Thêm hàng mới vào phần tử tbody
                      tbody.appendChild(newRow);
                    }

                    
                } else {
                    console.log('Không có cuộc thi nào cho kỳ thi có tên:', examName);
                }
            } else {
                console.log('Dữ liệu không hợp lệ.');
            }
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi:', error); // Bắt và xử lý lỗi nếu có
        });

      });
    } else {
      console.log('Không có exams.');
    }
  })
  .catch(error => {
    console.error('Đã xảy ra lỗi:', error); // Bắt và xử lý lỗi nếu có
  });


  function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
  
    // Create download link element
    downloadLink = document.createElement("a");
  
    document.body.appendChild(downloadLink);
  
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

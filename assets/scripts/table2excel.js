function exportToExcel(tableId, filename = 'data') {
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll('tr');

  // Tạo một mảng chứa dữ liệu của bảng, bao gồm cả dữ liệu từ thead và tbody
  const data = [];
  rows.forEach(row => {
      const rowData = [];
      row.querySelectorAll('td, th').forEach(cell => {
          rowData.push(cell.innerText);
      });
      data.push(rowData);
  });

  // Tạo một workbook mới
  const workbook = XLSX.utils.book_new();
  
  // Tạo một worksheet mới và gán dữ liệu
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Thêm worksheet vào workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Xuất workbook thành file Excel
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

// Sử dụng hàm để xuất dữ liệu từ bảng có id là "example-table" vào một tệp Excel có tên "data"


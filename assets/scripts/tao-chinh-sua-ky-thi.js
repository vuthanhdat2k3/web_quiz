document.getElementById('excelFileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, {type: 'array'});
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

      displayQuestions(jsonData);
  };
  reader.readAsArrayBuffer(file);
});

function displayQuestions(data) {
  const questionList = document.getElementById('questionList');
  questionList.innerHTML = '';

  data.forEach(row => {
      const question = document.createElement('div');
      question.textContent = row[0]; // Assuming the question is in the first column

      const options = row.slice(1); // Assuming options start from the second column
      options.forEach((option, index) => {
          const label = document.createElement('label');
          label.textContent = `Đáp án ${String.fromCharCode(65 + index)}: `;
          const input = document.createElement('input');
          input.type = 'radio';
          input.name = `question-${data.indexOf(row)}`;
          input.value = option;
          label.appendChild(input);
          label.appendChild(document.createTextNode(option));
          question.appendChild(label);
      });

      questionList.appendChild(question);
  });
}


const sampleCSV = 'A,B,C\n,,\n,B,D\n"a,a","b",';

(() => {
    const csvInputTextarea = $('#csv-input'),
        csvOutputDiv = $('#csv-output'),
        completeBtn = $('#complete-btn'),
        showExampleBtn = $('#show-example-btn');

    function showExample() {
        csvInputTextarea.val(sampleCSV);
        complete();
    }

    function complete() {
        const csvInput = csvInputTextarea.val();
        const data = parseCSV(csvInput);
        completeColumns(data);
        csvOutputDiv.html(exportCSV(data));
    }
    
    showExampleBtn.on('click', showExample);
    completeBtn.on('click', complete);
})();

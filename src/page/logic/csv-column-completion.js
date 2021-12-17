function parseCSV(rawData, delimiter) {
    // Modified versino of the CSV parse function from
    // https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm

    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    delimiter = delimiter || ",";

    // Create a regular expression to parse the CSV values.
    const objPattern = new RegExp((
            "(\\" + delimiter + "|\\r?\\n|\\r|^)" + // delimiters
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + // quoted fields
            "([^\"\\" + delimiter + "\\r\\n]*))" // standard fields
        ), "gi");

    const parsedData = [[]];
    let arrMatches = null;

    // Keep looping over the regular expression matches until we can no longer find a match.
    while (arrMatches = objPattern.exec(rawData)) {

        // Get the delimiter that was found.
        const matchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know that this delimiter is a row delimiter.
        if (matchedDelimiter.length && matchedDelimiter != delimiter) {
            // Since we have reached a new row of data, add an empty row to our data array.
            parsedData.push([]);
        }

        // Now that we have our delimiter out of the way, let's check to see which kind 
        // of value we captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }

        // Now that we have our value string, let's add it to the data array.
        parsedData[parsedData.length - 1].push(strMatchedValue);
    }

    return parsedData;
}


function completeColumns(parsedData) {
    // Completes empty cells with the closest value found above in the respective column
    // Modifies the argument in-place

    if (parsedData.length <= 1) {
        return parsedData;
    }

    let lastRow = parsedData[0];

    for (let rowIdx = 1; rowIdx < parsedData.length; rowIdx++) {
        const row = parsedData[rowIdx];
        for (let colIdx = 0; colIdx < row.length && colIdx < lastRow.length; colIdx++) {
            if (isEmptyCell(row[colIdx])) {
                row[colIdx] = lastRow[colIdx]
            }
        }
        lastRow = row;
    }
}


function isEmptyCell(cellValue) {
    return !cellValue
}


function exportCSV(parsedData) {
    let csv = '';
    
    for (let rowIdx = 0; rowIdx < parsedData.length; rowIdx++) {
        csv += rowToCSV(parsedData[rowIdx]) + '\n';
    }

    return csv;
}


function rowToCSV(row) {
    const delimiter = ',';

    let csv = '';
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
        let cell = (row[colIdx] === null) ? '' : row[colIdx].toString();
        cell = cell.replace(/"/g, '""');

        if (cell.search(/("|,|\n)/g) >= 0) {
            cell = '"' + cell + '"';
        }
        if (colIdx > 0) {
            csv += ',';
        }
        csv += cell;
    }
    return csv
}

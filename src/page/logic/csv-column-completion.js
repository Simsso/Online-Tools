function parseCSV(rawData, strDelimiter) {
    // Modified versino of the CSV parse function from
    // https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm

    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = strDelimiter || ",";

    // Create a regular expression to parse the CSV values.
    const objPattern = new RegExp((
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + // delimiters
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + // quoted fields
            "([^\"\\" + strDelimiter + "\\r\\n]*))" // standard fields
        ), "gi");

    const parsedData = [[]];
    let arrMatches = null;

    // Keep looping over the regular expression matches until we can no longer find a match.
    while (arrMatches = objPattern.exec(rawData)) {

        // Get the delimiter that was found.
        const strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
            // Since we have reached a new row of data, add an empty row to our data array.
            parsedData.push([]);
        }

        // Now that we have our delimiter out of the way, let's check to see which kind 
        // of value we captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture this value, unescape any double quotes.
            let strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            let strMatchedValue = arrMatches[3];
        }

        // Now that we have our value string, let's add it to the data array.
        parsedData[parsedData.length - 1].push(strMatchedValue);
    }

    return parsedData;
}

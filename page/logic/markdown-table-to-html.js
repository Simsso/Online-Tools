const alignments = ['left', 'center', 'right'];

function mdTableToHTML(md) {
	var lines = getLines(md);
    var isHeader = true;
    var table = new HTMLTable();
    var colAlignments = [];
    lines.forEach(function(line) {
        if (isHeaderSeparation(line)) {
            isHeader = false;
            colAlignments = getAlignment(line);
            return;
        }
        var vals = splitLine(line);
        table.addRow(vals, isHeader);
    });
    table.setAlignments(colAlignments);
    return {
    	html: table.getHTML(),
    	htmlString: table.getHTMLString()
    }
}

function getLines(doc) {
	return doc.replace(/\r\n/g,"\n").split("\n")
}

function isHeaderSeparation(line) {
	let match = line.match(/(\|\s*(:)?\s*-{3,}\s*(:)?\s*)+\|/g);
	if (!Array.isArray(match)) return false;
	return match.length > 0;
}

function getAlignment(headerLine) {
	let parts = splitLine(headerLine);

	return parts.map(col => {
		if (col.length === 0) return alignments[0];
		let firstChar = col.charAt(0),
			lastChar = col.slice(-1);
		if (firstChar === ':' && lastChar === ':') return alignments[1];
		if (lastChar === ':') return alignments[2];
		return alignments[0];
	})
}

function getStyleAttribute(alignment) {
	if (alignment === alignments[0]) return '';
	return ' style="text-align: ' + alignment + ';"';
}

function splitLine(line) {
	return line.split('|').map(x => x.trim()).filter(x => x.length > 0)
}

function HTMLTable() {
    this.ths = [];
    this.tds = [];
    this.alignments = [];

    this.getHTMLString = function() {
    	let newline = '\n';
        return "<table>" + newline +
            this.ths.map((x) => { return this.getRow(x, 'th'); }, this).join(newline) + newline +
            this.tds.map((x) => { return this.getRow(x, 'td'); }, this).join(newline) + newline +
            "</table>"
    };

    this.getHTML = function() {
        return '<table class="table">' +
            this.ths.map((x, index) => { return this.getRow(x, 'th'); }, this).join('') +
            this.tds.map((x, index) => { return this.getRow(x, 'td'); }, this).join('') +
            '</table>'
    };

    this.getRow = function(vals, tag) {
        return "<tr>" + vals.map((x, index) => { return "<" + tag + getStyleAttribute(this.getAlignment(index)) + ">" + x + "</" + tag + ">"}).join('') + "</tr>";
    };

    this.addRow = function(vals, isHeader) {
        if (isHeader) {
            this.ths.push(vals);
        }
        else {
            this.tds.push(vals);
        }
    };

    this.setAlignments = function(alignments) {
    	this.alignments = alignments;
    };

    this.getAlignment = function(colIndex) {
    	if (this.alignments.length <= colIndex) return alignments[0];
    	return this.alignments[colIndex];
    }
}
function countWords(s) {
	if (s.length === 0) return 0;
    s = s.replace(/(^\s*)|(\s*$)/gi,""); // exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," "); // two or more space to one
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    s = s.replace(/\n/," ");
    return s.split(' ').length; 
}


function countChars(s) {
	return s.length;
}


function countParagraphs(s) {
	if (s.length === 0) return 0;
	return s.match(/(\n\n?|^).*?(?=\n\n?|$)/g).length;
}

function countSentences(s) {
	if (s.length === 0) return 0;
	return s.match(/[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g).length;
}

function countUniqueWords(s) {
	if (s.length === 0) return 0;
    s = s.replace(/(^\s*)|(\s*$)/gi,""); // exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," "); // two or more space to one
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    var words =  s.split(' ');

    var foundWords = {};

    for (var i = 0; i < words.length; i++) {
    	var pos = -1; 
    	for (var key in foundWords) {
    		pos++;
    		if (key === words[i]) 
    			break;
    	}

    	if (pos === -1) {
    		foundWords[words[i]] = 1;
    	}
    	else {
    		foundWords[words[i]]++;
    	}
    }

    var count = 0;
    for (var key in foundWords) {
	    if (foundWords.hasOwnProperty(key)) {
	       count++;
	    }
	}

	return count;
}
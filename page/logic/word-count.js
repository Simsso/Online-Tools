function countWords (s) {
	if (s.length === 0) return 0;
    s = s.replace(/(^\s*)|(\s*$)/gi,""); // exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," "); // two or more space to one
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    return s.split(' ').length; 
}
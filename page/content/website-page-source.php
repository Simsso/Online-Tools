<style type="text/css">

	#page-source-output {
	    word-break: break-word;
	    font-size: initial;
	    font-family: monospace;
	    white-space: pre-wrap;
	    border-spacing: 0px;
	    margin-bottom: 15px;
	}

	/* line number */
	#page-source-output td:first-child {
		text-align: right;
	    color: rgb(128, 128, 128);
	    word-break: normal;
	    white-space: nowrap;
	    font-size: 9px;
	    font-family: Arial;
	    box-sizing: border-box;
	    -webkit-user-select: none;
	    padding: 0px 5px;
	    border-right: 1px solid rgb(187, 187, 187);
	}

	/* HTMl code */
	#page-source-output td:last-child {
		padding: 0 5px;
	}
</style>

<div class="form-inline form-group">
	<div class="input-group">
		<div class="input-group-addon">http://</div>
		<input type="text" id="input-url" class="form-control" autofocus="autofocus" placeholder="tools.timodenk.com" />
	</div>
	
	<button type="button" class="btn btn-primary" id="request-page-source" disabled="disabled">Load</button>
</div>

<p class="bg-info padding-15px hide" id="loading-message">Loading page source...</p>
<p class="bg-warning padding-15px hide" id="error-message">An error occured.</p>

<table id="page-source-output"></table>
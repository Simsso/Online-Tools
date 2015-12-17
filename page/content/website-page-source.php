<div class="clearfix form-group">
	<div class="col-xs-8 col-sm-6 input-group pull-left">
		<div class="input-group-addon">http://</div>
		<input type="text" id="input-url" class="form-control" autofocus="autofocus" placeholder="tools.timodenk.com" />
	</div>
	
	<div class="col-xs-3 col-sm-3">
		<button type="button" class="btn btn-primary" id="request-page-source" disabled="disabled">Load</button>
	</div>
</div>

<p class="bg-info padding-15px hide" id="loading-message">Loading page source...</p>
<p class="bg-warning padding-15px hide" id="error-message">An error occured.</p>

<div id="page-source-output" class="white-space-pre-wrap"></div>
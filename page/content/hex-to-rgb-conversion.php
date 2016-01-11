<div class="clearfix form-group">
	<div class="col-xs-8 col-sm-6 input-group pull-left">
		<div class="input-group-addon">#</div>
		<input type="text" id="input-hex" class="form-control" autofocus="autofocus" />
	</div>
	
	<div class="col-xs-3 col-sm-3">
		<button type="button" class="btn btn-primary" id="add-to-history" disabled="disabled">
			<img src="/img/ic_add_white.svg" class="icon" />
			History
		</button>
	</div>
</div>

<div class="clearfix form-group">
	<div id="color-preview" class="color-preview pull-left"></div>
	<h2 id="rgb-output">&nbsp;</h2>
</div>

<p>
	<a href="/?p=rgb-to-hex-conversion" target="_blank">
		<button type="button" class="btn btn-default">
			RGB to HEX conversion
		</button>
	</a>
</p>

<div>
	<table class="table table-nonfluid hide" id="history-table">
		<thead>
			<tr>
				<th></th>
				<th>HEX</th>
				<th>RGB</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>
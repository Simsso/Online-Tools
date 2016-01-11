<div class="clearfix form-group">
	<div class="col-xs-9 col-sm-6 input-group pull-left">
		<div class="input-group-addon">R</div>
		<input type="number" id="input-r" min="0" max="255" class="form-control" autofocus="autofocus" />
		<div class="input-group-addon middle">G</div>
		<input type="number" id="input-g" min="0" max="255" class="form-control" />
		<div class="input-group-addon middle">B</div>
		<input type="number" id="input-b" min="0" max="255" class="form-control" />
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
	<h2 id="hex-output">&nbsp;</h2>
</div>

<p>
	<a href="/?p=hex-to-rgb-conversion" target="_blank">
		<button type="button" class="btn btn-default">
			HEX to RGB conversion
		</button>
	</a>
</p>

<div>
	<table class="table table-nonfluid hide" id="history-table">
		<thead>
			<tr>
				<th></th>
				<th>RGB</th>
				<th>HEX</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>
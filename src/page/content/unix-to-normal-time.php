<div class="clearfix">
	<div class="col-xs-8 col-sm-6 input-group pull-left">
		<div class="input-group-addon">Unix timestamp</div>
		<input type="number" id="user-input-unix-time" class="form-control" autofocus="autofocus" />
	</div>
	
	<div class="col-xs-3 col-sm-3">
		<button type="button" class="btn btn-primary" id="add-to-history" disabled="disabled">
			<img src="/img/ic_add_white.svg" class="icon" />
			History
		</button>
	</div>
</div>

<h2 id="normal-time-output">&nbsp;</h2>

<div>
	<table class="table table-nonfluid hide" id="history-table">
		<thead>
			<tr>
				<th>Unix</th>
				<th>Normal</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>
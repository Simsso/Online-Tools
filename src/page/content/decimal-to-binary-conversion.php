<div class="clearfix">
	<div class="col-xs-8 col-sm-6 input-group pull-left">
		<div class="input-group-addon">Number</div>
		<input type="number" id="user-input-number" class="form-control" autofocus="autofocus" />
		<div class="input-group-addon">Decimal</div>
	</div>
	
	<div class="col-xs-3 col-sm-3">
		<button type="button" class="btn btn-primary" id="add-to-history" disabled="disabled">
			<img src="/img/ic_add_white.svg" class="icon" />
			History
		</button>
	</div>
</div>

<h2 id="binary-output">&nbsp;</h2>

<div>
	<table class="table table-nonfluid hide" id="history-table">
		<thead>
			<tr>
				<th>Decimal</th>
				<th>Binary</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>
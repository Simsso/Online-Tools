<div class="container">
	<div class="row">
		<div class="col-sm-4 margin-bottom-5px">
			<div class="input-group">
				<div class="input-group-addon">Date</div>
				<input type="date" id="user-input-date" class="form-control" autofocus="autofocus" />
			</div>
		</div>
		<div class="col-sm-4 margin-bottom-5px">
			<div class="input-group">
				<div class="input-group-addon">Time</div>
				<input type="time" id="user-input-time" class="form-control" step="1" />
			</div>
		</div>
		<div class="col-sm-2 margin-bottom-5px">
			<button type="button" class="btn btn-primary" id="add-to-history" disabled="disabled">
				<img src="/img/ic_add_white.svg" class="icon" />
				History
			</button>
		</div>
	</div>
</div>

<h2 id="unix-time-output">&nbsp;</h2>

<div>
	<table class="table table-nonfluid hide" id="history-table">
		<thead>
			<tr>
				<th>Normal</th>
				<th>Unix</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>
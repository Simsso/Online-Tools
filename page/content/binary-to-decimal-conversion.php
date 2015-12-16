<div class="clearfix">
	<div class="col-xs-8 col-sm-6 input-group pull-left">
		<div class="input-group-addon">Number</div>
		<input type="number" id="user-input-number" class="form-control" autofocus="autofocus" />
		<div class="input-group-addon">Binary</div>
	</div>
	
	<div class="col-xs-3 col-sm-3">
		<button type="button" class="btn btn-primary" id="add-to-history" disabled="disabled">
			Add to history
		</button>
	</div>
</div>

<h2 id="decimal-output">&nbsp;</h2>

<p>
	<a href="/?p=decimal-to-binary-conversion" target="_blank">
		<button type="button" class="btn btn-default">
			Decimal to binary conversion
		</button>
	</a>
</p>

<div>
	<table class="table table-nonfluid hide" id="history-table">
		<thead>
			<tr>
				<th>Binary</th>
				<th>Decimal</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>
<div>
	<a href="https://github.com/Simsso/Online-Tools/blob/master/page/logic/binary-to-decimal-conversion.js" target="_blank">JavaScript source code</a>
</div>
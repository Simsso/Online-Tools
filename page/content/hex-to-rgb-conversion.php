<div class="clearfix">
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

<h2 id="rgb-output">&nbsp;</h2>

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
				<th>HEX</th>
				<th>RGB</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>

<div class="text-info">
	<h3>RGB color model</h3>
	<p>
		The RGB color model is an additive color model in which red, green, and blue light are added together in various ways to reproduce a broad array of colors. The name of the model comes from the initials of the three additive primary colors, red, green, and blue. <a href="https://en.wikipedia.org/wiki/RGB_color_model" target="_blank">Read more</a>
	</p>
</div>
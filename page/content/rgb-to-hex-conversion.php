<h1>RGB to HEX conversion</h1>
<p class="lead">This tool converts a RGB-color into HEX notation.</p>

<div class="clearfix">
	<div class="col-xs-9 col-sm-6 input-group pull-left">
		<div class="input-group-addon">R</div>
		<input type="number" id="input-r" min="0" max="255" class="form-control" autofocus="autofocus" />
		<div class="input-group-addon">G</div>
		<input type="number" id="input-g" min="0" max="255" class="form-control" />
		<div class="input-group-addon">B</div>
		<input type="number" id="input-b" min="0" max="255" class="form-control" />
	</div>
	
	<div class="col-xs-3 col-sm-3">
		<button type="button" class="btn btn-primary" id="add-to-history" disabled="disabled">
			Add to history
		</button>
	</div>
</div>

<h2 id="hex-output">&nbsp;</h2>

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
				<th>RGB</th>
				<th>HEX</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>

<div>
	<a href="https://github.com/Simsso/Online-Tools/blob/master/page/logic/rgb-to-hex-conversion.js" target="_blank">JavaScript source code</a>
</div>

<div class="text-info">
	<h3>RGB color model</h3>
	<p>
		The RGB color model is an additive color model in which red, green, and blue light are added together in various ways to reproduce a broad array of colors. The name of the model comes from the initials of the three additive primary colors, red, green, and blue. <a href="https://en.wikipedia.org/wiki/RGB_color_model" target="_blank">Read more</a>
	</p>
</div>
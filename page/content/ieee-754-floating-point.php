<style type="text/css">
	.output-table {
		margin: 20px 0;
		-webkit-font-feature-settings: 'tnum';
	    -moz-font-feature-settings: 'tnum';
	    -ms-font-feature-settings: 'tnum';
	}

	.output-row td {
		padding: 0 2px 0 4px;
	}

	.byte-marker-row td {
		border-top: 1px solid #ccc;
	}

	.byte-marker-row td:not(:first-child) {
		border-left: 1px solid #ccc;
	}

	tr.byte-marker-row td {
	    text-align: center;
	    font-size: 60%;
	    color: #888;
	}

	.mantissa {
		background-color: #ccf;
	}

	.exponent {
		background-color: #cfc;
	}

	.sign {
		background-color: #fcc;
	}

	.output-row td span {
		display: block;
		float: left;
	}

	.legend {
		padding: 15px 0 0;
	}

	.legend span {
		padding: 8px;
	}

	#string-output {
		margin-bottom: 0;
	}

	#string-output-caption {
		font-size: 80%;
		color: #444;
		font-style: italic;
		margin-bottom: 15px;
	}

	/* Small devices (tablets, @screen-sm-min and up) */
	@media (max-width: 767px) {
		.output-row td, .byte-marker-row td {
		    float: left;
		    width: 25%;
		    display: block;
		}
	}

	/* Large devices only (large desktops, @screen-lg-min) */
	@media (min-width: 992px) { 
		.output-row td span {
		    font-size: 12pt;
		    padding: 0 0.5px;
		}
	}
</style>

<p class="bg-info padding-15px">This tool requires an up-to-date browser because it makes use of several new JavaScript functions. If you are experiencing any problems, please consider upgrading to the latest version of your browser.</p>

<div class="form-inline">
	<div class="input-group">
		<div class="input-group-addon">Input number</div>
		<input type="text" id="input-float" class="form-control" autofocus="autofocus" />
	</div>

	<select class="form-control" id="special-input-value">
		<option value="number">Number</option>
		<option value="positive-0">Positive Zero</option>
		<option value="negative-0">Negative Zero</option>
		<option value="positive-inf">Positive infinity</option>
		<option value="negative-inf">Negative infinity</option>
		<option value="nan" selected>Not a number (NaN)</option>
	</select>
</div>

<h2 id="string-output"></h2>
<div id="string-output-caption">JavaScript toString()</div>

<h3>Float representation (32 bit)</h3>
<table id="float-output-table" class="output-table">
	<tr id="float-output-row" class="output-row"><td></td><td></td><td></td><td></td></tr>
	<tr class="byte-marker-row"><td>1</td><td>2</td><td>3</td><td>4</td></tr>
</table>

<h3>Double representation (64 bit)</h3>
<table id="double-output-table" class="output-table">
	<tr id="double-output-row" class="output-row"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
	<tr class="byte-marker-row"><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
</table>

<p class="legend"><span class="sign">Sign</span> <span class="exponent">Exponent</span> <span class="mantissa">Mantissa</span></p>
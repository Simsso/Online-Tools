<style type="text/css">
	#previewCanvas {
		border: 1px solid #DDD;
		background-color: #EEF;
		width: 300px;
		height: 300px;
		max-width: 100%;
	}

	#output {
		font-style: monospace;
	}
</style>

<p class="bg-info padding-15px">
	Click on the light blue canvas below, to add new points.
</p>
<div class="row">
	<div class="col-xs-12 col-sm-6 col-md-4">
		<h3>Canvas</h3>
		<canvas id="previewCanvas" width="300px" height="300px"></canvas>	
	</div>
	<div class="col-xs-12 col-sm-6 col-md-4">
		<h3>Settings</h3>
		<div class="form-group">
			<div class="input-group">
				<div class="input-group-addon">Separator</div>
				<input type="text" id="input-separator" class="form-control" value=";">
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<div class="input-group-addon">Decimals</div>
				<input type="number" id="input-decimals" class="form-control" value="5" min="0" max="20">
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<div class="input-group-addon">ID offset</div>
				<input type="number" id="input-id-offset" class="form-control" value="0">
			</div>
		</div>
		<div class="form-group">
			<label><input type="checkbox" id="input-show-point-id" checked> Show point ID (1, 2, ...)</label>
		</div>
		<div class="form-group">
			<label><input type="checkbox" id="input-in-parentheses" checked> Show point in parentheses</label>
		</div>
		<div class="form-group">
			<input type="button" class="btn btn-default" value="Reset points" id="btn-reset" />
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-4">
		<h3>Points</h3>
		<div id="output"></div>
	</div>
</div>
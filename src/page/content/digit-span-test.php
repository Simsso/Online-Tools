<style type="text/css">
	#primary-progress-bar {
		height: 5px;
		float: none;
		margin-bottom: 2px;
	}

	audio.audio-preload {
		display: none;
	}
</style>

<div class="row">
	<div class="col-xs-12">
		<div class="bg-info padding-15px" id="info-output"></div>
	</div>
	<div class="col-xs-12 text-center">
		<h2 id="sequence-preview">&nbsp;</h2>
	</div>
	<div class="col-xs-12 col-sm-4 col-sm-offset-4">
		<div class="form-group">
			<div id="primary-progress-bar" class="progress-bar"></div>
			<input id="primary-input" type="number" class="form-control text-center" disabled="disabled">
		</div>
		<h4 id="sequence-length" class="text-center">&nbsp;</h4>
	</div>
	<div class="col-xs-12 text-center margin-bottom-15px">
		<button id="primary-btn" type="button" class="btn btn-primary btn-lg" disabled="disabled">Start</button>
		<button id="repeat-btn" type="button" class="btn btn-default btn-lg" disabled="disabled">Repeat</button>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-4">
		<h4>Settings</h4>
		<div class="checkbox">
			<label>
				<input id="audio-enabled" type="checkbox" checked="checked"> Sound enabled
			</label>
		</div>
		<div class="form-group">
			<label for="speed-millis">Speed (milliseconds per digit)</label>
			<div class="input-group">
				<input id="speed-millis" type="number" class="form-control" min="1" step="100" placeholder="1000" value="1000">
				<div class="input-group-addon">ms</div>
			</div>
		</div>
		<div class="form-group">
			<label for="starting-length">Starting sequence length</label>
			<div class="input-group">
				<input id="starting-length" type="number" min="1" step="1" class="form-control" placeholder="4" value="4">
				<div class="input-group-addon">symbols</div>
			</div>
		</div>
	</div>
</div>
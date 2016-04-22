<!-- load scripts before content -->
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    jax: ["input/TeX","output/HTML-CSS"],
    displayAlign: "left"
  });
</script>
<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"></script>

<link rel="stylesheet" type="text/css" href="http://jsxgraph.uni-bayreuth.de/distrib/jsxgraph.css" />
<script type="text/javascript" src="http://jsxgraph.uni-bayreuth.de/distrib/jsxgraphcore.js"></script>


<style type="text/css">
	#visualization {
		position: relative;
		width: 450px; 
		height: 450px;
	}

	#equation-output td {
    	padding: 5px 0;
	}
</style>


<p class="bg-info padding-15px">Syntax for entering a set of points: <code>Spaces</code> separate x- and y-values of a point and a <code>Newline</code> distinguishes the next point. Hit the button <i>Show example</i> to see a demo.</p>

<div class="form-group">
	<textarea id="user-input" class="form-control" autofocus="autofocus"></textarea>
</div>

<div class="form-group">
	<button class="btn btn-primary" id="interpolate" disabled="disabled">Interpolate</button>
	<button class="btn btn-default" id="show-example">Show example</button>
</div>

<p class="bg-warning padding-15px hide" id="error-msg"></p>

<div id="output" class="hide">
	<h3>Points</h3>
	<div id="point-output"></div>
	
	<h3>Equation</h3>
	<div class="margin-bottom-15px" id="equation-output"></div>

	<div class="clearfix form-group">
		<div class="col-xs-6 col-sm-4 input-group pull-left">
			<div class="input-group-addon">x-value</div>
			<input type="text" id="input-x" class="form-control" />
		</div>
	</div>
	<div class="margin-bottom-15px" id="y-value-output"></div>

	<h3>Graph</h3>
	<div id="visualization" class="margin-bottom-15px"></div>
	<label><input id="keepAspectRatioInput" type="checkbox" />&nbsp;keep aspect ratio</label>
</div>
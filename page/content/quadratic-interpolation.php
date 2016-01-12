<style type="text/css">
	#visualization {
		width: 100%;
		height: 200px;
	}

	#equation-output td {
    	padding: 5px 0;
	}

	svg line {
		stroke: red;
		stroke-width: 2px;
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

<div id="output" class="hide">
	<h3>Points</h3>
	<div id="point-output"></div>
	
	<h3>Equation</h3>
	<div class="margin-bottom-15px" id="equation-output"></div>

	<!--<h3>Graph</h3>
	<svg id="visualization" class="margin-bottom-15px"></svg>-->
</div>

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    jax: ["input/TeX","output/HTML-CSS"],
    displayAlign: "left"
  });
</script>

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"></script>
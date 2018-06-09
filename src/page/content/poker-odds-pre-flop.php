<style type="text/css">
.btn[data-suit] {
	font-size: 23px;
    padding: 0px 12px;
}
.btn[data-suit="d"]:not(.btn-primary), .btn[data-suit="h"]:not(.btn-primary) {
	color: red;
}
</style>

<h3>Starting Hand 1</h3>
<div id="starting-hand-1-picker"></div>

<h3>Starting Hand 2</h3>
<div id="starting-hand-2-picker"></div>

<h3>Odds</h3>
<p id="invalid-msg" class="bg-danger padding-15px" style="display: none; ">The hand selection is invalid. All cards must differ.</p>
<p id="error-msg" class="bg-danger padding-15px" style="display: none; ">A error occurred. This is either caused by the internet connection or the odds-backend.</p>
<h5>Hand 1 wins: <span id="out-win"></span></h5>
<h5>Split: <span id="out-split"></span></h5>
<h5>Hand 2 wins: <span id="out-loss"></span></h5>
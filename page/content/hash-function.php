<div class="form-inline">

	<div class="input-group">
		<div class="input-group-addon">Value</div>
		<input type="text" id="input-value" class="form-control" autofocus="autofocus" />
	</div>

	<select id="input-algorithm" class="form-control">
		<!--<option value="" disabled selected>Algorithm</option>-->
		<?php
			$algos = hash_algos();
			for ($i = 0; $i < count($algos); $i++) {
				echo '<option value="' . $algos[$i] . '">' . $algos[$i] . '</option>';
			}
		?>
	</select>

	<button type="button" class="btn btn-primary" id="calculate-hash">Hash</button>
</div>

<p class="bg-warning padding-15px hide" id="error-message">An error occured.</p>

<h2 id="hash-output" class="break-word">&nbsp;</h2>

<div class="text-info">
	<h3>Hash function</h3>
	<p>
		A hash function is any function that can be used to map data of arbitrary size to data of fixed size. The values returned by a hash function are called hash values, hash codes, hash sums, or simply hashes. <a href="https://en.wikipedia.org/wiki/Hash_function" target="_blank">Read more</a>
	</p>
</div>
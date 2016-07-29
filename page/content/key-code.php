<div class="clearfix">
	<div class="col-xs-8 col-sm-6 input-group pull-left">
		<div class="input-group-addon">Press any key</div>
		<input type="text" id="user-input" class="form-control" autofocus="autofocus" />
	</div>
</div>

<h2 class="text-muted">KeyboardEvent.key = "<span class="text-primary key"></span>"</h2>
<h2 class="text-muted">KeyboardEvent.keyCode = "<span class="text-primary key-code"></span>"</h2>
<hr>
<p>The KeyboardEvent.key read-only property returns the value of a key or keys pressed by the user. Its value is determined as follows:</p>
<ul>
	<li>If the pressed key has a printed representation, the returned value is a non-empty Unicode character string containing the printable representation of the key.</li>
	<li>If the pressed key is a control or special character, the returned value is one of the pre-defined key values.</li>
	<li>If the KeyboardEvent represents the press of a dead key, the key value must be "Dead".</li>
	<li>If more than one key is pressed and the combination includes a modifier that makes the resulting keystroke non printing, the returned value is the printable character. For example, if the combination were Control + a, the letter "a" is returned.</li>
	<li>If the key cannot be identified, the returned value is "Unidentified".</li>
</ul>

<a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key" target="_blank">Example code</a>
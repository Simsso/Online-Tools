<div class="clearfix">
	<div class="col-xs-8 col-sm-6 input-group pull-left">
		<div class="input-group-addon">Unix timestamp</div>
		<input type="number" id="user-input-unix-time" class="form-control" autofocus="autofocus" />
	</div>
	
	<div class="col-xs-3 col-sm-3">
		<button type="button" class="btn btn-primary" id="add-to-history" disabled="disabled">
			Add to history
		</button>
	</div>
</div>

<h2 id="normal-time-output">&nbsp;</h2>

<div>
	<table class="table table-nonfluid hide" id="history-table">
		<thead>
			<tr>
				<th>Unix</th>
				<th>Normal</th>
			</tr>
		</thead>
		<tbody id="history">
		</tbody>
	</table>
</div>

<div>
	<a href="https://github.com/Simsso/Online-Tools/blob/master/page/logic/unix-to-normal-time.js" target="_blank">JavaScript source code</a>
</div>

<div class="text-info">
	<h3>Unix time</h3>
	<p>
		Unix time (also known as POSIX time or Epoch time) is a system for describing instants in time, defined as the number of seconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC), Thursday, 1 January 1970, not counting leap seconds. It is used widely in Unix-like and many other operating systems and file formats. Because it does not handle leap seconds, it is neither a linear representation of time nor a true representation of UTC. Unix time may be checked on most Unix systems by typing <code>date +%s</code> on the command line. <a href="https://en.wikipedia.org/wiki/Unix_time" target="_blank">Read more</a>
	</p>
</div>
<h1>Home</h1>
<p class="lead">This page is a collection of online tools.</p>

<p>
	<h3>All pages</h3>
	<ul>
		<?php
			$files = scandir('page/content');
			foreach ($files as $key => $value) {
				$name = substr($value, 0, -4);
				if (strlen($name) > 0) {
					echo '<li><a href="/?p=' . $name . '">' . $name . '</a></li>';
				}
			}
		?>
	</ul>
</p>	

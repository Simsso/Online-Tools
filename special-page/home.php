<h1>Home</h1>
<p class="lead">tools.timodenk.com is a collection of online tools.</p>

<h3>All tools</h3>
<div class="detailed-list-of-tools">
	<?php
		$files = scandir('page/content');
		foreach ($files as $key => $value) {
			$name = substr($value, 0, -4);
			if (strlen($name) > 0) {
				$meta_data = get_meta_data($name);
				echo '
					<div class="tool-info">
						<a href="/?p=' . $name . '">
							<div class="tool-name">
								' . (isset($meta_data->title) ? $meta_data->title : $name) . '
							</div>
							<div class="tool-description">
								' . (isset($meta_data->description) ? $meta_data->description : '') . '
							</div>
						</a>
					</div>';
			}
		}
	?>
</div>

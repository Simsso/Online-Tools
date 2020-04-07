<h1>Home</h1>
<p class="lead">tools.timodenk.com is a collection of online tools. It is being gradually expanded and open source.</p>

<?php
	$files = scandir('page/content');

	function tool_to_html($name) {
		$meta_data = get_meta_data($name);
		return '<div class="tool-info">
				<a href="/' . $name . '">
					<div class="tool-name">
						' . ((isset($meta_data->title) && strlen($meta_data->title) > 0) ? $meta_data->title : $name) . '
					</div>
					<div class="tool-description">
						' . (isset($meta_data->description) ? $meta_data->description : '') . '
					</div>
				</a>
			</div>';
	}
?>

<h3>Featured</h3>
<div class="detailed-list-of-tools">
	<?php
		$featured_names = ['cubic-spline-interpolation', 'digit-span-test', 'piano-note-practice', 'text-to-morse-code'];
		foreach ($featured_names as $name) {
			echo tool_to_html($name);
		}
	?>
</div>

<h3>All tools (<?php echo count($files); ?>)</h3>
<div class="detailed-list-of-tools">
	<?php
		foreach ($files as $key => $value) {
			$name = substr($value, 0, -4); // remove file ending
			if (strlen($name) > 0) {
				echo tool_to_html($name);
			}
		}
	?>
</div>

<?php
	if (isset($_POST['algorithm']) && isset($_POST['value'])) {
		$algorithm = $_POST['algorithm'];
		$value = $_POST['value'];

		echo hash($algorithm, $value);
	}
?>
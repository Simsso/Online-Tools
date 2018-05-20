<?php
	if (!function_exists('getallheaders'))  {
	    function getallheaders()
	    {
	        if (!is_array($_SERVER)) {
	            return array();
	        }

	        $headers = array();
	        foreach ($_SERVER as $name => $value) {
	            if (substr($name, 0, 5) == 'HTTP_') {
	                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
	            }
	        }
	        return $headers;
	    }
	}
?>

<div>
	<ul class="list-unstyled">
		<?php	
			foreach (getallheaders() as $name => $value) {
			    echo '<li>' . $name . ': ' . $value . '</li>';
			}
		?>
	</ul>
</div>
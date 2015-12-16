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

<div class="text-info">
	<h3>HTTP header fields</h3>
	<p>
		HTTP header fields are components of the header section of request and response messages in the Hypertext Transfer Protocol (HTTP). They define the operating parameters of an HTTP transaction. <a href="https://en.wikipedia.org/wiki/List_of_HTTP_header_fields" target="_blank">Read more</a>
	</p>
</div>
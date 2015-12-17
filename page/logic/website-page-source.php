<?php
    $url = $_POST['url'];
    if ($url != "") {
        echo htmlspecialchars(file_get_contents($url));
    }
?>
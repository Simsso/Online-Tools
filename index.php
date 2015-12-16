<?php

  // set $p to the code of the requested page
  $p = 'home';
  if (isset($_GET['p'])) { $p = $_GET['p']; }

  // special pages don't have the content, logic, adapter system which tool pages have
  $special_pages = array('home', 'about', 'contact');

  $tool_page_requested = false;

  if (in_array($p, $special_pages)) { // check if a special page is requested

  } elseif ( // check if the tool page is available 
    file_exists('page/content/' . $p . '.php')) {

    $tool_page_requested = true;

  } else { // requested page not available
    echo 'Error 404';
  }


  require('inc/page.inc.php');

?>
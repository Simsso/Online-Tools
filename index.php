<?php

  // set $p to the code of the requested page
  $p = 'home';
  if (isset($_GET['p'])) { $p = $_GET['p']; }

  // special pages don't have the content, logic, adapter system which tool pages have
  $special_pages = array('home', 'about', 'contact');

  $tool_page_requested = false;

  $DEFAULT_PAGE_TITLE = "tools.timodenk.com";
  $DEFUALT_PAGE_DESCRIPTION = "This page is a collection of online tools.";

  if (in_array($p, $special_pages)) { // check if a special page is requested

  } elseif ( // check if the tool page is available 
    file_exists('page/content/' . $p . '.php')) {

    // read meta data
    $meta_data_path = 'page/meta-data/' . $p . '.txt';
    if (file_exists($meta_data_path)) {
      $meta_data_file = fopen($meta_data_path, 'r');
      if ($meta_data_file) {
        $lineNumber = 0;
        while (($line = fgets($meta_data_file)) !== false) {
          // title in line 1
          if ($lineNumber == 0) {
            $page_title = $line;
          } elseif ($lineNumber == 1) { // description in line 2
            $page_description = $line;
          }

          $lineNumber++;
        }

        fclose($meta_data_file);
      } 
    }

    $tool_page_requested = true;

  } else { // requested page not available
    echo 'Error 404';
  }


  require('inc/page.inc.php');

?>
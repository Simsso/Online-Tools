<?php

  function get_meta_data($page_name) {
    $meta_data;
    $meta_data->name = $page_name;
    $meta_data->title = '';
    $meta_data->description = '';
    $meta_data->keywords = Array();
    $meta_data->additional_information = '';
    $meta_data->read_more_link = '';
    $meta_data->see_also = Array();

    $meta_data_path = 'page/meta-data/' . $page_name . '.txt';

    if (file_exists($meta_data_path)) {
      $meta_data_file = fopen($meta_data_path, 'r');
      if ($meta_data_file) {
        $line_number = 0;
        while (($line = fgets($meta_data_file)) !== false) {
          $line = str_replace("\n", "", $line);
          // title in line 1
          if ($line_number == 0 ) {
            $meta_data->title = $line;
          } elseif ($line_number == 1 ) { // description in line 2
            $meta_data->description = $line;
          } elseif ($line_number == 2) { // keywords
            $meta_data->keywords = explode(';', $line);
          } elseif ($line_number == 3) { // additional information
            $meta_data->additional_information = $line;
          } elseif ($line_number == 4) { // read more link
            $meta_data->read_more_link = $line;
          } elseif ($line_number == 5) { // see also
            $meta_data->see_also = explode(';', $line);
          }
          
          $line_number++;
        }

        fclose($meta_data_file);
      } 
    }

    return $meta_data;
  }

  // set $p to the code of the requested page
  $p = 'home';
  if (isset($_GET['p']) && strlen($_GET['p'])) { $p = $_GET['p']; }

  // special pages don't have the content, logic, adapter system which tool pages have
  $special_pages = array('home', 'about', 'contact', 'legal-info');

  $tool_page_requested = false;

  $DEFAULT_PAGE_TITLE = "tools.timodenk.com";
  $DEFAULT_PAGE_DESCRIPTION = "This page is a collection of online tools.";
  $DEFAULT_PAGE_KEYWORDS = array('tool', 'online', 'tools', 'free');
  
  if (in_array($p, $special_pages)) { // check if a special page is requested

  } elseif ( // check if the tool page is available 
    file_exists('page/content/' . $p . '.php')) {

    // read meta data
    $meta_data = get_meta_data($p);

    $tool_page_requested = true;

  } else { // requested page not available
    header('HTTP/1.0 404 not found');
    include('404.html');
    exit();
  }


  require('inc/page.inc.php');

?>
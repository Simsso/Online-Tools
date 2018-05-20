<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="<?php echo ((isset($meta_data) && strlen($meta_data->description) > 0) ? $meta_data->description : $DEFAULT_PAGE_DESCRIPTION); ?>">
    <meta name="author" content="Timo Denk">
    <meta name="keywords" content="<?php 
      $meta_keywords = array_merge((isset($meta_data) ? $meta_data->keywords : array()), $DEFAULT_PAGE_KEYWORDS);
      $first_iteration = true;
      foreach ($meta_keywords as $key => $value) {
        if (!$first_iteration) {
          echo ',';
        }
        $first_iteration = false;
        echo str_replace(',', '_', $value);

       }
     ?>">
    <link rel="icon" href="/img/icon.ico">
    <title><?php echo ((isset($meta_data) && strlen($meta_data->title) > 0) ? $meta_data->title . ' - ' : '') . $DEFAULT_PAGE_TITLE; ?></title>

    <link href="/css/bootstrap.min.css" rel="stylesheet">

    <link href="/css/custom.css" rel="stylesheet">
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <a href="https://github.com/Simsso/Online-Tools" title="Source on GitHub" class="github-link">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60.5 60.5" width="50" height="50">
          <polygon points="60.5,60.5 0,0 60.5,0 "></polygon>
          <path d="M43.1,5.8c-6.6,0-12,5.4-12,12c0,5.3,3.4,9.8,8.2,11.4c0.6,0.1,0.8-0.3,0.8-0.6c0-0.3,0-1,0-2c-3.3,0.7-4-1.6-4-1.6c-0.5-1.4-1.3-1.8-1.3-1.8c-1.1-0.7,0.1-0.7,0.1-0.7c1.2,0.1,1.8,1.2,1.8,1.2c1.1,1.8,2.8,1.3,3.5,1c0.1-0.8,0.4-1.3,0.8-1.6c-2.7-0.3-5.5-1.3-5.5-5.9c0-1.3,0.5-2.4,1.2-3.2c-0.1-0.3-0.5-1.5,0.1-3.2c0,0,1-0.3,3.3,1.2c1-0.3,2-0.4,3-0.4c1,0,2,0.1,3,0.4c2.3-1.6,3.3-1.2,3.3-1.2c0.7,1.7,0.2,2.9,0.1,3.2c0.8,0.8,1.2,1.9,1.2,3.2c0,4.6-2.8,5.6-5.5,5.9c0.4,0.4,0.8,1.1,0.8,2.2c0,1.6,0,2.9,0,3.3c0,0.3,0.2,0.7,0.8,0.6c4.8-1.6,8.2-6.1,8.2-11.4C55.1,11.2,49.7,5.8,43.1,5.8z"></path>
        </svg>
      </a>
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">
            <img src="/img/logo.svg" class="nav-logo" alt="Online Tools" title="tools.timodenk.com" />
          </a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li<?php if ($p == 'home') echo ' class="active"'; ?>><a href="/">Home</a></li>
            <li<?php if ($p == 'about') echo ' class="active"'; ?>><a href="/about">About</a></li>
            <li<?php if ($p == 'contact') echo ' class="active"'; ?>><a href="/contact">Contact</a></li>
            <li<?php if ($p == 'legal-info') echo ' class="active"'; ?>><a href="/legal-info">Legal</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div id="main" class="container">

      <?php
        // tool page requested
        if ($tool_page_requested) {
          echo '<h1>' . (isset($meta_data->title) ? $meta_data->title : $p)  . '</h1>';
          echo '<p class="lead">' . (isset($meta_data->description) ? $meta_data->description : '') . '</p>';
          
          require('page/content/' . $p . '.php');

          // horizontal line between actual content and additional stuff like keywords, tags, links, etc.
          echo '<hr>';

          // see also
          if (count($meta_data->see_also) > 0) {
            echo '<div class="margin-bottom-15px"><h4>See also</h4>';

            for ($i = 0; $i < count($meta_data->see_also); $i++) {
              $see_also_page_meta_data = get_meta_data($meta_data->see_also[$i]);
              if ($i !== 0) echo ' &middot; ';
              echo '<a href="/' . $see_also_page_meta_data->name . '">' . $see_also_page_meta_data->title . '</a>';
            }

            echo '</div>';
          }

          // additional information
          if (strlen($meta_data->additional_information) > 0) {
            $read_more_link = '';
            if (strlen($meta_data->read_more_link) > 0) {
              $read_more_link = ' <a href="' . $meta_data->read_more_link . '" target="_blank">Read more</a>';
            }
            echo '<div class="margin-bottom-15px"><h4>Additional information</h4><p>' . $meta_data->additional_information . $read_more_link . '</p></div>';
          }

          // link to logic source code (if existent)
          $source_code_types = array('JavaScript' => 'js', 'PHP' => 'php');
          $header_written = false;
          foreach ($source_code_types as $key => $value) {
            if (file_exists('page/logic/' . $p . '.' . $value)) {
              if (!$header_written) echo "<h4>Source code</h4>";
              $header_written = true;
              
              echo '
                <div class="margin-bottom-15px">
                  <a href="https://github.com/Simsso/Online-Tools/blob/master/src/page/logic/' . $p . '.' . $value . '" target="_blank">
                    ' . $key . ' source code (' . $p . '.' . $value . ')
                  </a>
                </div>';
            }
          }

          // keywords
          if (count($meta_data->keywords) > 0) {
            echo '<div class="margin-bottom-15px page-keywords"><h4>Keywords</h4>';

            for ($i = 0; $i < count($meta_data->keywords); $i++) {
              if ($i !== 0) echo ' ';
              echo '<code>' . $meta_data->keywords[$i] . '</code>';
            }

            echo '</div>';
          }

        } else {
          // normal page requested (home, about...)
          require('special-page/' . $p . '.php');
        }
      ?>

      <div id="cookie-info"></div>

      <div class="tool-page-bottom-ad">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-9727315436627573"
          data-ad-slot="5117021249"
          data-ad-format="auto"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

    </div>

    <footer class="footer">
      <div class="container">
        <p class="text-muted">&copy; <a href="http://www.timodenk.com/" target="_blank">Timo Denk</a></p>
      </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/jquery-1.11.3.min.js"><\/script>')</script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/custom.js"></script>

    <?php
      // require javascript of tool pages
      if ($tool_page_requested) {
        // logic script
        if (file_exists('page/logic/' . $p . '.js')) { 
          echo '<script src="/page/logic/' . $p . '.js"></script>'; 
        }

        // adapter script
        if (file_exists('page/adapter/' . $p . '.js')) { 
          echo '<script src="/page/adapter/' . $p . '.js"></script>'; 
        }
      }
    ?>

    <!-- visitors online -->
    <!--<script src="https://cdn.socket.io/socket.io-1.3.7.js"></script>
    <script src="//const.timodenk.com/visitors-online/client.js"></script>
    <script>
      // number of visitors has changed
      window.visitorsOnlineChanged = function(count) {
        console.log(count);
      };
    </script>-->

    <!-- analytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-37082212-1', 'auto');
      ga('send', 'pageview');
    </script>
  </body>
</html>

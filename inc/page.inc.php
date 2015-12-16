<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>tools.timodenk.com</title>

    <link href="../css/bootstrap.min.css" rel="stylesheet">

    <link href="../css/custom.css" rel="stylesheet">
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/?p=home">tools.timodenk.com</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li<?php if ($p == 'home') echo ' class="active"'; ?>><a href="/?p=home">Home</a></li>
            <li<?php if ($p == 'about') echo ' class="active"'; ?>><a href="/?p=about">About</a></li>
            <li<?php if ($p == 'contact') echo ' class="active"'; ?>><a href="/?p=contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">

      <?php
        if ($tool_page_requested) {
          require('page/content/' . $p . '.php');
        } else {
          require('special-page/' . $p . '.php');
        }
      ?>

    </div>

    <footer class="footer">
      <div class="container">
        <p class="text-muted">&copy; Timo Denk</p>
      </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/jquery-1.11.3.min.js"><\/script>')</script>
    <script src="/js/bootstrap.min.js"></script>

    <?php
      // require javascript of tool pages
      if ($tool_page_requested) {
        if (file_exists('page/logic/' . $p . '.js')) { echo '<script src="/page/logic/' . $p . '.js"></script>'; }
        if (file_exists('page/adapter/' . $p . '.js')) { echo '<script src="/page/adapter/' . $p . '.js"></script>'; }
      }
    ?>
  </body>
</html>

<!DOCTYPE html>
<html lang="en">
   <head>
      <title>Download YouTube videos: fast, safe and ad-free!</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" type="image/png" href="assets/favicon.ico"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
      <link href="https://fonts.googleapis.com/css?family=Oswald:500" rel="stylesheet">
      <link href="assets/yt.css" rel="stylesheet">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js" type="text/javascript"></script>
      <script src="assets/youtube.js"></script>
	  
	  <a href="https://github.com/iCrazyBlaze/Youtube-Direct"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>
	  
      <?php
         if(isset($_GET['id']) )
         {
         	$youtube_id = $_GET['id'];
         
         	$youtube_video_info = file_get_contents('http://www.youtube.com/get_video_info?html5=1&video_id='.$youtube_id);
         
         	echo $youtube_video_info;
         }
         
         ?>
   </head>
   <body>
      <center>
      <div class="logo">Blaze's YouTube Video Downloader</div>
      <br><br>
      <form method='GET'>
         <div class="help">
            <b>Copy this part of your YouTube link, then paste it in the box below!</b>
            <br>
            <img src="assets/id.png" alt="Video ID">
            <br><br>
         </div>
         <label>Enter the video ID below:</label>
         <input class="form-control youtube_video_id" type="text">
         <br><br>
         <button class="btn_get_youtube_video_id" type="submit"><i class="fab fa-youtube"></i> Download Video!</button>
      </form>
      <br><br>
      <div class="youtube_video"></div>
   </body>
   <div class="footer">
      <p>(c) 2018 iCrazyBlaze. This website is not affiliated with Google Inc.</p>
      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
   </div>
</html>
<!DOCTYPE html>
<html lang="en">
   <head>
	  <style>
	  a.glow, a.glow:hover, a.glow:focus
		{
			text-decoration: none;
			color: #ffa600;
			text-shadow: none;
			-webkit-transition: 500ms linear 0s;
			-moz-transition: 500ms linear 0s;
			-o-transition: 500ms linear 0s;
			transition: 500ms linear 0s;
			outline: 0 none;
		}
		a.glow:hover, a.glow:focus
		{
			color: #fff;
			text-shadow: -1px 1px 8px #ffc, 1px -1px 8px #fff;
		}
		if (document.createElement("detect").style.textShadow === "") {
			document.getElementsByTagName("html")[0].className += " textshadow";
		}
	  </style>
   
      <title>Download YouTube videos: fast, safe and ad-free!</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
	  <meta name="description" content="Blaze's YouTube Downloader: Download YouTube videos: fast, safe and ad-free!">
      <link rel="shortcut icon" type="image/png" href="assets/favicon.ico"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
	  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
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
	  <br>
      <form method='GET'>
         <div class="help">
            <b>Copy this part of your YouTube link, then paste it in the box below!</b>
            <br>
            <img src="assets/id.png" alt="Video ID">
            <br><br><br>
         </div>
         <label>Enter the video ID below:</label>
         <input class="form-control youtube_video_id" type="text">
         <br><br>
         <button class="btn_get_youtube_video_id" type="submit"><i class="fab fa-youtube"></i> Download Video!</button>
      </form>
      <br><br>
      <div class="youtube_video"></div>
	  <br>
	  <i class="fab fa-chrome"></i> In the video player, click the <i class="fas fa-ellipsis-v"></i> <b>options button</b> and select <b>Download.</b><br>
	  <i class="fab fa-firefox"></i> Right-click on the video player and select <b>Save video as.</b><br>
	  <i class="fab fa-edge"></i> Click the <b>Download button</b> and save the file.
   </body>
   <div class="footer">
      <p>(c) 2019 <a href="https://icrazyblaze.github.io/" class="glow">iCrazyBlaze.</a> This website is not affiliated with Google Inc.</p>
	  <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="Check out this simple, free YouTube video downloader without any ads!" data-url="http://bit.ly/noadsyoutube" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>  
   </div>
   <br><br><br><br><br>
</html>
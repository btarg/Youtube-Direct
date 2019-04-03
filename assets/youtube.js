$(document).ready(function($) {
    var youtube_data_parser = function(data) {

        // Start parsing video data
        var qsToJson = function(qs) {
            var res = {};
            var pars = qs.split('&');
            var kv, k, v;
            for (i in pars) {
                kv = pars[i].split('=');
                k = kv[0];
                v = kv[1];
                res[k] = decodeURIComponent(v);
            }
            return res;
        }
        // End parsing video data

        var get_video_info = qsToJson(data);

        if (get_video_info.status == 'fail') {
            alert("An error ocurred. Please make sure the video ID is correct!");
            return {
                status: "error",
                code: "invalid_url",
                msg: "Invalid URL"
            };

        } else {
            // Remap URLs into an array of objects

            // Parse > url_encoded_fmt_stream_map > start

            // Get the video URL
            var tmp = get_video_info["url_encoded_fmt_stream_map"];
            if (tmp) {
                tmp = tmp.split(',');
                for (i in tmp) {
                    tmp[i] = qsToJson(tmp[i]);
                }
                get_video_info["url_encoded_fmt_stream_map"] = tmp;
            }
            // Parse > url_encoded_fmt_stream_map > end


            // Parse > player_response > start
            var tmp1 = get_video_info["player_response"];
            if (tmp1) {
                get_video_info["player_response"] = JSON.parse(tmp1);
            }
            // Parse > player_response > end

            // Parse > keywords > start
            var keywords = get_video_info["keywords"];
            if (keywords) {
                key_words = keywords.replace(/\+/g, ' ').split(',');
                for (i in key_words) {
                    keywords[i] = qsToJson(key_words[i]);
                }
                get_video_info["keywords"] = {
                    all: keywords.replace(/\+/g, ' '),
                    arr: key_words
                };
            }
            // Parse > keywords > end

            // Return data
            return {
                status: 'success',
                raw_data: qsToJson(data),
                video_info: get_video_info
            };
        }
    }


    $(document).on('click', '.btn_get_youtube_video_id', function(event) {
        event.preventDefault();

        var get_video_id = $('.youtube_video_id').val();

        var ajax_url = window.location.href + '/?id=' + get_video_id;

        $.get(ajax_url, function(d1) {

            var data = youtube_data_parser(d1)

            console.log(data)

            var video_data = data.video_info

            // Get friendly title
            var video_title = video_data.title.replace(/\+/g, ' ')
            var video_thumbnail_url = video_data.thumbnail_url

            var video_arr = video_data.url_encoded_fmt_stream_map;

            // quality "hd720" is 720p
            var video_arr_final = {}
            $.each(video_arr, function(i1, v1) {
                if (v1.quality == "hd720") {
                    var url = v1.url
                    video_arr_final = {
                        video_title: video_title,
                        video_thumbnail_url: video_thumbnail_url,
                        video_url: v1.url
                    }
                }
            });

            var d = '' +
                '<h2>' + video_title + '</h2>' +
                '<br>' +
				// Show download buttons
                '<a class="btn_btn-primary" href="' + video_arr_final.video_url + '" download="youtube.mp4"><i class="fa fa-download"></i> Download as MP4</a>' +
                '<div class="divider"/>' +
                '<a class="btn_btn-primary" href="' + video_arr_final.video_url + '" download="youtube.mp3"><i class="fa fa-download"></i> Download as MP3</a>' +
                '<div class="divider"/>' +
                '<a class="btn_btn-primary" href="http://i.ytimg.com/vi/' + get_video_id + '/hqdefault.jpg"><i class="fa fa-download"></i> Get Thumbnail</a>' +
                '<br><br>' +
                '<i class="fab fa-chrome"></i> In the video player, click the <i class="fas fa-ellipsis-v"></i> <b>options button</b> and select <b>Download.</b>' +
                '<br><br>'

                // Embed HTML5 video
                +
                '<video src="' + video_arr_final.video_url + '" controls height="350" width="100%"></video>'

            $('.youtube_video').html(d)

        });

    });

});
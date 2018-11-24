$(document).ready(function ($) {
	var youtube_data_parser = function (data) {
		// Start parsing video data
		var qsToJson = function (qs) {
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
			alert("An error ocurred. Please make sure the specified ID is correct!");
			return {
				status: "error",
				code: "invalid_url",
				msg: "Invalid URL"
			};

		} else {
			// remapping urls into an array of objects

			//--->parse > url_encoded_fmt_stream_map > start

			// Get the video URL
			var tmp = get_video_info["url_encoded_fmt_stream_map"];
			if (tmp) {
				tmp = tmp.split(',');
				for (i in tmp) {
					tmp[i] = qsToJson(tmp[i]);
				}
				get_video_info["url_encoded_fmt_stream_map"] = tmp;
			}
			//--->parse > url_encoded_fmt_stream_map > end


			//--->parse > player_response > start
			var tmp1 = get_video_info["player_response"];
			if (tmp1) {
				get_video_info["player_response"] = JSON.parse(tmp1);
			}
			//--->parse > player_response > end

			//--->parse > keywords > start
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
			//--->parse > keywords > end

			// return data
			return {
				status: 'success',
				raw_data: qsToJson(data),
				video_info: get_video_info
			};
		}
	}


	$(document).on('click', '.btn_get_youtube_video_id', function (event) {
		event.preventDefault();

		var get_video_id = $('.youtube_video_id').val();

		var ajax_url = 'http://localhost/?id=' + get_video_id;

		$.get(ajax_url, function (d1) {

			var data = youtube_data_parser(d1)

			console.log(data)

			var video_data = data.video_info

			var video_title = video_data.title.replace(/\+/g, ' ')
			var video_thumbnail_url = video_data.thumbnail_url

			var video_arr = video_data.url_encoded_fmt_stream_map;

			//quality "hd720"
			var video_arr_final = {}
			$.each(video_arr, function (i1, v1) {
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
				'<a class="btn_btn-primary" href="' + video_arr_final.video_url + '" download="youtube.mp4"><i class="fa fa-download"></i> Download as MP4</a>' +
				'<div class="divider"/>' +
				'<a class="btn_btn-primary" href="http://i.ytimg.com/vi/' + get_video_id + '/maxresdefault.jpg"><i class="fa fa-download"></i> Get Thumbnail</a>' +
				'<br><br>' +
				'In the video player, click the <b>options button</b> and select <b>Download.</b>' +
				'<br><br>'

				+
				'<video src="' + video_arr_final.video_url + '" controls autoplay oncontextmenu="return false;" height="350" width="100%">' +
				'</video>'

			$('.youtube_video').html(d)

		});

	});

});
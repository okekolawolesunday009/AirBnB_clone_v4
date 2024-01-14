$(document).ready(function(){
	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/status/',
		type: 'GET',
		success: function(response) {
			if (response.status === 'OK') {
				$('#api_status').addClass('available');
				$('#api_status').removeClass('circle_active');

			} else {
				$('#api_status').removeClass('available')
				$('#api_status').addClass('circle_active');
			}
		},
		error : function(error) {
			console.error('Error: ', error);
			$('#api_status').removeClass('available');
		}
	})
});
$(document).ready(function() {
	$.getJSON('../assets/data/events.json', function(events) {
		$.each(events, (function(i, event) {
			var eventPanel = '<div class="col s12 m4">' +
			'<div class="card-panel">' +
			'<h4 class="card-title name">' + event.name + '</h4>' +
			'<br>' +
			'<p class="type">Type:' + event.type + '</p>' +
			'<p class="host">Host:' + event.host + '</p>' +
			'<p class="start-date">Start: ' + event.start_date + '</p>' +
			'<p class="end-date">End: ' + event.end_date + '</p>' +
			'<p class="guests">Guests:</p>' +
			'<ul class="guest-list" id=' + event.id + '>' +
			'</ul>' +
			'<p class="location">Location: ' + event.location + '</p>' +
			'<p class="message">Message: ' + event.message + '</p>' +
			'</div>' +
			'</div>'; 

			$('#events').append(eventPanel);

			listItemID = '#' + event.id;
			
			$.each(event.guest_list, (function(i, guest) {
				guestListItem = '<li class="guest">' + guest + '</li>'
				$(listItemID).append(guestListItem);
			}))
		}))
	});
});
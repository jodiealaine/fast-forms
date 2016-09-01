$(document).ready(function () {
	if ($('#add-event-form').length > 0) {
		// Validation for add-event-form
		moment().format();

		// additional method for future date validation
		jQuery.validator.addMethod('futureDate', function(value, element) {
			var startDate = $('#start_date').val();
			var now = moment();

			if (moment(startDate) <= now) {
				return false;
			} else {
				return true;
			}
		});

		// additional method for date matching validation
		jQuery.validator.addMethod('dateChecker', function(value, element) {

			var startDate = $('#start_date').val();
			var endDate = $('#end_date').val();

			if (moment(startDate) >= moment(endDate)) {
				return false;
			} else {
				return true;
			}

		});

		$.validator.setDefaults({
			errorClass: 'invalid',
			validClass: 'valid',
			errorPlacement: function (error, element) {
				$(element)
				.closest('form')
				.find('input[id=\'' + element.attr('id') + '\']')
				.attr('class', 'validate invalid');
			}
		});

		$('#add-event-form').validate({
			rules: {
				start_date: {
					futureDate: true
				},
				end_date: {
					dateChecker: true
				}	
			},
			onfocusout: function(element) { 
				this.element(element);
			}
		});

		$('#name').on('blur', function() {
			$('#add-event-form').validate().element(this);
		});
		$('#event-type').on('blur', function() {
			$('#add-event-form').validate().element(this);
		});
		$('#host').on('blur', function() {
			$('#add-event-form').validate().element(this);
		});
		$('#start_date').on('blur', function() {
			$('#add-event-form').validate().element(this);
		});
		$('#end_date').on('blur', function() {
			$('#add-event-form').validate().element(this);
		});
		$('#guest-list').on('blur', function() {
			$('#add-event-form').validate().element(this);
		});
		$('#location').on('blur', function() {
			$('#add-event-form').validate().element(this);
		});
	}
});
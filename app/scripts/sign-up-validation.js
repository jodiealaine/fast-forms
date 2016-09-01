$(document).ready(function () {
	if ($('#sign-up-form').length > 0) {
		// Validation for sign-up-form
		// additional method for password matching validation
		jQuery.validator.addMethod( 'passwordMatch', function(value, element) {

			var password = $('#password').val();
			var confirmPassword = $('#password_confirmation').val();

			if (password != confirmPassword ) {
				return false;
			} else {
				return true;
			}
		});

		// main validation
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

		$('#sign-up-form').validate({
				rules: {
					password_confirmation: {
						passwordMatch: true
					},
					name: {
						required: true
					},
					phone: {
						phoneUK: true
					}
				},
				onfocusout: function(element) { 
					this.element(element);
				}
			});

		$('#full_name').on('blur', function() {
			$('#sign-up-form').validate().element(this);
		});
		$('#email').on('blur', function() {
			$('#sign-up-form').validate().element(this);
		});
		$('#password').on('blur', function() {
			$('#sign-up-form').validate().element(this);
		});
		$('#password_confirmation').on('blur', function() {
			$('#sign-up-form').validate().element(this);
		});
		$('#phone').on('blur', function() {
			$('#sign-up-form').validate().element(this);
		});
	}
});
'use strict';

app.directive('appHeader', function() {
    return {
        templateUrl: 'partials/_header.html',
        controller: "headerController as HDC"
    };
});

app.directive('appSubheader', function() {
    return {
        templateUrl: 'partials/_subheader.html'
    };
});

app.directive('appBlurb', function() {
    return {
        templateUrl: 'partials/_blurb.html'
    };
});

app.directive('appFooter', function() {
    return {
        templateUrl: 'partials/_footer.html'
    };
});

app.directive('selectUser', function() {
    return {
        templateUrl: 'partials/_selectuser.html'
    };
});

app.directive('donate', function() {
    return {
        templateUrl: 'partials/_donate.html',
				// scope : {'getToken' : '&'},
        link: function(scope, element, attrs, controller) {
					// console.log(scope.getToken);
					// console.log(window.localStorage.clientToken);
            // var authorization = window.localStorage.clientToken;
						// console.log(authorization);
            var submit = document.querySelector('input[type="submit"]');
            var form = document.querySelector('#checkout-form');

						scope.getToken()
						.then(function(token){
							braintree.client.create({
	                authorization: token
	            }, function(clientErr, clientInstance) {
	                if (clientErr) {
											console.log(clientErr);
											// alert("There was an error", clientErr);
	                    return;
	                }

	                braintree.hostedFields.create({
	                    client: clientInstance,
	                    styles: {
	                        'input': {
	                            'font-size': '14pt'
	                        },
	                        'input.invalid': {
	                            'color': 'red'
	                        },
	                        'input.valid': {
	                            'color': 'green'
	                        }
	                    },
	                    fields: {
	                        number: {
	                            selector: '#card-number',
	                            placeholder: '4111 1111 1111 1111'
	                        },
	                        cvv: {
	                            selector: '#cvv',
	                            placeholder: '123'
	                        },
	                        expirationDate: {
	                            selector: '#expiration-date',
	                            placeholder: '10 / 2019'
	                        }
	                    }
	                }, function(hostedFieldsErr, hostedFieldsInstance) {
	                    if (hostedFieldsErr) {
	                        // Handle error in Hosted Fields creation
	                        alert(hostedFieldsErr);
	                        throw new Error(hostedFieldsErr);
	                    }

	                    submit.removeAttribute('disabled');

	                    form.addEventListener('submit', function(event) {
	                        event.preventDefault();
	                        // console.log(event);
	                        hostedFieldsInstance.tokenize(function(tokenizeErr, payload) {
	                            if (tokenizeErr) {
	                                // Handle error in Hosted Fields tokenization
	                                alert(tokenizeErr);
	                                throw new Error(tokenizeErr);
	                            }
	                            // Put `payload.nonce` into the `payment-method-nonce` input, and then
	                            // submit the form. Alternatively, you could send the nonce to your server
	                            // with AJAX.
	                            document.querySelector('input[name="payment-method-nonce"]').value = payload.nonce;
	                            var amountFromClient = document.querySelector('input[name="amount"]').value;
	                            // console.log(amountFromClient);
	                            amountFromClient = (amountFromClient.toString() + ".00");
	                            // console.log(amountFromClient);
	                            $.ajax({
	                                    method: "POST",
	                                    url: "https://mysterious-dusk-96055.herokuapp.com/processPayment",
	                                    data: {
	                                        payload: payload.nonce,
	                                        amount: amountFromClient
	                                    }
	                                })
	                                .done(function(msg) {
	                                    $(location).attr("href", "/success");
	                                    alert("Success!");
	                                });
	                        });
	                    }, false);
	                });


						});

            });
        }
    };
});

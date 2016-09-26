'use strict';

var authorization = window.localStorage.clientToken;
// console.log(authorization);
var submit = document.querySelector('input[type="submit"]');
var form = document.querySelector('#checkout-form');
// console.log(form);
braintree.client.create({
  // Replace this with your own authorization.
  authorization: authorization
}, function (clientErr, clientInstance) {
  if (clientErr) {
    // Handle error in client creation
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
  }, function (hostedFieldsErr, hostedFieldsInstance) {
    if (hostedFieldsErr) {
      // Handle error in Hosted Fields creation
			alert(hostedFieldsErr);
			throw new Error(hostedFieldsErr);
    }

    submit.removeAttribute('disabled');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
			// console.log(event);
      hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
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
				console.log(amountFromClient);
				amountFromClient = (amountFromClient.toString() + ".00" );
				console.log(amountFromClient);
				$.ajax({
					method: "POST",
					url: "http://homestead.app/processPayment",
					data: {payload: payload.nonce,
								amount: amountFromClient}
				})
				.done(function(msg){
					alert("Success" + msg);
				});
      });
    }, false);
  });
});

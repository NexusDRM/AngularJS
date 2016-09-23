'use strict';

var authorization = window.localStorage.clientToken;
// console.log(authorization);
var submit = document.querySelector('input[type="submit"]');
var form = document.querySelector('#checkout-form');
var button = document.getElementById('submit');

braintree.client.create({
  authorization: authorization
}, function (clientErr, clientInstance) {
  if (clientErr) {
    // Handle error in client creation
    throw new Error(clientErr);
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
        placeholder: '4111 1111 1111 1111',
				class: 'form-control'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123',
				class: 'form-control'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: '10 / 2019',
				class: "form-control"
      }
    }
  }, function (hostedFieldsErr, hostedFieldsInstance) {
    if (hostedFieldsErr) {
      // Handle error in Hosted Fields creation
      throw new Error(hostedFieldsErr);
    }

    // submit.removeAttribute('disabled');

		button.addEventListener('click', function (event) {
      event.preventDefault();

      hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
        if (tokenizeErr) {
          // Handle error in Hosted Fields tokenization
          throw new Error(tokenizeErr);
        }
				console.log("payload.nonce",payload.nonce);
        // Put `payload.nonce` into the `payment-method-nonce` input, and then
        // submit the form. Alternatively, you could send the nonce to your server
        // with AJAX.
        document.querySelector('input[name="payment-method-nonce"]').value = payload.nonce;
				window.localStorage.nonce = payload.nonce;
        form.submit();
      });
    }, false);
  });
});

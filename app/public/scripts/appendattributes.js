'use strict';

var number = document.getElementById('credit-card-number');
var cvv = document.getElementById('cvv');
var expiration = document.getElementById('expiration');

function setAttributes(){
	number.setAttribute("ng-model", "DC.form.number");
	cvv.setAttribute("ng-model", 'DC.form.cvv');
	expiration.setAttribute("ng-model", "DC.form.expire");
}

setAttributes();

<h3>Donate by Credit Card</h3>
<hr>
<div id="error-message"></div>
<!-- <div class="col-xs-12" ng-class="{ 'has-error' : 'DC.form.amount.$invalid && !DC.form.amount.$pristine'}">
		<label>Amount:</label>
		<input type="currency" class="form-control" name="amount" ng-model="DC.form.amount" placeholder="25.00" ng-init="setAmount = false" ng-click="setAmount = !setAmount">
		<p ng-show="paymentForm.amount.$invalid && !paymentForm.amount.$pristine">
				Please enter a valid amount
		</p>
</div> -->

<!-- <div id="dropin-container"></div> -->

<div class="form-group hosted-field col-xs-6" id="card-number">
		<label>Card Number</label>
		<!-- <input type="text" class="form-control" name="cardNumber" ng-model="DC.form.cardNumber" ng-minlength="16" ng-maxlength="16"> -->
		<!-- <p ng-show="paymentForm.cardNumber.$invalid && !paymentForm.cardNumber.$pristine" class="help-block">
				Please enter a valid card number
		</p> -->
</div>
<div class="form-group hosted-field col-xs-6" id="expiration-date">
		<label>Expiration Date</label>
		<!-- <input type="month" class="form-control" ng-model="DC.form.cardExpire"> -->
</div>
</div>

<div class="col-xs-12">
<div class="form-group hosted-field col-xs-6" id="cvv">
		<label>Security Code</label>
		<!-- <input type="text" class="form-control" name="cvv" ng-model="DC.form.cardCVV" ng-minlength="3" ng-maxlength="3"> -->
		<!-- <p ng-show="paymentForm.cvv.$invalid && !paymentForm.cvv.$pristine" class="help-block"> -->
		<!-- Please enter a valid CVV -->
		<!-- </p> -->
</div>
<div class="form-group hosted-field col-xs-6" ng-init="setAmount=false" ng-click="setAmount = !setAmount">
		<label>Amount (Four figures max)</label>
		<input type="text" name="amount" class="form-control" ng-model="DC.form.amount" ng-maxlength="4">
		<p ng-show="setAmount">
				Payment will process for the amount of
				{{DC.form.amount | currency}}
		</p>
</div>
<!-- <div class="form-group col-xs-6">
		<label>Zip Code</label>
		<input type="text" class="form-control" name="zip" ng-model="DC.form.zip" ng-minlength="5" ng-maxlength="5">
		<p ng-show="paymentForm.zip.$invalid && !paymentForm.zip.$pristine" class="help-block">
				Please enter a valid zip code
		</p>
</div> -->
<input type="hidden" name="payment-method-nonce">
<input type="submit" name="submit" class="btn btn-success btn-lg col-lg-12 submit" value="{{DC.form.amount | currency}}">
</div>

<!-- <div class="panel panel-default col-lg-6">
		<h3>Options:</h3>
		<hr>
		<div class="checkbox" ng-hide="quarterlyPayOptIn || annualPayOptIn">
				<label>
						<input type="checkbox" ng-init="monthlyPayOptIn = false" ng-model="DC.form.monthlyPayOptIn" ng-click="monthlyPayOptIn = !monthlyPayOptIn">
						Repeat monthly
				</label>
		</div>
		<div class="checkbox" ng-hide="monthlyPayOptIn || annualPayOptIn">
				<label>
						<input type="checkbox" ng-init="quarterlyPayOptIn = false" ng-model="DC.form.quarterlyPayOptIn" ng-click="quarterlyPayOptIn = !quarterlyPayOptIn">
						Repeat quarterly
				</label>
		</div>
		<div class="checkbox" ng-hide="monthlyPayOptIn || quarterlyPayOptIn">
				<label>
						<input type="checkbox" ng-init="annualPayOptIn = false" ng-model="DC.form.annualPayOptIn" ng-click="annualPayOptIn = !annualPayOptIn">
						Repeat Annually
				</label>
		</div>
		<div class="checkbox" ng-init="setFutureDate = false">
				<label>
						<input type="checkbox" ng-click="setFutureDate = !setFutureDate">
						Set up payment for future date
				</label>
		</div>
		<div class="form-group" ng-show="setFutureDate">
				<form name="setFutureDate">
						<label>Pick a date
								<em>within 30 days</em>
								of today:</label>
						<input type="date" ng-model="DC.futureDate" placeholder="yyyy-MM-dd" min="{{DC.currentDate}}" max="{{DC.maxFutureDate}}">
				</form>
		</div>
		<div>
				<div>
						<p ng-show="monthlyPayOptIn && !quartlyPayOptIn && !annualPayOptIn">
								Payment repeats monthly
						</p>
						<p ng-show="quarterlyPayOptIn && !monthlyPayOptIn && !annualPayOptIn">
								Payment repeats quarterly
						</p>
						<p ng-show="annualPayOptIn && !monthlyPayOptIn && !quarterlyPayOptIn">
								Payment repeats annually
						</p>
						<p ng-show="setFutureDate">
								Payment will process on:
								{{DC.futureDate}}
						</p>
						<p ng-show="setAmount">
								Payment will process for the amount of
								{{DC.form.amount | currency}}
						</p>
				</div>
		</div>
</div> -->

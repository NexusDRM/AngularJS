'use strict';

app.directive('appHeader', function(){
	return {
		templateUrl: 'partials/_header.html',
		controller: "HeaderController as HDC"
	};
});

app.directive('appSubheader', function(){
	return {
		templateUrl: 'partials/_subheader.html'
	};
});

app.directive('appBlurb', function(){
	return {
		templateUrl: 'partials/_blurb.html'
	};
});

app.directive('appFooter', function(){
	return {
		templateUrl: 'partials/_footer.html',
		controller: "FooterController as FC"
	};
});

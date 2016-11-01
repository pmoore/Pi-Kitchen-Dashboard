(function() {
	'use strict';
	/*global $, moment*/

	/*************************************************************************/
	/*****************************************************/
	/*********************************/
	// USER EDITABLE LINES - Change these to match your location and preferences!

	var apiKey = '9c64b9c80ea646018cfc8d91892e9dec';
	var stationId = 'D07';
	var metroApiUrl = 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/';

	// Poll interval
	var waitBetweenMetroQueriesMS = 10000;

	function addMetroTime(train) {
		if (train.Group == "2") {
			var $metroResult = $('<div class="metroResult"></div>');
			if (train.Line == 'No' || train.Line == '--') {
				$metroResult.append('<span class="color">--</span>&nbsp;&nbsp;');
			} else {
				$metroResult.append('<span class="color '+train.Line+'"></span>&nbsp;&nbsp;');
			}			
			$metroResult.append('<span class="destination">'+train.DestinationName+'</span>');
			$('#metroContainer').append($metroResult);
		}		
	}

	function queryMetro() {
		var params = {
            "api_key": apiKey
        };
		$.ajax({
			type: 'GET',
			url: metroApiUrl + stationId + "?" + $.param(params)
		}).done(function (result) {
			// console.log(result.Trains);
			$('#metroContainer').empty();
			var i;
			for(i = 0; i < result.Trains.length; i++) {
				addMetroTime(result.Trains[i]);
			}			
		});
	}

	$(window).load(function() {
		// Fetch the weather data for right now
		queryMetro();

		// Query Yahoo! at the requested interval for new weather data
		setInterval(function() {
			queryMetro();
		}, waitBetweenMetroQueriesMS);
	});
}());


/////////// Example return data from Yahoo! Weather ///////////////////////////
/*
	"title": "Conditions for Rolla, MO at 2:52 pm CST",
	"lat": "37.95",
	"long": "-91.76",
	"link": "http:\/\/us.rd.yahoo.com\/dailynews\/rss\/weather\/Rolla__MO\/*http:\/\/weather.yahoo.com\/forecast\/USMO0768_f.html",
	"pubDate": "Wed, 11 Feb 2015 2:52 pm CST",
	"condition": {
		"code": "26",
		"date": "Wed, 11 Feb 2015 2:52 pm CST",
		"temp": "37",
		"text": "Cloudy"
	},
	"description": "\n<img src=\"http:\/\/l.yimg.com\/a\/i\/us\/we\/52\/26.gif\"\/><br \/>\n<b>Current Conditions:<\/b><br \/>\nCloudy, 37 F<BR \/>\n<BR \/><b>Forecast:<\/b><BR \/>\nWed - Partly Cloudy. High: 41 Low: 17<br \/>\nThu - Sunny. High: 29 Low: 19<br \/>\nFri - Partly Cloudy. High: 47 Low: 28<br \/>\nSat - Partly Cloudy. High: 36 Low: 9<br \/>\nSun - AM Clouds\/PM Sun. High: 29 Low: 20<br \/>\n<br \/>\n<a href=\"http:\/\/us.rd.yahoo.com\/dailynews\/rss\/weather\/Rolla__MO\/*http:\/\/weather.yahoo.com\/forecast\/USMO0768_f.html\">Full Forecast at Yahoo! Weather<\/a><BR\/><BR\/>\n(provided by <a href=\"http:\/\/www.weather.com\" >The Weather Channel<\/a>)<br\/>\n",
	"forecast": [
		{
			"code": "29",
			"date": "11 Feb 2015",
			"day": "Wed",
			"high": "41",
			"low": "17",
			"text": "Partly Cloudy"
		},
		{
			"code": "32",
			"date": "12 Feb 2015",
			"day": "Thu",
			"high": "29",
			"low": "19",
			"text": "Sunny"
		},
		{
			"code": "30",
			"date": "13 Feb 2015",
			"day": "Fri",
			"high": "47",
			"low": "28",
			"text": "Partly Cloudy"
		},
		{
			"code": "30",
			"date": "14 Feb 2015",
			"day": "Sat",
			"high": "36",
			"low": "9",
			"text": "Partly Cloudy"
		},
		{
			"code": "30",
			"date": "15 Feb 2015",
			"day": "Sun",
			"high": "29",
			"low": "20",
			"text": "AM Clouds\/PM Sun"
		}
	],
	"guid": {
	"isPermaLink": "false",
	"content": "USMO0768_2015_02_15_7_00_CST"
*/

const fs = require('fs');
const d3 = require('d3');

const url = "http://ft-ig-content-prod.s3-website-eu-west-1.amazonaws.com/v2/financial-times/ge17-results-data/_latest/results.json";
const outputFilename = "results-2017.csv"

//data feed
d3.json(url,function(data){
	//specify the part of the json to target
	var results = data["full"];

	//array will handle outputs for csv
	var outputs = [];

	results.forEach(function(d,i){

	//create the required output fields and populate
	var obj = {};
		obj.code = d.ons_id;
		obj.country = d.country;
		obj.name = d.name;
		obj.winner = d.winner;
		obj.majority = d.majority;
		obj.turnout = d.turnout;
		obj.electorate = d.electorate;
		obj.winnerlast = d.winnerlast;
		obj.majoritylast = d.lastmajority;
		obj.turnoutlast = d.lastturnout;
		outputs.push(obj);
	})

	//convert array of output objects to csv format
	var csvOutput = d3.csvFormat(outputs);

	//write the file
	fs.writeFile(outputFilename, csvOutput, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	}); 
})
var fs = require('fs');
var d3 = require('d3');


d3.json("http://ft-ig-content-prod.s3-website-eu-west-1.amazonaws.com/v2/financial-times/ge17-results-data/_latest/results.json",function(data){


var results = data["full"];


var outputs = [];

results.forEach(function(d,i){

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


 var csvOutput = d3.csvFormat(outputs);

fs.writeFile("2017results.csv", csvOutput, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 


})
var convertFrom		= document.getElementById('convert-from');
var convertTo		= document.getElementById('convert-to');

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
	   if (xmlhttp.status == 200) {
		   var jsonData = JSON.parse(xmlhttp.responseText);
		   var optionElem = '';
		   for (var key in jsonData.rates) {
				// check if the property/key is defined in the object itself, not in parent
				if (jsonData.rates.hasOwnProperty(key)) {           
					optionElem += '<option value="'+jsonData.rates[key]+'">'+key+'</option>';
				}
			}
			convertFrom.innerHTML	= optionElem;
			convertTo.innerHTML		= optionElem;
		   //return xmlhttp.responseText;
	   }
	   else if (xmlhttp.status == 400) {
		  alert('There was an error 400');
	   }
	   else {
		   alert('something else other than 200 was returned');
	   }
	}
};

xmlhttp.open("GET", 'http://api.fixer.io/latest', true);
xmlhttp.send();

document.getElementById("submit-btn").addEventListener('click',function (){
	var convertFrom		= document.getElementById('convert-from');
	var convertTo		= document.getElementById('convert-to');
    var firstVal	= parseFloat(document.querySelector('#inputval').value);
	convertFrom		= parseFloat(convertFrom.options[convertFrom.selectedIndex].value);
	convertTo		= parseFloat(convertTo.options[convertTo.selectedIndex].value);
	firstVal		= firstVal/convertFrom;
	firstVal		= firstVal*convertTo;
	console.log(firstVal);
	document.querySelector('#resultID').style.display = 'block';
	document.querySelector('#result').innerHTML = firstVal;
}); 

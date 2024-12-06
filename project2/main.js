/*
function: formatRequest()
purpose: concatentate get request to pass to API in calling function

STATUS: TESTED, FUNC
*/
function formatRequest(){
	
	let req = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
	return req;
}

/*
function: callApi()
purpose: used to get info from API + relay to index.html

*/
function callApi(){

//format Request to pass to api
	let req = formatRequest();
	let objectNumbers = [];
	let jsonResource = [];
	let subi = 1;

//get objectNumbers to pass to API
	$(document).load("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=&departmentId=10" , function(resource){
		jsonResource = JSON.parse(resource);
			//API call and parse to html
			for(i = 0; i < 10; i++){
				objectNumbers[i]=(jsonResource.objectIDs[i]);
				$(document).load("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + String(objectNumbers[i]), function(data){
					let jsonData = JSON.parse(data);
					let title = (jsonData.title);
					let htmlName = "#exn" + String(subi);
					let htmlImg = "#ex" + String(subi);
					let htmlDes = "#exd" + String(subi);


					$(htmlName).text(jsonData.title);
					$(htmlImg).attr("src", jsonData.primaryImageSmall);
					$(htmlDes).text("Period: " + jsonData.period);


					subi++;
				}); 
			}	
	});
}
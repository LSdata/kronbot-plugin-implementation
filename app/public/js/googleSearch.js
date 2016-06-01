/* Author students: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-26
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: call our Node.js server service that 
 * returns search results from Google Places API. 
 */

//call our node service and get Google Places API results
function searchGplaces(searchWord) {
    var tablePlace = document.getElementById("divTable");
    var clientSearch = document.getElementById("inputSearch").value;
    
    var url = "/gPlaces?search="+ searchWord;
    
    $.getJSON(url, function (data) {
        var dataLen = data.results.length;

        //if there is an error_message
        if(dataLen==0){
            tablePlace.innerHTML = "<br><i>Sorry no search results! <br>(Error message: "+data.error_message+")</i>";
        }
        //else display search result table
        else{
            tablePlace.innerHTML = "<br>Search results: <br>";
            
            tablePlace.innerHTML += "<br><table id=gTable><tr><th>Name</th><th>Address</th><th>Google Places Rating (1-5)</th><th>Zomato Rating (0-5)</th></tr></table>";
            var tableId = document.getElementById("gTable");
            var totalLen;
            
            if(dataLen<5){
                totalLen = dataLen;
            }else
                totalLen = 5;

            for(var i=0; i<totalLen; i++) {
                var itemName = data.results[i].name;
                var itemAddress = data.results[i].formatted_address;
                var itemRating = data.results[i].rating;
                var lat = data.results[i].geometry.location.lat;
                var lng = data.results[i].geometry.location.lng;
                
                var row = tableId.insertRow();
                      
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell4.setAttribute("id","zomId"+itemName);
                cell1.innerHTML = itemName;
                cell2.innerHTML = itemAddress;
                cell3.innerHTML = itemRating
                
                searchZomato(itemName,lat,lng);
            }
        }
    });
}
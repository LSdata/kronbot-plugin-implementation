/* Author students: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-26
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: call our Node.js server service that 
 * returns search results from Google Places API. 
 */

//call our node service and get Google Places API results
function searchGplaces() {
    var tablePlace = document.getElementById("divTable");
    var clientSearch = document.getElementById("inputSearch").value;
    
    var url = "/gPlaces?search="+ clientSearch;
    
    $.getJSON(url, function (data) {
        var dataLen = data.results.length;
        
        //if there is an error_message
        if(dataLen==0){
            tablePlace.innerHTML = "<br><i>Sorry no search results! <br>(Error message: "+data.error_message+")</i>";
        }
        //else display search result table
        else{
            tablePlace.innerHTML = "<br>Search results: <br>";
            
            tablePlace.innerHTML += "<br><table id=gTable><tr><th>Name</th><th>Address</th></tr></table>";
            var tableId = document.getElementById("gTable");

            for(var i=0; i<dataLen; i++) {
                var itemName = data.results[i].name;
                var itemAddress = data.results[i].formatted_address;
                var lat = data.results[i].geometry.location.lat;
                var lng = data.results[i].geometry.location.lng;
                
                var row = tableId.insertRow();
                row.setAttribute("onclick","rowClick("+i+","+dataLen+","+lat+","+lng+")");
                row.setAttribute("id","rowId"+i);
                      
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.setAttribute("id","nameId"+i);
                cell2.setAttribute("id","addrId"+i);
                cell1.innerHTML = itemName;
                cell2.innerHTML = itemAddress;

            }
        }
    });
}

//Highlighting the row that the users clicks. 
//Only one row at the time can be selected
//Pass also the item geolocation to narrow the results in Zomato
function rowClick(i, totalNr, lat, lng){
    var name = document.getElementById("nameId"+i).innerHTML;

    //default init unselect all rows
    for(var j=0; j<totalNr; j++) {
        document.getElementById("rowId"+j).className="rowNoSelect";
    }
    //highlight selected row
    document.getElementById("rowId"+i).className="rowSelect";
    
    //show results from Zomato of the selected table row restaurant
    searchZomato(name,lat,lng);
}
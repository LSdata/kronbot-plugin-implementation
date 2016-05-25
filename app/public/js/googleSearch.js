
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
            tablePlace.innerHTML = "<br>Restaurant result from Google Places: "+clientSearch+"<br>";
            
            tablePlace.innerHTML += "<br><table id=gTable><tr><th>Name</th><th>Address</th></tr></table>";
            var tableId = document.getElementById("gTable");

            for(var i=0; i<dataLen; i++) {
                var name = data.results[i].name;
                var address = data.results[i].formatted_address;
                
                var row = tableId.insertRow();
                row.setAttribute("onclick","rowClick("+i+","+dataLen+")");
                row.setAttribute("id","rowId"+i);
                      
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = name;
                cell2.innerHTML = address;

            }
        }
    });
}

function rowClick(i, totalNr){
    //var rowValue = document.getElementById("rowId"+i).innerHTML;
    
    //default init to unselect all rows
    for(var j=0; j<totalNr; j++) {
        document.getElementById("rowId"+j).className="rowNoSelect";
    }
    //highlight selected row
    document.getElementById("rowId"+i).className="rowSelect";
}
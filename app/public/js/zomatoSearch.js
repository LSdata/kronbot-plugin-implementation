/* Author students: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-26
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: call our Node.js server service that 
 * returns search results from Zomato API. 
 */

//call our node service and get Zomato results
function searchZomato(rowText, lat, lng) {
    
    var zomatoRes = document.getElementById("divZomato");
    zomatoRes.innerHTML = "<h2>Detailed information from Zomato </h2>";
    zomatoRes.innerHTML += "Searching for \"" + rowText+"\" around the same geolocation<br>";
    var url = "/zomato?q="+ rowText+"&lat="+lat+"&lng="+lng;
   
    $.getJSON(url, function (data) {
        var dataLen = data.restaurants.length;
        
        //if there is an error_message
        if(dataLen==0){
            zomatoRes.innerHTML += "<br><i>Sorry no search results! <br>(Error message: "+data.error_message+")</i>";
        }
        //else display search result table
        else{
            zomatoRes.innerHTML += "<br>Search results: <br>";
            
            zomatoRes.innerHTML += "<br><table id=zTable><tr><th>Name</th><th>Address</th></tr></table>";
            var ztableId = document.getElementById("zTable");

            for(var i=0; i<dataLen; i++) {
                var itemName = data.restaurants[i].restaurant.name;
                var itemAddress =data.restaurants[i].restaurant.location.address;
                
                var row = ztableId.insertRow();
                row.setAttribute("onclick","zrowClick("+i+","+dataLen+")");
                row.setAttribute("id","zrowId"+i);
                      
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.setAttribute("id","znameId"+i);
                cell2.setAttribute("id","zaddrId"+i);
                cell1.innerHTML = itemName;
                cell2.innerHTML = itemAddress;
            }
        }
          
    });
}

//Highlighting the row that the users clicks. 
//Only one row at the time can be selected
function zrowClick(i, totalNr){
  
    //default init unselect all rows
    for(var j=0; j<totalNr; j++) {
        document.getElementById("zrowId"+j).className="rowNoSelect";
    }
    //highlight selected row
    document.getElementById("zrowId"+i).className="rowSelect";
    
    //more info from Zomato about the selected restaurant
    //...
}
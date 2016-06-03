/* Author students: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-26
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: call our Node.js server service that 
 * returns search results from Zomato API. 
 */

//call our node service and get Zomato results
function searchZomato(rowText, lat, lng) {
    
    // a radius of 1 km is necessary because of varying coordinate precision
    var radius = 1000;
    var url = "/zomato?q="+ rowText+"&lat="+lat+"&lng="+lng+"&radius="+radius;
   
    $.getJSON(url, function (data) {
        var dataLen = data.restaurants.length;
        
        //if there is an error_message
        if(dataLen==0){
            document.getElementById("zomId"+rowText).innerHTML="No rating found";
        }
        var itemRating =data.restaurants[0].restaurant.user_rating.aggregate_rating;

        document.getElementById("zomId"+rowText).innerHTML=itemRating;
    });
}
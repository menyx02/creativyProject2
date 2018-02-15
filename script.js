$(document).ready(function () {


    $("#searchSubmit").click(function(e) {
        e.preventDefault();

        var dropdown = document.getElementById("category");
        var id = dropdown.options[dropdown.selectedIndex].value;
        var text =dropdown.options[dropdown.selectedIndex].text;

        //Error checking
        if($("#itemInput").val() == "" ) {
            alert("Please type something to search for");
            return;
        }
        if(id == 0){
            alert("Please select a category");
            return;
        }

        var BASE_URL = "http://api.walmartlabs.com/v1/search?query=";
        var query = $("#itemInput").val();
        //format the query to the format required by WALMART
        query = query.replace(' ', "+");

        var myurl = BASE_URL + query + "&format=json&apiKey=nqk69bn333pb7j6tyu6e98xb";
        $.ajax({
            url: myurl,
            dataType: "jsonp",
            success: function (json) {
                var results = "";

                if(json.numItems == 0) {
                    results = "Sorry, no items matched this search. Try again";
                    $("#searchResults").html(results);
                    return;
                }



                console.log(json);
                console.log(json.items[0].name);
                console.log(json.items[0].salePrice);
                console.log(json.items[0].shortDescription);
            }
        });
    });

    $("#newSearch").click(function (e) {

    });

});

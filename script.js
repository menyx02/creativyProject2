$(document).ready(function () {


    $("#searchSubmit").click(function(e) {

        var dropdown = document.getElementById("category");
        var id = dropdown.options[dropdown.selectedIndex].value;
        var text =dropdown.options[dropdown.selectedIndex].text;

        //Error checking
        if($("#itemInput").val() == "" ) {
            e.preventDefault();
            alert("Please type something to search for");
            return;
        }
        if(id == 0){
            e.preventDefault();
            alert("Please select a category");
            return;
        }


        var myurl = "http://api.walmartlabs.com/v1/search?query=ipod&format=json&apiKey=nqk69bn333pb7j6tyu6e98xb";
        $.ajax({
            url: myurl,
            dataType: "jsonp",
            success: function (json) {
                console.log(json);
                console.log(json.items[0].name);
                console.log(json.items[0].salePrice);
                console.log(json.items[0].shortDescription);
            }
        });
    });

});

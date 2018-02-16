function trim(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text ;
}

function validatePrice(price) {
    return price ? '$' + price : "Out of Stock"
}

function createItem(item){ return `
    <div class="result">
        <img class="image-holder" src="${item.mediumImage}"/>
        <div class="result-body">
            <div class="result-header">
                <div class="result-title">${trim(item.name, 100)}</div>
                ${item.customerRatingImage ?
                    `<img class="result-rating" src="${item.customerRatingImage}"/>`
                    :  ''}
            </div>
            <div class="description">${trim(item.shortDescription, 400)}</div>
            <div class="result-footer">
                <div class="result-item-number">ID: ${item.itemId}</div>
                <div class="result-price">${validatePrice(item.salePrice)}</div>
            </div>
        </div>
    </div>
`}

$(document).ready(function () {


    $("#searchSubmit").click(function(e) {
        e.preventDefault();

        var query = $("#itemInput").val();
        var categoryId = $('#category').find(":selected").val();

        //Error checking
        if(query === "" ) {
            alert("Please type something to search for");
            return;
        }
        if(categoryId === 0){
            alert("Please select a category");
            return;
        }
        var BASE_URL = "http://api.walmartlabs.com/v1/search?query=";

        //format the query to the format required by WALMART
        query = query.replace(' ', "+"); // TODO: Replace with regex.

        var myurl = BASE_URL + query + "&categoryId=" + categoryId + "&format=json&apiKey=nqk69bn333pb7j6tyu6e98xb";
        $.ajax({
            url: myurl,
            dataType: "jsonp",
            success: function (json) {
                var results = "";
                console.log(json);
                if(json.numItems === 0) {
                    results = `<div class="centered">Sorry, no items matched this search. Try again<div>`;
                    $("#searchResults").html(results);
                    return;
                }
                results = json.items.map(item => createItem(item)).join('\n');
                $("#searchResults").html(results);



            }
        });
    });

});

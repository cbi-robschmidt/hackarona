const GET_RECIPES_URL = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/getRecipe';
let page = 1;
$(document).ready(getRecipes);

function getRecipes() {
    const catalog = $(".catalog");
    var searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";

    $.ajax({
        url: GET_RECIPES_URL, 
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({query: [query], page}), 
        success: function(data) {
            const recipes = JSON.parse("{\"body\":"+data.body+"}");
            if(recipes.body.length == 0) {
                $("#moreButton").hide();
            }
            $.each(recipes.body, function(index, value) {
                catalog.append(`<a class="catalog-item" href=${value['webImage']}><h3>${value['name']}</h3><br /><img src=${value['webImage']} /></a>`);
            });
        }
    });
}

function loadMore() {
    page += 1;
    getRecipes();
}
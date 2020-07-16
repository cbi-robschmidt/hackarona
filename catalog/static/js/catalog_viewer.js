const GET_RECIPES_URL = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-recipes';
let page = 1;
$(document).ready(getRecipes);

function addRecipe(column, value) {
    column.append(`<a class="box recipe-item" href=${value.webImage}><h3 class="subtitle">${value.name}</h3><br /><img src=${value.webImage} /></a>`);
}

function getRecipes() {
    const catalog = $("#recipe-catalog");

    const col1 = $("#col1");
    const col2 = $("#col2");
    const col3 = $("#col3");
    const col4 = $("#col4");

    var searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";

    $.ajax({
        url: GET_RECIPES_URL, 
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({query: [query], page: page}), 
        success: function(data) {
            const recipes = JSON.parse(data);
            if(recipes.length == 0) {
                $("#moreButton").hide();
                $("#endofline").show();
            }
            else {
                $("#loadingrecipes").hide();
                $("#moreButton").show();
            }

            $.each(recipes, function (index, value) {
                console.log('Trying to display ' + value);
                if (index % 4 == 0)
                    addRecipe(col1, value);
                else if (index % 4 == 1)
                    addRecipe(col2, value);
                else if (index % 4 == 2)
                    addRecipe(col3, value);
                else
                    addRecipe(col4, value);
            });
        }
    });
}

function loadMore() {
    page += 1;
    getRecipes();
    $("#loadingrecipes").show();
}
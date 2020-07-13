const GET_TEXT_URL = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-text';
const GET_RECIPES_URL = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/getRecipe';

var words

$(document).ready(function gatherWords() {
    const imageNameHeader = $('.obj-name');
    const wordContainer = $("#word-container");
    const loadingText = $("#words-loading");

    const imageUrl = GET_TEXT_URL + "?filename=" + imageNameHeader.text().trim();
    $.get(imageUrl, function(data, status) {
        loadingText.hide();

        console.log(data);
        resp = JSON.parse(data);
        $.each(resp['words'], function(index, value) {
            wordContainer.append(`<div>${value}</div`);
        });
        const recipeContainer = $('#recipe-container');
        const recipeStatus = $('#recipe-status');
        $.ajax({
            url: GET_RECIPES_URL, 
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({query: resp['words']}), 
            success: function(data) {
                recipes = JSON.parse("{\"body\":"+data.body+"}");
                console.log(recipes.body);
                if(recipes.body.length != 0)
                    recipeStatus.hide();
                $.each(recipes.body, function(index, value) {
                    recipeContainer.append(`<a class="catalog-item" href=${value['webImage']}><h3>${value['name']}</h3><img src=${value['webImage']} /></a>`);
                });
            }
        });
    });
});
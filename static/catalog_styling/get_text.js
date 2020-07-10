const GET_TEXT_URL = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-text';
const GET_RECIPES_URL = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/getRecipe';

$(document).ready(function gatherWords() {
    const imageNameHeader = $('.obj-name');
    const wordContainer = $("#word-container");
    const loadingText = $("#words-loading");

    const imageUrl = GET_TEXT_URL + "?filename=" + imageNameHeader.text().trim();
    console.log('Finding words with url ' + imageUrl);
    $.get(imageUrl, function(data, status) {
        loadingText.hide();

        console.log(data);
        resp = JSON.parse(data);
        $.each(resp['words'], function(index, value) {
            wordContainer.append(`<div>${value}</div`);
        });
    });
});

function gatherRecipes() {
    const recipeContainer = document.getElementById("recipe-container");
    const recipeStatus = document.getElementById("recipe-status");
}

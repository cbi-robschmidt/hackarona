const SCAN_DATA_URL = '/scan/get-scan-data/';

$(document).ready(function gatherWords() {
    const imageNameHeader = $('.obj-name');
    const wordContainer = $("#word-container");
    const loadingText = $("#words-loading");

    const scanUrl = SCAN_DATA_URL + "?filename=" + imageNameHeader.text().trim();

    $.getJSON(scanUrl, function(data) {
        // hide the loading notification
        loadingText.hide();

        // append each word detected to the container
        $.each(data.words, function (index, value) {
            value.score = parseFloat(value.score).toFixed(1);
            wordContainer.append(`<div>${value.word}<br /><i>confidence: ${value.score}</i></div`);
        });

        // if a non-zero amount of recipes found, display them
        if(data.recipes.length > 0) {
            $('#recipe-status').hide();

            $.each(data.recipes, function (index, value) {
                const recipeContainer = $('#recipe-container');

                recipeContainer.append(`<a href=${value.webImage}><h2>${value.name}</h2><br /><img src=${value.webImage} /></a>`);
            });
        }
    });
});
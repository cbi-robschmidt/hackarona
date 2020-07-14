const SCAN_DATA_URL = '/scan/get-scan-data/';

function addRecipe(column, value) {
    column.append(`<a class="box" href=${value.webImage}><h2 class="title">${value.name}</h2><br /><img src=${value.webImage} /></a>`);
}

$(document).ready(function gatherWords() {
    const imageNameHeader = $('#image-name');
    const wordContainer = $("#word-container");
    const loadingText = $("#words-loading");

    const scanUrl = SCAN_DATA_URL + "?filename=" + imageNameHeader.text().trim();
    console.log(scanUrl);

    $.getJSON(scanUrl, function(data) {
        // hide the loading notification
        loadingText.hide();
        console.log(data);

        // append each word detected to the container
        $.each(data.words, function (index, value) {
            value.score = parseFloat(value.score).toFixed(1);
            wordContainer.append(`<div class="level-item tag"><strong>${value.word}</strong>&nbsp;&nbsp;<i>(confidence: ${value.score})</i></div>`);
        });

        // if a non-zero amount of recipes found, display them
        if(data.recipes.length > 0) {
            $('#recipe-status').hide();
            
            const col1 = $("#col1");
            const col2 = $("#col2");
            const col3 = $("#col3");
            const col4 = $("#col4");

            $.each(data.recipes, function (index, value) {
                const recipeContainer = $('#recipe-container');

                for (var i = 0; i < recipes.length; i++) {
                    console.log('Trying to display ' + recipes[i]);
                    if (i % 4 == 0)
                        addRecipe(col1, recipes[i]);
                    else if (i % 4 == 1)
                        addRecipe(col2, recipes[i]);
                    else if (i % 4 == 2)
                        addRecipe(col3, recipes[i]);
                    else
                        addRecipe(col4, recipes[i]);
                }
            });
        }
    });
});
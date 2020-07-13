$(document).ready(function getRecipes() {
    $.get( "https://api.cbrands.com/api/1.0/recipes", { apikey: "jet", dateModified: "1900-1-1T00:00:00Z", numberOfRecords: "6", page: "1" } )
    .done(function( data ) {
        console.log( "Data Loaded: " + data );
  });
});
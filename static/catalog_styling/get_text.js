const URL = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-text';

function gatherWords() {
    const imageNameHeader = document.querySelector('.obj-name');
    const wordContainer = document.querySelector(".gridbox");

    if(!imageNameHeader) {
        return;
    }
    const imageName = imageNameHeader.textContent;
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            // wordContainer.insertAdjacentHTML("afterbegin", `<div>${word}</div>`);
            // console.log(imageTag);
        }
    };
    
    xhttp.open("Get", URL + `?filename=${imageName}`, true);
    xhttp.send();

}

document.addEventListener("load", gatherWords());

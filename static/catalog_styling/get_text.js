    const URL = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-text';

    function gatherWords() {
        const imageNameHeader = document.querySelector('.obj-name');
        const wordContainer = document.querySelector(".gridbox");

        if(!imageNameHeader) {
            return;
        }
        const imageUrl = URL + "?filename=" + imageNameHeader.textContent.trim();
        
        const xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                let response = xhttp.responseText;
                if(response) {
                    response = response.substring(1, response.length - 1); //Trim '[]' from string
                    let words = response.split(", ");
                    words.forEach((ele)=>{
                        console.log(ele);
                        let word = ele.substring(1, ele.length - 1);    //Trim quotes left around each word
                        wordContainer.insertAdjacentHTML("afterbegin", `<div>${word}</div>`);
                    })
                }
            }
        };

        xhttp.open("Get", imageUrl, true);
        xhttp.send();

    }

    document.addEventListener("load", gatherWords());

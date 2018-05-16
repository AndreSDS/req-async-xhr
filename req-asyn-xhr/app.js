(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('submit-btn').innerHTML = "Aguarde...";

        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const imgRequest = new XMLHttpRequest();
        imgRequest.onload = addImage;
        imgRequest.onerror = function (err) {
          requestError(err, 'image');
        };
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.setRequestHeader('Authorization', 'Client-ID 62a66d916869262ce2efe09dfe50fea1963aed5a85d0ac0c1c708a90d0d64982');
        imgRequest.send();

        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
          articleRequest.onerror = function (err) {
            requestError(err, 'article');
          };
        articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=980b1f6416fc4b2dbe1e9c317750d041`);
        articleRequest.send();

        function addImage(){
          let htmlContent = '';
          const data = JSON.parse(this.responseText);
          if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = '<figure><img src=" '+firstImage.urls.regular+' " alt=" '+searchedForText+' "><figcaption> '+searchedForText+' by  '+firstImage.user.name+'</figcaption></figure>';
          }else{
            htmlContent = '<div class="error-no-image">No images available</div>';
          }
          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

          function addArticles () {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const article = data.docs;
            if (data.response && data.response.docs && data.response.docs.length > 1) {
              htmlContent = '<ul>' + data.response.docs.map(article => '<li class="article"><h2><a href=" '+article.web_url+' "> '+article.headline.main+' </a></h2><p> '+article.snippet+' </p></li>').join('') + '</ul>';
            }else{
              htmlContent = '<div class="error-no-article">No articles available</div>';
            }
          responseContainer.insertAdjacentHTML('beforeend', htmlContent);
          document.getElementById('submit-btn').disabled = false;
          document.getElementById('submit-btn').innerHTML = "Buscar";
          }
    });
})();

//unsplash
//Aplication ID - 26753
//Access key - 62a66d916869262ce2efe09dfe50fea1963aed5a85d0ac0c1c708a90d0d64982
//Secret-key - 087c14830fd358ea49fc7cc0725e3aa8de9939feeed99aa462ad49c6024c688f

//New York Times Here's your API Key: 980b1f6416fc4b2dbe1e9c317750d041


function start_App(){

    apps()
    function apps(){
        const form = document.querySelector('#form')
        const result = document.querySelector('#results')
        const searchInfo= document.querySelector('#search')
        
        form.addEventListener('submit', submitting_data)
        
        
        function submitting_data(e){
        e.preventDefault()
    
        const mainVlue= searchInfo.value 

        if(mainVlue===''){
           console.log('Empty Inputs')
            return
        }


        applying_API(mainVlue)
        
        }


      function applying_API(mainVlue){

        const API_KEY= '38880226-4562c75a60c21007dbb5e4037'
        const API=`https://pixabay.com/api/?key=${API_KEY}&q=${mainVlue}`

        fetch(API)
            .then(result=> result.json())
            .then(response=>  creating_html(response.hits) )

      }

      function creating_html(allValues){
        
        allValues.forEach(info => {

            const {id, previewURL, views, pageURL, largeImageURL, user } = info

            result.innerHTML= `
            <div class="container">
            <div class="row">
            <div class="col-6">
            <div class="card">
            <div class="card" style="width: 18rem;">
            <img src=${largeImageURL} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">User: ${user}</h5>
            <p class="card-text">Views: ${views}</p>
            <a href=${pageURL} class="btn btn-primary">Page URL</a>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            
            `
            
        });



      }

     

    }


    
    
    
    }



window.addEventListener('DOMContentLoaded', start_App)





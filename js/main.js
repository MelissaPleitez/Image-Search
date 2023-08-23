
function start_App(){

    apps()
    function apps(){
        const form = document.querySelector('#form')
        const result = document.querySelector('#results')
        const searchInfo= document.querySelector('#search')
        const paginationresult = document.querySelector('#pagination')
        const pages= 40;
        let pagination;
        let iter;
        
        form.addEventListener('submit', submitting_data)
        
        
        function submitting_data(e){
        e.preventDefault()
    
        const mainVlue= searchInfo.value 

        if(mainVlue===''){
          alert('Empty Inputs')
            return
        }


        applying_API(mainVlue)
        
        }


      function applying_API(mainVlue){

        const API_KEY= '38880226-4562c75a60c21007dbb5e4037'
        const API=`https://pixabay.com/api/?key=${API_KEY}&q=${mainVlue}&per_page=${pages}`

        fetch(API)
            .then(result=> result.json())
            .then(response=>{
              pagination= calculate_pages(response.totalHits)
              creating_html(response.hits)
            }  
               )

      }

      function creating_html(allValues){
        clean_html(result)
        allValues.forEach(info => {

            const {id, previewURL, views, pageURL, largeImageURL, user } = info

            const divContainer = document.createElement('div')
            divContainer.classList.add('w-100', 'p-3', 'mb-4')
            const divRow= document.createElement('div')
            divRow.classList.add('d-fex', 'mt-3', 'justify-content-center')
            divRow.style.width='48rem'
            const divCols = document.createElement('div')
           
            const divCard = document.createElement('div')
            divCard.classList.add('card', 'p-3', 'mb-4')
            const imgContainer = document.createElement('img')
            imgContainer.classList.add('card-img-top')
            imgContainer.src= largeImageURL
            const divBody = document.createElement('div')
            divBody.classList.add('card-body')
            const h4Info = document.createElement('h4')
            h4Info.classList.add('card-title')
            h4Info.textContent= `Users: ${user} - Views: ${views}`
            const aInfo = document.createElement('a')
            aInfo.href= pageURL
            aInfo.textContent= 'Page URL'

            divBody.appendChild(h4Info)
            divBody.appendChild(aInfo)
            divCard.appendChild(imgContainer)
            divCard.appendChild(divBody)
            divCols.appendChild(divCard)
            divRow.appendChild(divCols)
            divContainer.appendChild(divRow)

            result.appendChild(divRow)
            showing_pagination()
           
        });
      }

      function* Calculating_pagination(total){
        console.log(total)
        for(let i= 1; i<=total; i++){
          yield i;
        }
      }


      function calculate_pages(total_pages){
        return parseInt(Math.ceil(total_pages/ pages))
      }


      function alert (message){
        Toastify({
          text:`${message} ` ,
          className: "info",
          duration: 3000, 
          style: {
            background: "#9d263a",
          }
        }).showToast();
      }


      function clean_html(value){
        while(value.firstChild){
          value.removeChild(value.firstChild)
        }
      }

      function showing_pagination(){
        iter = Calculating_pagination(pagination)
        
          while(true){
            const {value, done}= iter.next()
            if(done) return

            const nav = document.createElement('nav')
            nav.ariaLabel= 'Page navigation'
            const ulPage= document.createElement('ul')
            ulPage.classList.add('pagination')
            const liPage= document.createElement('li')
            liPage.classList.add('page-item')
            const aPage= document.createElement('a')
            aPage.classList.add('page-link')
            aPage.textContent= value

            ulPage.appendChild(liPage)
            liPage.appendChild(aPage)
            nav.appendChild(ulPage)

            paginationresult.appendChild(nav)
          }
        }

    }

   

   
    
    
   

    }

    


window.addEventListener('DOMContentLoaded', start_App)





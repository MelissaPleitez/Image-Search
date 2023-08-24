
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
        let actual_page=1
        
        form.addEventListener('submit', submitting_data)
        
        
        function submitting_data(e){
        e.preventDefault()
    
        const mainVlue= searchInfo.value 

        if(mainVlue===''){
          alert('Empty Inputs')
            return
        }


        applying_API()
        
        }


      function applying_API(){

        const mainVlue= searchInfo.value 
        const API_KEY= '38880226-4562c75a60c21007dbb5e4037'
        const API=`https://pixabay.com/api/?key=${API_KEY}&q=${mainVlue}&per_page=${pages}&page=${actual_page}`

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

            const {views, pageURL, largeImageURL, user } = info

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
            const h4Info = document.createElement('div')
            h4Info.classList.add('card-title')
            h4Info.innerHTML= `
            <p class="fw-bold">Creator User: <span class="">@${user}</span></p>
            <p class="fw-bold">Views: <span class="">${views}</span></p>
            `
            const aInfo = document.createElement('a')
            aInfo.classList.add('btn', 'btn-outline-info')
            aInfo.href= pageURL
            aInfo.target='_blank'
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


     

      function showing_pagination(){
        clean_html(paginationresult)
        iter = Calculating_pagination(pagination)
        
          while(true){
            const {value, done}= iter.next()
            if(done) return

           
            const liPage= document.createElement('li')
            liPage.classList.add('page-item')
            const aPage= document.createElement('button')
            aPage.classList.add('page-link')
            aPage.textContent= value

            aPage.onclick=function(){
              actual_page = value
               applying_API()
               
            }

            if(actual_page=== value){
              liPage.classList.add('active')
              liPage.ariaCurrent= "page"
            }

            liPage.appendChild(aPage)
           

            paginationresult.appendChild(liPage)
          }
        }


        function clean_html(value){
          while(value.firstChild){
            value.removeChild(value.firstChild)
          }
        }

    }

   
    }

    


window.addEventListener('DOMContentLoaded', start_App)





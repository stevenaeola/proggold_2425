
window.addEventListener('load',  async function(event){

    let url = "http://127.0.0.1:8090/shop/all"
    let response = await fetch(url)
    let body = await response.text();
    let results = JSON.parse(body)
    let results_list = document.getElementById('shop_content')
    results_list.innerHTML = ""
    for(let result of results){
        results_list.innerHTML += 
        `<li><a href='/shop/details/${result.shop_id}'>${result.name}</a> </li>`
    }
    let links = document.querySelectorAll("#shop_content > li > a")
    for(let link of links){
        link.addEventListener('click', async function(event){
            event.preventDefault()
            let request_url = event.target.getAttribute("href")
            let response = await fetch(request_url)
            let body = await response.text()
            let shop = JSON.parse(body)
            console.log("recovered", shop)
            return
//            const details_results = document.getElementById("detail_results")
            // card code from https://getbootstrap.com/docs/4.0/components/card/
            details_results.innerHTML = 
            `
            <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${coffee.name}</h5>
    <p class="card-text">Strength: ${coffee.strength}</p>
    <p class="card-text">Taste: ${coffee.taste}</p>

  
  </div>
</div>
`
        })
    }

})
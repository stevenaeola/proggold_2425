const search_button = document.getElementById("extract_data")

const search_form = document.getElementById('search_form')
search_form.addEventListener('keyup',  async function(event){
    event.preventDefault()

    let input_elt = document.getElementById('search_term')
    let search_term = input_elt.value
    let url = "http://127.0.0.1:8090/coffee/search?search_term=" + search_term
    let response = await fetch(url)
    let body = await response.text();
    let results = JSON.parse(body)
    let results_list = document.getElementById('search_results')
    results_list.innerHTML = ""
    for(let result of results){
        results_list.innerHTML += 
        `<li><a href='/coffee/details/${result.name}'>${result.name}</a> </li>`
    }
    let links = document.querySelectorAll("#search_results > li > a")
    for(let link of links){
        link.addEventListener('click', async function(event){
            event.preventDefault()
            let request_url = event.target.getAttribute("href")
            let response = await fetch(request_url)
            let body = await response.text()
            let coffee = JSON.parse(body)
            const details_results = document.getElementById("detail_results")
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
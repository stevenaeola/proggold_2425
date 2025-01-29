const express = require('express')
const app = express()

let coffees = require("./coffees.json")

app.get('/', function(req, resp){
  resp.send('Hello world')
})

app.get('/coffee/random', function(req, resp){
  let coffee_number = Math.floor(Math.random()*coffees.length)
  let coffee = coffees[coffee_number]
  resp.send(coffee.name)
})

app.get('/coffee/all', function(req, resp){
  resp.send(coffees)
}
)

app.get('/coffee/search', function(req, resp){
  let search_term = req.query.search_term
  console.log("search_term is ", search_term)
  let search_results = []
  for(let coffee of coffees){
    if(coffee.name.includes(search_term)){
      search_results.push(coffee)
    }
  }

  resp.send(search_results)

}
)

app.get('/coffee/details/:coffee_type', function(req, resp){
    let type = req.params.coffee_type
    console.log("details for coffee type " + type)
    for(let coffee of coffees){
      console.log("comparing with " + coffee.name)
      if(coffee.name== type){
        console.log("found")
        resp.send(coffee)
      }
    }
    resp.send("That's all")
  })


app.listen(8090)
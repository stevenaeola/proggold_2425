const express = require('express')
const app = express()

const COFFEE_JSON = "./coffees.json"
const fs = require('fs');

app.use(express.static('client'))
app.use(express.json())

let coffees = require(COFFEE_JSON)

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
  console.log("coffees ", coffees)
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

app.post("/coffee/add", function(req, res){
  console.log("received add request", req.body)
  let coffee = req.body
  coffees.push(coffee)
  let data = JSON.stringify(coffees)
  fs.writeFileSync(COFFEE_JSON, data);
  res.sendStatus(200)
})

module.exports = app;
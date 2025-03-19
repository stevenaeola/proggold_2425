const express = require('express')
const app = express()

const COFFEE_JSON = "./coffee_data.json"
const fs = require('fs');

app.use(express.static('client'))
app.use(express.json())

let coffee_data = require(COFFEE_JSON)
let coffees = coffee_data.coffees
let shops = coffee_data.shops

function saveCoffeeData(){
  let coffee_data = {"coffees": coffees, "shops": shops}
  let data = JSON.stringify(coffee_data, null, 2)
  fs.writeFileSync(COFFEE_JSON, data);
}

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
  if(coffee.name.includes(" ")){
    res.sendStatus(400);
    return;
  }
  coffees.push(coffee)
  saveCoffeeData();
  let message = {"msg": `Successfully added ${coffee.name}`}
  res.status(200).send(message)
})

app.get("/shop/all", function(req, res){
  res.send(shops)
})

app.post("/user/is_admin", function(req,res){
  let username = req.body.username;
  /// admin username includes !
  if (username.lastIndexOf("!")>=0){
    res.sendStatus(200);
  }
  else {
    res.sendStatus(403);
  }
})

module.exports = app;
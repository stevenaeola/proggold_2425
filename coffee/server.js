const express = require('express')
const app = express()

let coffees = [
"americano",
"latte",
"espresso",
"flat white",
"cappuccino"
]

app.get('/', function(req, resp){
  resp.send('Hello world')
})

app.get('/coffee/random', function(req, resp){
  let coffee_number = Math.floor(Math.random()*coffees.length)
  let coffee = coffees[coffee_number]
  resp.send(coffee)
})

app.get('/random/:max', function(req, resp){
    let max = parseInt(req.params.max)
    let rand = Math.floor(Math.random()*max) +1
    console.log('Max via url is ' + max + ' rand is ' + rand)
    resp.send('' + rand)
  })
  
  app.get('/r', function(req, resp){
    max = parseInt(req.query.max)
    rand = Math.floor(Math.random()*max) +1
    console.log('Max via query is ' + max + ' rand is ' + rand)
    resp.send('' + rand)
  })  

app.listen(8090)
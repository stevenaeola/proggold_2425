window.addEventListener('click', async function(event){
  try{
    let response = await fetch('http://127.0.0.1:8090/listy')
    if(response.ok){
      let body = await response.text ()
      document.getElementById('content').innerHTML=body
    }
    else{
      this.alert("you are a fool you have got a 404 try learning to type")
    }
  } catch(e) {
    alert(e)
  }
});
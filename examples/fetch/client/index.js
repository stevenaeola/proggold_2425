window.addEventListener('click', function(event){
  fetch('http://127.0.0.1:8080/list')
   .then(response => response.text())
   .then(body =>
      document.getElementById('content').innerHTML=body)
    .catch( (error) => alert(error))
});
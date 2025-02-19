
const add_form = document.getElementById('add_form')
add_form.addEventListener('submit',  async function(event){
    alert('handling form submission')
    event.preventDefault()

    const formData = new FormData(add_form);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
 
    const response = await fetch('/coffee/add',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: formJSON
        });
})
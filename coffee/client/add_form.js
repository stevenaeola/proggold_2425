
const add_form = document.getElementById('add_form')
add_form.addEventListener('submit',  async function(event){
    event.preventDefault()

    const formData = new FormData(add_form);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    try
        {
            const response = await fetch('/coffee/add',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: formJSON
                });
        }
    catch(e){
        alert(e)
    }
})
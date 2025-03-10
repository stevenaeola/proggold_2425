
const add_form = document.getElementById('login_form')
add_form.addEventListener('submit',  async function(event){
    event.preventDefault()

    const formData = new FormData(add_form);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    try
        {
            const response = await fetch('/user/is_admin',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: formJSON
                });
            const status = response.status;
            alert("Status was " + status)
        }
    catch(e){
        alert(e)
    }
})
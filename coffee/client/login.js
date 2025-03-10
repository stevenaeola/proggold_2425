
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
            if(status == "200"){
                window.location.replace('admin.html');
            }
            else{
                window.location.replace('user.html');
            }
        }
    catch(e){
        alert(e)
    }
})

document.getElementById('loginform').addEventListener('submit', async function (e) {
    e.preventDefault();

    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    console.log( email, password);

    
        const res = await fetch('http://localhost:3003/api/login', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({  email, password})
        });

        console.log(res);
        

        const data = await res.json();
        console.log(data);

        if (res.status==200) {
            
            localStorage.setItem('token',data.token);
            window.location.href="../index.html"
        }else{
            alert(data.error)
        }
        
    
    
   
});

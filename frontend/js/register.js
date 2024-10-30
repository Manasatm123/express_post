
let pic
document.getElementById('registerform').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    console.log(name, email, password, confirmpassword,pic);

    try {
        const res = await fetch('http://localhost:3003/api/addUser', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ pic,name, email,phone, password, confirmpassword })
        });

        const data = await res.json();
        if (res.status === 201) {
            alert(data.msg);
            window.location.href = "./login.html";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to sign up. Please try again.');
    }
});


 async function picture() {
    const file=document.getElementById("pic").files[0]
      pic=await convertBase641(file)
    console.log(pic);
    document.getElementById('img').src=pic
}


function convertBase641(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();

        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
            resolve(fileReader.result)

        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
}
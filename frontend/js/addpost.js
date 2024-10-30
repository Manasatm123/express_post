const token = localStorage.getItem("token");
let pics = []; 

document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const caption = document.getElementById('caption').value;
    const description = document.getElementById('description').value;

    console.log(pics, caption, description);

    const res2 = await fetch('http://localhost:3003/api/addpost', {
        method: "POST",
        headers: { 
            "Content-Type": 'application/json', 
            "authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ pics, caption, description })
    });
    console.log(await res2.json()); 
    if(res.status==201){
        alert(data.msg)
        window.location.href="../pages/profile.html"
    }
    else{
        alert(data.error)
    }
});

pics = []; 
async function picture() {
    const files = document.getElementById("pic").files;
    

   
    const promises = Array.from(files).map(file => convertBase64(file));
    pics = await Promise.all(promises); 
    console.log(pics); 

   
    if (pics.length > 0) {
        document.getElementById("preview").src = pics[0]; 
    }
}

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

// function addbut(){
//     window.location.href="../pages/profile.html"
// }






async function getUser() {
    const token = localStorage.getItem("token")

    if (token) {
        const res = await fetch("http://localhost:3003/api/getUser", {
            headers: { authorization: `Bearer ${token}` },
        })
        const post = await res.json()
        // console.log(post);
        // console.log(post.usr.name);
        // console.log(post.usr.pic);

        document.getElementById("navsec").style.display = "none"
        document.getElementById("navsec2").innerHTML = `
                <div class="navdrop" id="uname">${post.usr.name}</div>
            <div id="profile" class="profile">
                <img src="${post.usr.pic}" alt="" id="propic" class="propic" width="40" height="40">
            </div>
            <div class="dropdown" id="dropdown">
                <button onclick="myFunction()" class="drpbtn">▼</button>
                <div id="myDropdown" class="dropdown-con">
                    <a href="../pages/profile.html?=${post.usr.id}">profile</a>
                     <a onclick="logoutacc()">Logout</a>
                </div>
            </div>`

        console.log(post.data[1].caption);
        
    let str = []
    // console.log(movie.data)
    post.data.map((data) => {
        str += `
        <a href="./pages/globalPost.html?id=${data._id}">
                <div class="card">
                    <div><img
                            src="${data.pics[0]}"
                            alt height="250" width="200"></div>
                    <div>${data.caption} </div>
                </div>
            </a>
      `
    })
    document.getElementById('container').innerHTML = str
    } else {
        alert("please login ")

    }

}


getUser();

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches(".drpbtn")) {
        const dropdowns = document.getElementsByClassName("dropdown-con");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

function logoutacc() {
    localStorage.removeItem("token");
    alert("Logout Successfully");
    location.reload();
}


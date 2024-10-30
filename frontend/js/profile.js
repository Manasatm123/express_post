
let id;

async function getuserdata() {
    const token = localStorage.getItem("token");
    try {
        
        const res = await fetch(`http://localhost:3003/api/getuserdata/`, {
            headers: { authorization: `Bearer ${token}` },
        });

        const user = await res.json();

        if (user && user.usr) {
            id = user.usr._id;
            console.log(id);
            console.log(user.usr);
            console.log(user.post);

            
            document.getElementById("userdetails").innerHTML = `
                <div class="userinfo">
                    <img src="${user.usr.pic}" alt="Profile Picture" id="img" height="100" width="100">
                    <h2>Name: ${user.usr.name}</h2>
                    <h2>Email: ${user.usr.email}</h2>
                    <h2>Phone: ${user.usr.phone}</h2>
                </div>
                <div>
                    <button onclick="deletedata()">Delete user</button>
                    <a href="../index.html"><button id="logoutacc" onclick="logoutacc()">Logout</button></a>
                </div>
            `;

           
            let postsHTML = '';
            user.post.forEach((data) => {
                
                const imageUrl = data.pics && data.pics.length > 0 ? data.pics[0] : 'default-image.jpg';
                
                postsHTML += `
                    <a href="../pages/showpost.html?id=${data._id}">
                        <div>
                            <img src="${imageUrl}" alt="Post Image" height="150" width="150">
                        </div>
                        <div>${data.caption}</div>
                        <div>${data.description}</div>
                    </a>
                `;
            });

            
            if (user.post.length === 0) {
                postsHTML = `<h3>No posts yet</h3>`;
            }

            document.getElementById('post-page').innerHTML = postsHTML;
        } else {
            console.error("User data is missing or improperly structured:", user);
            document.getElementById('post-page').innerHTML = `<h3>Error loading user data</h3>`;
        }
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        document.getElementById('post-page').innerHTML = `<h3>Error fetching user data</h3>`;
    }
}

getuserdata();

function addpost() {
    window.location.href = `../pages/addpost.html`;
}

function logoutacc() {
    localStorage.removeItem("token");
    alert("Logout Successfully");
    window.location.href = "../index.html";
}
  


function deletedata() {
    fetch(`http://localhost:3003/api/deleteUser/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
        console.log(res);
        if(res.status == 201) {
            alert("success");
            localStorage.removeItem("token")
            window.location.href="../index.html"
        }
        else{
            alert("error");
        }
    });
}
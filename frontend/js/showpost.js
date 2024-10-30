const url = window.location.href;
const urlParams = new URLSearchParams(url.split("?")[1]);
const id = urlParams.get("id");
console.log(id);

async function showPost() {
    const res = await fetch(`http://localhost:3003/api/showPost/${id}`)
    const data = await res.json()
    console.log(data.post);

    document.getElementById("post-caption").textContent = ` ${data.post.caption}`;
    document.getElementById("post-description").textContent = ` ${data.post.description}`;
    console.log(data.post.pics[0]);

    document.getElementById("img-preview").src = data.post.pics[0]

    const imagesContainer = document.getElementById("images-container");

    data.post.pics.forEach((imageSrc, index) => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = `Image ${index + 1}`;
        img.className = "post-image";
        img.addEventListener("mouseover", () => showPreview(imageSrc));
        imagesContainer.appendChild(img);
    });
}
showPost()

function showPreview(imageSrc) {
    document.getElementById("img-preview").src = imageSrc
}

function editPost() {
    window.location.href = `../pages/edit.html?id=${id}`
}



function deletepost() {
    fetch(`http://localhost:3003/api/deletepost/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    .then((res) => {
         console.log(res);
         const data=res.json()
        if (res.status == 201) {
            alert("success");
            window.location.href = "../pages/profile.html"
        }
        else {
            alert("error");
        }
    })
}



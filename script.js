let container = document.querySelector(".container");

function setCard(info = {}) {
    let div = document.createElement("div");
    div.className = "cat";
    div.id = `cat_${info.id}`;
    div.innerHTML = `       
    <div class="img" style="background-image: url(${info.img_link || './img/placeholder.png'})"></div>
    <div class="name"><b>${info.name || "!=Воробьянинов"}</b></div>    
    `;
    div.addEventListener("click", function() {
        window.location.replace(`./cat.html#${info.id}`);
    });
    container.appendChild(div);
}

let path = {
    getAll: "https://sb-cats.herokuapp.com/api/2/didika/show",
    getOne: "https://sb-cats.herokuapp.com/api/2/didika/show/",
    getIds: "https://sb-cats.herokuapp.com/api/2/didika/ids",
    add: "https://sb-cats.herokuapp.com/api/2/didika/add",
    upd: "https://sb-cats.herokuapp.com/api/2/didika/update/",
    del: "https://sb-cats.herokuapp.com/api/2/didika/delete/"
}

let cats = storage.getItem("cats");

if (!cats) {
fetch(path.getAll)
    .then(res => res.json())
    .then(result => {
    console.log(result);
    if (result.data) {
        storage.setItem("cats", JSON.stringify(result.data));
        result.data.forEach(cat => {
            setCard(cat);
        })
    }
    });
} else {
    JSON.parse(cats).forEach(cat => {
        setCard(cat);
    })
}

const deleteCatsLocal = function () {	
	storage.clear();	
	location.reload();
}
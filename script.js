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
    getAll: "http://sb-cats.herokuapp.com/api/2/didika/show",
    getOne: "http://sb-cats.herokuapp.com/api/2/didika/show/",
    getIds: "http://sb-cats.herokuapp.com/api/2/didika/ids",
    add: "http://sb-cats.herokuapp.com/api/2/didika/add",
    upd: "http://sb-cats.herokuapp.com/api/2/didika/update/",
    del: "http://sb-cats.herokuapp.com/api/2/didika/delete/"
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
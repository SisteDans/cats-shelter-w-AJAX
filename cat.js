const catId = window.location.hash.split("#")[1];

const setContent = function (obj) {
    return `
    <div class="card__page" id="cat_${obj.id}">
	 	<h1>${obj.name}</h1>	 
	 	<div class="card_age_row"><b>Возраст: </b>
		 <div name="age">${obj.age || 0}
		<button class="upd" onclick="updateRow(this)"></button>
		</div>        
		<b>Рейтинг: </b>
		<div name="rate">${obj.rate || 0}
		<button class="upd" onclick="updateRow(this)"></button>
		</div>		
		</div>				
    	<div class="person_pic ${obj.favourite ? "fav" : null}" name="cat_pic" style="background-image: url(${obj.img_link || './img/placeholder.png'})"></div>
    	<span class="description" name="description">${obj.description || "Тут пока ничего нет Т__Т"}
      	<button class="upd" onclick="updateRow(this)"></button>
    	</span>
	 	<button class="btn_delete" onclick="deleteCat(this)"><img src="./img/xmark-solid.svg" width=13px alt="Удалить котика" title="Удалить котика"></button>
	 </div>
    `
}

const getCat = async function(id) {
    let res = await fetch("https://sb-cats.herokuapp.com/api/2/didika/show/" + id);
    let ans = await res.json();
    document.querySelector("main").innerHTML = setContent(ans.data);
}

getCat(catId);

const updateRow = function(el) {
    let row = el.parentElement;
    let parent = row.parentElement;
    let clone = row.cloneNode(true);
    let name = row.getAttribute("name"); 
    let text = el.previousSibling.textContent.trim(); 
    parent.innerHTML = `
        <input name="${name}" value="${text}" class=${clone.className}>
        <button class="accept btn_default" onclick="acceptUpd(this)">Готово</button>
        <button class="cancel btn_default">Отмена</button>
    `;
    parent.querySelector(".cancel").addEventListener("click", function() {
        parent.innerHTML = "";
        parent.append(clone);
    })
}

const acceptUpd = function (el) {
    const val = el.previousElementSibling.value;
    const name = el.previousElementSibling.name;
    const parent = el.parentElement;
    let fav = el.previousElementSibling.classList.contains("fav");
    const body = {};
    body[name] = val;
    updateCat(catId, body, parent, fav);
}

const updateCat = async function(id, body, parent, fav) {
    let res = await fetch(`https://sb-cats.herokuapp.com/api/2/didika/update/${id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    });
    let ans = await res.json();
    let name = Object.keys(body)[0];
    parent.innerHTML = `
        <span name="${name}" class=${fav ? "fav" : null}>${body[name]} <button class = "upd" onclick="updateRow(this)"></button></span>
    `
}

let cats = localStorage.getItem("cats");

const deleteCat = function (el) {				
			el.parentElement.remove();
			let id = +el.parentElement.id.split("_")[1];
			let obj = JSON.parse(cats);
			let index = obj.findIndex(el => el.id === id); 
			obj.splice(index, 1); 
			localStorage.setItem("cats", JSON.stringify(obj)); 
			fetch(`https://sb-cats.herokuapp.com/api/2/didika/delete/${id}`, {
				method: 'DELETE',
			});
			setTimeout(function() {
				document.location.assign('./index.html');
			}, 200)
}
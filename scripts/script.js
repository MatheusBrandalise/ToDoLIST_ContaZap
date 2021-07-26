const buttonAdd = document.querySelector(".btnAdd");
const inputItem = document.querySelector(".inputTask");

var list = [];

let num = 0;
function geraUUID() {
  num++;
  return num;
}

loadList()

buttonAdd.addEventListener("click", function () {
  addItemList(inputItem.value);
  inputItem.value = "";
  inputItem.focus();
});

document.addEventListener("keypress", function (keyboard) {
  if (keyboard.key === "Enter") {
    buttonAdd.click();
  }
});

function addItemList(itemTxt) {
  if (itemTxt) {
    const UUID = geraUUID();
    const div = document.createElement(`div`);
    div.innerHTML = `<div class="master" id="${UUID}"><div class="itens"><input type="checkbox"><p>${itemTxt}</p></div><button class="btnDel" name="${UUID}" onclick="executeDel(this.name)" type="click"">Excluir</button></div>`;
    document.body.appendChild(div);
    list.push(itemTxt);
    localStorage.setItem("list", JSON.stringify(list));
  } else {
    alert("Favor inserir um item.");
  }
}

function loadList() {
  var listLocalStorage = localStorage.getItem("list");
  listLocalStorage = JSON.parse(listLocalStorage);

  if (listLocalStorage) {
    for (var i = 0; i < listLocalStorage.length; i++) {
      addItemList(listLocalStorage[i]);
    }
  }
}

function executeDel(event) {
  var delConfirm = confirm("Você realmente deseja excluir esta atividade?");
  if (delConfirm) {
    const a = document.getElementById(`${event}`);
    console.log(list)
    list.splice((event - 1), 1)
    localStorage.setItem("list", JSON.stringify(list));
    a.parentNode.removeChild(a);
  }

}
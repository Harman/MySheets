let body = document.querySelector("body");
body.spellcheck = false;

let menuBarPTags = document.querySelectorAll(".menu-bar p");

let columnTags = document.querySelector(".column-tags");
let rowNumbers = document.querySelector(".row-numbers");

let grid = document.querySelector(".grid");

for (let i = 0; i < menuBarPTags.length; i++) {
  menuBarPTags[i].addEventListener("click", function (e) {
    if (e.currentTarget.classList.contains("menu-bar-option-selected")) {
      e.currentTarget.classList.remove("menu-bar-option-selected");
    } else {
      for (let j = 0; j < menuBarPTags.length; j++) {
        if (menuBarPTags[j].classList.contains("menu-bar-option-selected"))
          menuBarPTags[j].classList.remove("menu-bar-option-selected");
      }

      e.currentTarget.classList.add("menu-bar-option-selected");
    }
  });
}

for (let i = 0; i < 26; i++) {
  let div = document.createElement("div");
  div.classList.add("column-tag-cell");
  div.innerText = String.fromCharCode(65 + i);
  columnTags.append(div);
}

for (let i = 1; i <= 100; i++) {
  let div = document.createElement("div");
  div.classList.add("row-number-cell");
  div.innerText = i;
  rowNumbers.append(div);
}

function createCells() {
  let row = document.createElement("div");
  row.classList.add("row");

  for (let i = 0; i < 26; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.contentEditable = true;
    row.append(cell);
  }

  grid.append(row);
}

for (let i = 0; i < 100; i++) {
  createCells();
}

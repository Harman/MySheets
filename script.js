let body = document.querySelector("body");
body.spellcheck = false;

let menuBarPTags = document.querySelectorAll(".menu-bar p");
let fileOptions = menuBarPTags[0];

let columnTags = document.querySelector(".column-tags");
let rowNumbers = document.querySelector(".row-numbers");

let formulaSelectedCell = document.querySelector("#selected-cell");
let formulaInput = document.querySelector("#complete-formula");

let oldCell;

let grid = document.querySelector(".grid");

let dataObj = {};

fileOptions.addEventListener("click", function (e) {
  if (e.currentTarget.classList.length == 0) {
    e.currentTarget.innerHTML = `File
    <span>
      <span>Clear</span>
      <span>Open</span>
      <span>Save</span>
    </span>`;

    let allFileOptions = e.currentTarget.querySelectorAll("span>span");

    allFileOptions[0].addEventListener("click", function () {
      let allCells = document.querySelectorAll(".cell");
      for (let i = 0; i < allCells.length; i++) {
        allCells[i].innerText = "";
        allCells[i].style.color = "black";
        allCells[i].style.backgroundColor = "white";
        allCells[i].style.fontSize = "medium";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.textAlign = "left";

        let cellAdd = allCells[i].getAttribute("data-address");

        dataObj[cellAdd] = {
          value: "",
          formula: "",
          upStream: [],
          downStream: [],
          fontSize: "medium",
          fontFamily: "Arial",
          fontWeight: "normal",
          color: "black",
          backgroundColor: "white",
          italics: "normal",
          underline: "none",
          textAlign: "left",
          fontToggles: {
            b: false,
            i: false,
            u: false,
          },
        };
      }
    });

    allFileOptions[1].addEventListener("click", function () {
      dataObj = JSON.parse(localStorage.getItem("sheet"));

      for (let j = 1; j <= 100; j++) {
        for (let i = 0; i < 26; i++) {
          let address = String.fromCharCode(i + 65) + j;
          let cellObj = dataObj[address];
          let cellOnUi = document.querySelector(`[data-address=${address}]`);
          cellOnUi.innerText = cellObj.value;
          cellOnUi.style.color = cellObj.color;
          cellOnUi.style.backgroundColor = cellObj.backgroundColor;
          cellOnUi.style.fontSize = cellObj.fontSize;
          cellOnUi.style.fontFamily = cellObj.fontFamily;
          cellOnUi.style.fontWeight = cellObj.fontWeight;
          cellOnUi.style.fontStyle = cellObj.italics;
          cellOnUi.style.textDecoration = cellObj.underline;
          cellOnUi.style.textAlign = cellObj.textAlign;
        }
      }
    });

    allFileOptions[2].addEventListener("click", function () {
      localStorage.setItem("sheet", JSON.stringify(dataObj));
    });
  }
});

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

for (let j = 1; j <= 100; j++) {
  let row = document.createElement("div");
  row.classList.add("row");

  for (let i = 0; i < 26; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    let address = String.fromCharCode(i + 65) + j;
    cell.setAttribute("data-address", address);

    dataObj[address] = {
      value: "",
      formula: "",
      upStream: [],
      downStream: [],
      fontSize: "medium",
      fontFamily: "Arial",
      fontWeight: "normal",
      color: "black",
      backgroundColor: "white",
      italics: "normal",
      underline: "none",
      textAlign: "left",
      fontToggles: {
        b: false,
        i: false,
        u: false,
      },
    };

    cell.addEventListener("click", function (e) {
      if (oldCell) {
        oldCell.classList.remove("grid-selected-cell");
      }
      e.currentTarget.classList.add("grid-selected-cell");
      let cellAdress = e.currentTarget.getAttribute("data-address");
      formulaSelectedCell.value = cellAdress;
      formulaInput.value = dataObj[cellAdress].formula;

      oldCell = e.currentTarget;
    });

    cell.addEventListener("input", function (e) {
      let address = e.currentTarget.getAttribute("data-address");
      dataObj[address].value = Number(e.currentTarget.innerText);
      dataObj[address].formula = "";

      let currCellUpstream = dataObj[address].upStream;
      for (let i = 0; i < currCellUpstream.length; i++) {
        removeFromUpstream(address, currCellUpstream[i]);
      }
      dataObj[address].upStream = [];

      let currCellDownstream = dataObj[address].downStream;
      for (let i = 0; i < currCellDownstream.length; i++) {
        updateDownStreamElements(currCellDownstream[i]);
      }

      dataObj[address].upStream = [];
    });

    cell.contentEditable = true;
    row.append(cell);
  }

  grid.append(row);
}

formulaInput.addEventListener("change", function (e) {
  let formula = e.currentTarget.value;

  let selectedCellAddress = oldCell.getAttribute("data-address");

  let formulaArr = formula.split(" ");
  let elementsArray = [];

  for (let i = 0; i < formulaArr.length; i++) {
    if (
      formulaArr[i] != "+" &&
      formulaArr[i] != "-" &&
      formulaArr[i] != "*" &&
      formulaArr[i] != "/" &&
      isNaN(Number(formulaArr[i]))
    ) {
      elementsArray.push(formulaArr[i]);
    }
  }

  let visitedCells = {};

  // if(checkCircularReference(elementsArray, selectedCellAddress, visitedCells)) {
  //   formulaInput.value = "CIRCULAR REFERENCE DETECTED!";
  //   window.alert("Err: Circular Reference! Recheck formula, cell dependent on itself");
  //   return;
  // }

  dataObj[selectedCellAddress].formula = formula;

  let oldUpstream = dataObj[selectedCellAddress].upStream;
  for (let k = 0; k < oldUpstream.length; k++) {
    removeFromUpstream(selectedCellAddress, oldUpstream[k]);
  }

  dataObj[selectedCellAddress].upStream = elementsArray;

  for (let j = 0; j < elementsArray.length; j++) {
    addToDownStream(selectedCellAddress, elementsArray[j]);
  }

  let valObj = {};
  for (let i = 0; i < elementsArray.length; i++) {
    let formulaDependency = elementsArray[i];
    valObj[formulaDependency] = dataObj[formulaDependency].value;
  }

  for (let j = 0; j < formulaArr.length; j++) {
    if (valObj[formulaArr[j]] != undefined) {
      formulaArr[j] = valObj[formulaArr[j]];
    }
  }
  formula = formulaArr.join(" ");
  let newValue = eval(formula);

  dataObj[selectedCellAddress].value = newValue;

  let selectedCellDownStream = dataObj[selectedCellAddress].downStream;
  for (let i = 0; i < selectedCellDownStream.length; i++) {
    updateDownStreamElements(selectedCellDownStream[i]);
  }

  oldCell.innerText = newValue;
  formulaInput.value = "";
});

function addToDownStream(tobeAdded, inWhichToAdd) {
  let reqDownStream = dataObj[inWhichToAdd].downStream;
  reqDownStream.push(tobeAdded);
  dataObj[inWhichToAdd].downStream = reqDownStream;
}

function removeFromUpstream(dependentCell, dependentedOnCell) {
  let newDownstream = [];

  let oldDownstream = dataObj[dependentedOnCell].downStream;
  for (let i = 0; i < oldDownstream.length; i++) {
    if (oldDownstream[i] != dependentCell) newDownstream.push(oldDownstream[i]);
  }

  dataObj[dependentedOnCell].downStream = newDownstream;
}

function updateDownStreamElements(currCellAdress) {
  let valObj = {};

  let currCellUpstream = dataObj[currCellAdress].upStream;

  for (let i = 0; i < currCellUpstream.length; i++) {
    let upstreamCellAdress = currCellUpstream[i];
    let upstreamCellValue = dataObj[upstreamCellAdress].value;

    valObj[upstreamCellAdress] = upstreamCellValue;
  }

  let currFormula = dataObj[currCellAdress].formula;
  let formulaArr = currFormula.split(" ");

  for (let j = 0; j < formulaArr.length; j++) {
    if (valObj[formulaArr[j]] != undefined) {
      formulaArr[j] = valObj[formulaArr[j]];
    }
  }

  currFormula = formulaArr.join(" ");
  let newValue = eval(currFormula);

  dataObj[currCellAdress].value = newValue;
  let cellOnUI = document.querySelector(`[data-address = ${currCellAdress}]`);
  cellOnUI.innerText = newValue;

  let currCellDownstream = dataObj[currCellAdress].downStream;
  if (currCellDownstream.length > 0) {
    for (let k = 0; k < currCellDownstream.length; k++) {
      updateDownStreamElements(currCellDownstream[k]);
    }
  }
}

// function checkCircularReference(elementsArray, selectedCellAddress, visitedCells) {
  
//   for(let i = 0; i < elementsArray.length; i++) {
//     if(elementsArray[i] == selectedCellAddress)
//       return true;
//     if(visitedCells[elementsArray[i]] == true)
//       return true;
    
//       else {
//         visitedCells[elementsArray[i]] = true;
//         checkCircularReference(dataObj[elementsArray[i]].upStream, selectedCellAddress, visitedCells);
//         visitedCells[elementsArray[i]] = false;
//       } 
//   }

//   return false;
// }

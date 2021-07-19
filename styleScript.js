let fontSpans = document.querySelectorAll(".b-u-i span");
let boldBtn = fontSpans[0];
let italicBtn = fontSpans[1];
let underlineBtn = fontSpans[2];

let fontFamilyBtn = document.querySelector("#cell-font-family");
let fontSizeBtn = document.querySelector("#cell-font-size");

let alignmentSpans = document.querySelectorAll(".alignment span");
let leftAlignBtn = alignmentSpans[0];
let centerAlignBtn = alignmentSpans[1];
let rightAlignBtn = alignmentSpans[2];

let colorSpans = document.querySelectorAll(".colors span");
let fontColorBtn = colorSpans[0];
let backgroundColorBtn = colorSpans[1];

boldBtn.addEventListener("click", function () {
  if (oldCell.style.fontWeight == "bold") {
    oldCell.style.fontWeight = "normal";
  } else {
    oldCell.style.fontWeight = "bold";
  }
  let address = oldCell.getAttribute("data-address");
  dataObj[address].fontWeight = oldCell.style.fontWeight;
});

italicBtn.addEventListener("click", function () {
  if (oldCell.style.fontStyle == "italic") {
    oldCell.style.fontStyle = "normal";
  } else {
    oldCell.style.fontStyle = "italic";
  }
  let address = oldCell.getAttribute("data-address");
  dataObj[address].italics = oldCell.style.fontStyle;
});

underlineBtn.addEventListener("click", function () {
  if (oldCell.style.textDecoration == "underline") {
    oldCell.style.textDecoration = "none";
  } else {
    oldCell.style.textDecoration = "underline";
  }
  let address = oldCell.getAttribute("data-address");
  dataObj[address].underline = oldCell.style.textDecoration;
});

fontFamilyBtn.addEventListener("change", function (e) {
  oldCell.style.fontFamily = e.currentTarget.value;
  let address = oldCell.getAttribute("data-address");
  dataObj[address].fontFamily = oldCell.style.fontFamily;
});

fontSizeBtn.addEventListener("change", function (e) {
  oldCell.style.fontSize = e.currentTarget.value;
  let address = oldCell.getAttribute("data-address");
  dataObj[address].fontSize = oldCell.style.fontSize;
});

leftAlignBtn.addEventListener("click", function () {
  oldCell.style.textAlign = "left";
  let address = oldCell.getAttribute("data-address");
  dataObj[address].textAlign = "left";
});

rightAlignBtn.addEventListener("click", function () {
  oldCell.style.textAlign = "right";
  let address = oldCell.getAttribute("data-address");
  dataObj[address].textAlign = "right";
});

centerAlignBtn.addEventListener("click", function () {
  oldCell.style.textAlign = "center";
  let address = oldCell.getAttribute("data-address");
  dataObj[address].textAlign = "center";
});

fontColorBtn.addEventListener("click", function () {
  let colorPicker = document.createElement("input");
  colorPicker.type = "color";

  colorPicker.addEventListener("change", function (e) {
    oldCell.style.color = e.currentTarget.value;
    let address = oldCell.getAttribute("data-address");
    dataObj[address].fontColor = e.currentTarget.value;
  });

  colorPicker.click();
});

backgroundColorBtn.addEventListener("click", function () {
  let colorPicker = document.createElement("input");
  colorPicker.type = "color";

  colorPicker.addEventListener("change", function (e) {
    oldCell.style.backgroundColor = e.currentTarget.value;
    let address = oldCell.getAttribute("data-address");
    dataObj[address].backgroundColor = e.currentTarget.value;
  });

  colorPicker.click();
});

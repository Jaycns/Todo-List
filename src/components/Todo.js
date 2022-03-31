import React from 'react'

function hideOverflow(element) {
  //Calculate lineHeight and maxLineCount for parent's height
  element.style.whiteSpace = "nowrap";
  var parent = element.parentNode;
  var maxLineCount = Math.floor(parent.clientHeight / element.clientHeight);
  var maxLineHeight = element.clientHeight * maxLineCount;
  element.style.whiteSpace = "normal";

  //Find and set maxLineHeight by replacing the overflow with an ellipses
  if (element.clientHeight > maxLineHeight) {
    var max = maxLineCount * element.style.lineHeight;
    for (var i = 0; element.clientHeight > maxLineHeight; i++) {
      element.innerHTML = element.textContent.slice(0, -2) + "&hellip;";
      i++;
      if (i === max) break;
    }
  }
}

hideOverflow(document.getElementById("foo"));

export default hideOverflow

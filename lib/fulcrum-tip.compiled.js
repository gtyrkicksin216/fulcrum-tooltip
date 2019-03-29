"use strict";

// TODO: Add optional args for fulcrum tooltip
// ie: const fulcrumTooltip = (tooltipStyle) => {
//    tootlipStyle = tooltipStyle || defaultStyles;
//    ...
// }
var fulcrumTooltip = function fulcrumTooltip(tooltipStyles) {
  var element = document.querySelectorAll("[tip-text]");

  var createTip = function createTip(element, message) {
    element.style.position = "relative";
    var tooltip = document.createElement("div");
    tooltip.classList.add("fulcrum-tooltip");
    var defaultStyles = "\n      position: fixed;\n      padding: 15px 20px;\n      color: white;\n      background: black;\n      max-width: 200px;\n    ";
    var tooltipStyle = tooltipStyles || defaultStyles;
    tooltip.style.cssText = tooltipStyle;
    tooltip.innerText = message;
    element.addEventListener("mouseenter", function () {
      showTip(tooltip, element);
    });
    element.addEventListener("mouseleave", function () {
      removeTip(tooltip);
    });
  };

  var showTip = function showTip(tooltip, parent) {
    document.lastChild.appendChild(tooltip);
    var tipSize = {
      width: tooltip.clientWidth,
      height: tooltip.clientHeight
    };
    var parentPosition = parent.getBoundingClientRect();
    tooltip.style.top = "".concat(parentPosition.top - (tipSize.height - parentPosition.height) / 2, "px");

    if (parentPosition.left + 50 + tipSize.width + 15 > window.innerWidth) {
      // to position on inline-start of element
      tooltip.style.left = "".concat(parentPosition.left - (tooltip.offsetWidth + 15), "px");
    } else {
      // to position on inline-end of element
      tooltip.style.left = "".concat(parentPosition.left + (parentPosition.width + 15), "px");
    }
  };

  var removeTip = function removeTip(tooltip) {
    tooltip.remove();
  };

  if (!!element) {
    element.forEach(function (element) {
      createTip(element, element.getAttribute("tip-text"));
    });
  }
};

(function () {
  fulcrumTooltip();
})();

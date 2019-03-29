// TODO: Add optional args for fulcrum tooltip
// ie: const fulcrumTooltip = (tooltipStyle) => {
//    tootlipStyle = tooltipStyle || defaultStyles;
//    ...
// }

const fulcrumTooltip = (tooltipStyles) => {
  let element = document.querySelectorAll(`[tip-text]`);
  console.log(element);

  const createTip = (element, message) => {
    element.style.position = `relative`;
    let tooltip = document.createElement(`div`);
    tooltip.classList.add(`fulcrum-tooltip`);
    const defaultStyles = `
      position: fixed;
      padding: 15px 20px;
      color: white;
      background: black;
      max-width: 200px;
    `;
    const tooltipStyle = tooltipStyles || defaultStyles;
    tooltip.style.cssText = tooltipStyle;
    tooltip.innerText = message;
    element.addEventListener(`mouseenter`, () => {
      showTip(tooltip, element);
    });
    element.addEventListener(`mouseleave`, () => {
      removeTip(tooltip);
    });
  }

  const showTip = (tooltip, parent) => {
    document.lastChild.appendChild(tooltip);
    const tipSize = {
      width: tooltip.clientWidth,
      height: tooltip.clientHeight,
    };
    const parentPosition = parent.getBoundingClientRect();
    tooltip.style.top = `${(parentPosition.top) - ((tipSize.height - parentPosition.height) / 2)}px`;
    if (((parentPosition.left + 50) + tipSize.width + 15) > window.innerWidth) {
      // to position on inline-start of element
      tooltip.style.left = `${parentPosition.left - (tooltip.offsetWidth + 15)}px`;
    } else {
      // to position on inline-end of element
      tooltip.style.left = `${parentPosition.left + (parentPosition.width + 15)}px`;
    }
  }

  const removeTip = (tooltip) => {
    tooltip.remove();
  }

  if (!!element) {
    for (let i = 0; i < element.length; i++) {
      createTip(element[i], element[i].getAttribute(`tip-text`));
    }
  }
}

(() => {
  fulcrumTooltip();
})();

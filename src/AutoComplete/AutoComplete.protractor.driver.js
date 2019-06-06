import inputTestkitFactory from '../Input/Input.protractor.driver';

const autoCompleteDriverFactory = component => {
  const inputElement = component.$('[data-hook="autocomplete--inputElement"]');
  const inputDriver = inputTestkitFactory(inputElement);

  return {
    click: () => inputDriver.click(),
    getInput: () => inputDriver.element(),
    getDropdown: () => component.$(`[data-hook="dropdown-layout-options"]`),
    getDropdownItem: index =>
      component
        .$$(`[data-hook="dropdown-layout-options"] div`)
        .get(index)
        .getText(),
    getDropdownItemsCount: () =>
      component
        .$$(`[data-hook="dropdown-layout-options"] div`)
        .getText()
        .count(),
    element: () => component,
  };
};

export default autoCompleteDriverFactory;

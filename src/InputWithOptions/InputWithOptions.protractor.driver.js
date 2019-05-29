import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.protractor.driver';
import inputDriverFactory from '../Input/Input.protractor.driver';

const driverFactory = component => {
  const dropdownLayoutDriver = dropdownLayoutDriverFactory(
    component.$('[data-hook="dropdown-layout-wrapper"]'),
  );
  const inputDriver = inputDriverFactory(
    component.$(`[data-hook="input-with-options--input"]`),
  );

  return {
    ...dropdownLayoutDriver,
    click: () => inputDriver.click(),
    getInput: () => inputDriver.element(),
    isFocused: () => inputDriver.isFocused(),
    element: () => component,
    /** Check wether the options dropdown is open */
    isOptionsShown: () => dropdownLayoutDriver.getDropdown().isDisplayed(),
    enterText: () => inputDriver.enterText(),
  };
};

export default driverFactory;

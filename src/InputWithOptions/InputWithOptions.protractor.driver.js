import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.protractor.driver';
import inputDriverFactory from '../Input/Input.private.protractor.driver';

const driverFactory = component => {
  const dropdownLayoutDriver = dropdownLayoutDriverFactory(
    component.$('[data-hook="dropdown-layout-wrapper"]'),
  );

  const inputDriver = inputDriverFactory(component.$('[data-input-parent]'));

  const clickInput = () => inputDriver.click();

  return {
    ...dropdownLayoutDriver,
    click: () => clickInput(),
    getInput: () => inputDriver.element(),
    getInputText: () => inputDriver.getText(),
    isFocused: () => inputDriver.isFocused(),
    element: () => component,
    /** Check wether the options dropdown is open */
    isOptionsShown: () => dropdownLayoutDriver.getDropdown().isDisplayed(),
    enterText: text => inputDriver.enterText(text),
    selectOptionAt: async index => {
      await clickInput();
      await dropdownLayoutDriver.selectOptionAt(index);
    },
    pressEnter: () => inputDriver.pressEnter(),
  };
};

export default driverFactory;

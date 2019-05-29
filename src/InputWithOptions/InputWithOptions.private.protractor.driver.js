import { protractorTestkitFactoryCreator } from 'wix-ui-test-utils/protractor';
import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.protractor.driver';
import inputDriverFactory from '../Input/Input.protractor.driver';
import inputWithOptionsDriverFactory from './InputWithOptions.protractor.driver';

export default component => {
  const dropdownLayoutDriver = dropdownLayoutDriverFactory(component);
  const inputDriver = inputDriverFactory(component);
  const inputWithOptionsDriver = inputWithOptionsDriverFactory(component);

  const input = inputDriver.element().$('input');

  return {
    ...inputWithOptionsDriver,
    element: () => component,
    pressEnter: () => input.sendKeys(protractor.Key.ENTER),
    selectItemById: i => dropdownLayoutDriver.selectItemById(i),
  };
};

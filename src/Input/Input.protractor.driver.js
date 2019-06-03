import { isFocused } from 'wix-ui-test-utils/protractor';

const inputDriverFactory = component => {
  // selector doesn't use data-hook since Input consumer can provide his own customInput
  const input = component.$('input');
  const clearButton = component.$('[data-hook="input-clear-button"]');

  return {
    element: () => component,
    enterText: text => input.clear().sendKeys(text),
    getText: () => input.getAttribute('value'),
    hasClearButton: () => clearButton.isPresent(),
    clickClear: () => clearButton.isPresent() && clearButton.click(),
    click: () => input.click(),
    isFocused: () => isFocused(input),
  };
};

export default inputDriverFactory;

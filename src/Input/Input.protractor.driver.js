import { isFocused } from 'wix-ui-test-utils/protractor';

const inputDriverFactory = component => {
  const input = component.$('[data-hook^="wsr-input"]'),
    clearButton = component.$('[data-hook="input-clear-button"]');

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

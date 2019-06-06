import { isFocused } from 'wix-ui-test-utils/protractor';
import { inputDataHook } from './input.private.protractor.driver';

const inputDriverFactory = component => {
  const input = component.$(`[data-hook="${inputDataHook}"]`);
  const clearButton = component.$('[data-hook="input-clear-button"]');

  return {
    element: () => component,
    enterText: text => input.clear().sendKeys(text),
    getText: () => input.getAttribute('value'),
    hasClearButton: () => clearButton.isPresent(),
    clickClear: () => clearButton.isPresent() && clearButton.click(),
    click: async () => await input.click(),
    isFocused: async () => isFocused(input),
  };
};

export default inputDriverFactory;

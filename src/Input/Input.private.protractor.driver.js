import inputDriverFacory from './Input.protractor.driver';

export const inputDataHookSelector = `[data-hook="wsr-input"], [data-hook="wsr-custom-input"]`;

const inputPrivateDriverFactory = component => {
  const inputDriver = inputDriverFacory(component);
  const input = component.$(inputDataHookSelector);

  return {
    ...inputDriver,
    pressEnter: () => input.sendKeys(protractor.Key.ENTER),
  };
};

export default inputPrivateDriverFactory;

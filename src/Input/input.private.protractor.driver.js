import inputDriverFacory from './Input.protractor.driver';

export const inputDataHook = 'wsr-input';

const inputPrivateDriverFactory = component => {
  const inputDriver = inputDriverFacory(component);
  const input = inputDriver.element().$(`[data-hook="${inputDataHook}"]`);

  return {
    ...inputDriver,
    pressEnter: () => input.sendKeys(protractor.Key.ENTER),
  };
};

export default inputPrivateDriverFactory;

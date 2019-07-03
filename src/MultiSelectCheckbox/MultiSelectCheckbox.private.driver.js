import multiSelectCheckboxDriverFactory from './MultiSelectCheckbox.driver';

export const multiSelectCheckboxPrivateDriverFactory = args => {
  const publicDriver = multiSelectCheckboxDriverFactory(args);
  return {
    ...publicDriver,
    inputDriver: {
      ...publicDriver.inputDriver,
      keyDown: event => publicDriver.inputDriver.keyDown(event.key),
    },
  };
};

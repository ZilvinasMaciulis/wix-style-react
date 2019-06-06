import inputWithOptionsDriverFactory from '../InputWithOptions/InputWithOptions.protractor.driver';
import { inputDriverFactory } from '../../testkit/protractor';

const customInputDataHook = 'multiselect--input';

const multiSelectDriverFactory = component => {
  const customInput = component.$(`[data-hook="${customInputDataHook}"]`);

  return {
    ...inputWithOptionsDriverFactory(component),
    // TODO: custom input logic can also be reused among components using Input with customInput
    click: () => customInput.click(),
    addTag: async () => {
      await component.click();
      await component.$('[data-hook^="dropdown-item"]:first-of-type').click();
    },
    element: () => component,
    getHeight: () => {
      return component.getSize().then(size => {
        return size.height;
      });
    },
    getWidth: () => {
      return component.getSize().then(size => {
        return size.width;
      });
    },
  };
};

export default multiSelectDriverFactory;

import inputWithOptionsDriverFactory from '../InputWithOptions/InputWithOptions.protractor.driver';
import { inputDriverFactory } from '../../testkit/protractor';

const multiSelectDriverFactory = component => {
  const inputComponent = component.$(`[data-hook="multiselect--input"]`);

  return {
    ...inputWithOptionsDriverFactory(component),
    click: () => inputComponent.click(),
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

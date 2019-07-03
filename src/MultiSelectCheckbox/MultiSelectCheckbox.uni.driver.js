import { inputWithOptionsUniDriverFactory } from '../InputWithOptions/InputWithOptions.uni.driver';

export const multiSelectCheckboxUniDriverFactory = (
  base,
  body,
  document,
  component,
) => {
  const {
    driver,
    inputDriver,
    dropdownLayoutDriver,
  } = inputWithOptionsUniDriverFactory(base, body);

  return {
    driver: {
      ...driver,
      async getNumOfLabels() {
        return (await this.getLabels()).length;
      },
      getLabels: async () =>
        (await inputDriver.getValue()).split(component.props.delimiter),
      async getLabelAt(index) {
        return (await this.getLabels())[index];
      },
    },
    inputDriver,
    dropdownLayoutDriver,
  };
};

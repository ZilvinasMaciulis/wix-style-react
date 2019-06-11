import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const stepperDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
  };
};

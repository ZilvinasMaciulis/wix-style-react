import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const sidebarDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
  };
};

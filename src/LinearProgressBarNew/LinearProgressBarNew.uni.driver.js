import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const linearProgressBarNewDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () =>
      base.$('[data-hook="linearProgressBarNew-count"]').text(),

    /** Click the button */
    clickButton: async () =>
      base.$('[data-hook="linearProgressBarNew-button"]').click(),

    /** Get the button's text */
    getButtonText: async () =>
      base.$('[data-hook="linearProgressBarNew-button"]').text(),
  };
};

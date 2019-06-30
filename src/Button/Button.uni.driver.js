import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import styles from 'wix-ui-core/dist/src/components/button-next/button-next.st.css';

const buttonNextDriverFactory = base => {
  const stylableUtil = new StylableUnidriverUtil(styles);

  return {
    ...baseUniDriverFactory(base),
    getButtonTextContent: async () => base.text(),
    isFocused: async () => document.activeElement === (await base.getNative()), // eslint-disable-line no-restricted-properties
    isButtonDisabled: async () => {
      // Using stylable state and not html 'disabled' attribute, since if 'href' exists, then we don't pu the 'disabled' attribute.
      return stylableUtil.hasStyleState(base, 'disabled');
    },
  };
};

export const buttonDriverFactory = buttonNextDriverFactory;

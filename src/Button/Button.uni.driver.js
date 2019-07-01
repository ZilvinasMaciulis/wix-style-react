import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import styles from 'wix-ui-core/dist/src/components/button-next/button-next.st.css';

const buttonNextDriverFactory = base => {
  const stylableUtil = new StylableUnidriverUtil(styles);

  return {
    ...baseUniDriverFactory(base),

    /** Returns button text */
    getButtonTextContent: async () => base.text(),

    /** Returns true if the button is focused */
    isFocused: async () => document.activeElement === (await base.getNative()), // eslint-disable-line no-restricted-properties

    /** Returns true if the button is disabled */
    isButtonDisabled: async () => {
      // Using stylable state and not html 'disabled' attribute, since if 'href' exists, then we don't pu the 'disabled' attribute.
      return stylableUtil.hasStyleState(base, 'disabled');
    },
    /** Returns true if the Button was configured with given theme */
    hasTheme: themeName => base.hasClass(themeName),
  };
};

export const buttonDriverFactory = buttonNextDriverFactory;

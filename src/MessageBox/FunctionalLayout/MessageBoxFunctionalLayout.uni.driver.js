import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import styles from './MessageBoxFunctionalLayout.scss';
import { ReactBase } from '../../../test/utils/unidriver';

const getElement = async elem => ((await elem.exists()) ? elem : null);

export const MessageBoxFunctionalLayoutUniDriverFactory = base => {
  const confirmationButton = () => base.$('[data-hook="confirmation-button"]');
  const cancellationButton = () => base.$('[data-hook="cancellation-button"]');
  const headerCloseButton = () => base.$('[data-hook="header-close-button"]');
  const body = () => base.$('[data-hook="message-box-body"]');

  const confirmationButtonReactBase = ReactBase(confirmationButton());
  const cancellationButtonReactBase = ReactBase(cancellationButton());

  return {
    ...baseUniDriverFactory(base),
    exists: () => base.exists(),
    getConfirmationButtonText: () => confirmationButton()._prop('textContent'),
    isConfirmationButtonPrefixIconExists: async () =>
      (await confirmationButton()._prop('innerHTML')).indexOf('prefix') !== -1,
    isConfirmationButtonSuffixIconExists: async () =>
      (await confirmationButton()._prop('innerHTML')).indexOf('suffix') !== -1,
    clickOnConfirmationButton: () => confirmationButtonReactBase.click(),
    getConfirmationButton: () => getElement(confirmationButton()),
    getCancellationButton: () => getElement(cancellationButton()),
    getHeaderCloseButton: () => getElement(headerCloseButton()),
    getCancellationButtonText: () =>
      ReactBase(cancellationButton()).textContent(),
    isCancellationButtonPrefixIconExists: async () =>
      (await cancellationButton()._prop('innerHTML')).indexOf('prefix') !== -1,
    isCancellationButtonSuffixIconExists: async () =>
      (await cancellationButton()._prop('innerHTML')).indexOf('suffix') !== -1,
    clickOnCancellationButton: () => cancellationButtonReactBase.click(),
    clickOnHeaderCloseButton: () => ReactBase(headerCloseButton()).click(),
    isThemeExist: theme => base.$(`.${theme}`).exists(),
    getFooter: () => getElement(base.$('[data-hook="message-box-footer"]')),
    getTitle: () =>
      ReactBase(base.$('[data-hook="header-layout-title"]')).textContent(),
    getChildBySelector: selector => getElement(base.$(selector)),
    isCancelEnable: async () =>
      Array.from(await cancellationButtonReactBase.getClassList()).indexOf(
        'disabled',
      ) === -1,
    isConfirmationEnable: async () =>
      Array.from(await confirmationButtonReactBase.getClassList()).indexOf(
        'disabled',
      ) === -1,
    toHaveBodyPadding: async () =>
      !Array.from(await ReactBase(body()).getClassList()).includes(
        `${styles.noPadding}`,
      ),
  };
};

import inputDriverFactory from '../../Input/Input.driver';

const editableRowDriverFactory = ({ element, eventTrigger }) => {
  const find = dataHook => element.querySelector(`[data-hook="${dataHook}"]`);

  const inputDriver = inputDriverFactory({
    element: find('edit-row-input'),
  });

  const approveButton = find('edit-row-approve-button');
  const cancelButton = find('edit-row-cancel-button');

  return {
    exists: () => !!element,
    isInputFocused: () => inputDriver.isFocus(),
    clickApprove: () => eventTrigger.click(approveButton),
    isApproveDisabled: () => {
      const disabled = approveButton.getAttribute('aria-disabled');
      return disabled === 'true';
    },
    clickCancel: () => eventTrigger.click(cancelButton),
    getText: () => inputDriver.getValue(),
    setText: text => inputDriver.enterText(text),
    keyDown: keyCode => inputDriver.trigger('keyDown', { keyCode }),
  };
};

export default editableRowDriverFactory;

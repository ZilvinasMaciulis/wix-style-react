import { editableSelectorUniDriverFactory } from './EditableSelector.uni.driver';

export const editableSelectorPrivateUniDriverFactory = base => {
  const publicDriver = editableSelectorUniDriverFactory(base);
  return {
    ...publicDriver,
    editButtonTextAt: async idx =>
      (await publicDriver.editButtonAt(idx)).text(),
    newRowButtonText: () => publicDriver.newRowButton().text(),
  };
};

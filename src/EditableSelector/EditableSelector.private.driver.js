import editableSelectorDriverFactory from './EditableSelector.driver';

export const editableSelectorPrivateDriverFactory = base => {
  const publicDriver = editableSelectorDriverFactory(base);
  return {
    ...publicDriver,
    editButtonTextAt: idx => publicDriver.editButtonAt(idx).textContent,
    newRowButtonText: () => publicDriver.newRowButton().textContent,
  };
};

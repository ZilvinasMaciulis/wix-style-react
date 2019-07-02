import { selectorUniDriverFactory } from '../Selector/Selector.uni.driver';
import { editableRowUniDriverFactory } from './EditableRow/EditableRow.uni.driver';
import { baseUniDriverFactory } from 'wix-ui-test-utils/unidriver';

export const editableSelectorUniDriverFactory = (base, body) => {
  const newRowButton = () => base.$('[data-hook="new-row-button-text"]');
  const selectorRowDriver = async index =>
    selectorUniDriverFactory(
      await base.$$('[data-hook="editable-selector-item"]').get(index),
      body,
    );
  const editButtonAt = index => base.$$('[data-hook="edit-item"]').get(index);
  const deleteButtonAt = index =>
    base.$$('[data-hook="delete-item"]').get(index);
  const editableRowDriver = () =>
    editableRowUniDriverFactory(base.$('[data-hook="edit-row-wrapper"]'), body);
  const isEditRowActive = async () =>
    !!(await base.$$('[data-hook="edit-row-wrapper"]').count());

  return {
    ...baseUniDriverFactory(base),
    items: () => {
      return base
        .$$('[data-hook="editable-selector-item"]')
        .map(selector => selectorUniDriverFactory(selector, body));
    },
    isEditing: () => isEditRowActive(),
    isEditingRow: async () =>
      (await isEditRowActive()) && editableRowDriver().getText(),
    isAddingRow: async () =>
      (await isEditRowActive()) && !(await editableRowDriver().getText()),
    newRowButton,
    deleteButtonAt,
    editButtonAt,
    addNewRow: async label => {
      await newRowButton().click();
      return editableRowDriver().setText(label);
    },
    editRow: async (index, label) => {
      const editButton = await editButtonAt(index);
      await editButton.click();
      return editableRowDriver().setText(label);
    },
    deleteRow: async index => (await deleteButtonAt(index)).click(),
    startAdding: () => newRowButton().click(),
    startEditing: async index => (await editButtonAt(index)).click(),
    clickApprove: () => editableRowDriver().clickApprove(),
    clickCancel: () => editableRowDriver().clickCancel(),
    title: () => base.$('[data-hook="editable-selector-title"] > span').text(),
    toggleItem: async index => (await selectorRowDriver(index)).toggle(),
  };
};

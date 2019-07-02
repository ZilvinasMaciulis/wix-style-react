import React from 'react';
import sinon from 'sinon';
import EditableSelector from './EditableSelector';

import {
  createRendererWithDriver,
  createRendererWithUniDriver,
} from '../../test/utils/react';
import { editableSelectorPrivateUniDriverFactory } from './EditableSelector.private.uni.driver';
import { editableSelectorPrivateDriverFactory } from './EditableSelector.private.driver';

describe('EditableSelector', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(editableSelectorPrivateDriverFactory));
  });

  describe('[async]', () => {
    runTests(
      createRendererWithUniDriver(editableSelectorPrivateUniDriverFactory),
    );
  });

  function runTests(render) {
    let props;

    const createDriver = jsx => render(jsx).driver;

    beforeEach(() => {
      props = {};
    });

    it('should have a list of selectors', async () => {
      props.options = [{ title: 'a' }, { title: 'b' }];
      const driver = createDriver(<EditableSelector {...props} />);
      expect(await driver.items()).toHaveLength(props.options.length);
    });

    it('should have all selector data ', async () => {
      props.options = [{ isSelected: true, title: 'Shir', onToggle: () => {} }];
      const driver = createDriver(<EditableSelector {...props} />);
      const selector = (await driver.items())[0];
      expect(await selector.isChecked()).toEqual(props.options[0].isSelected);
      expect(await selector.titleTextDriver().getText()).toEqual(
        props.options[0].title,
      );
    });

    it('should render a title', async () => {
      props.title = "I'm a Title";
      const driver = createDriver(<EditableSelector {...props} />);
      expect(await driver.title()).toEqual(props.title);
    });

    it('should render "add row" button', async () => {
      props.newRowLabel = 'add new!';
      const driver = createDriver(<EditableSelector {...props} />);
      expect(await driver.newRowButtonText()).toEqual(props.newRowLabel);
    });

    it('should call onOptionAdded', async () => {
      props.onOptionAdded = sinon.spy();
      const driver = createDriver(<EditableSelector {...props} />);
      const newTitle = 'new option';
      await driver.addNewRow(newTitle);
      await driver.clickApprove();
      expect(props.onOptionAdded.calledWith({ newTitle })).toEqual(true);
    });

    it('should exit editing mode after approve click', async () => {
      const driver = createDriver(<EditableSelector {...props} />);
      const label = 'new option';
      await driver.addNewRow(label);
      await driver.clickApprove();
      expect(await driver.isEditing()).toEqual(false);
    });

    it('should exit editing mode after cancel click', async () => {
      const driver = createDriver(<EditableSelector {...props} />);
      const label = 'new option';
      await driver.addNewRow(label);
      await driver.clickCancel();
      expect(await driver.isEditing()).toEqual(false);
    });

    it('should have edit and delete actions for each option', async () => {
      props.options = [{ isSelected: false, title: 'Shir' }];
      const driver = createDriver(<EditableSelector {...props} />);
      expect(await driver.deleteButtonAt(0)).not.toBeUndefined();
      expect(await driver.editButtonAt(0)).not.toBeUndefined();
    });

    it('should get "edit" button text from props', async () => {
      props.options = [{ isSelected: false, title: 'Shir' }];
      props.editButtonText = 'Edit Label';
      const driver = createDriver(<EditableSelector {...props} />);
      expect(await driver.editButtonTextAt(0)).toEqual(props.editButtonText);
    });

    it('should call onOptionEdit', async () => {
      props.options = [
        { isSelected: false, title: 'Shir', onToggle: () => {} },
      ];
      props.onOptionEdit = sinon.spy();
      const driver = createDriver(<EditableSelector {...props} />);
      const newTitle = 'yo';
      await driver.editRow(0, newTitle);
      await driver.clickApprove();
      expect(props.onOptionEdit.calledWith({ newTitle, index: 0 })).toEqual(
        true,
      );
    });

    it('should call onOptionToggle', async () => {
      props.options = [{ isSelected: false, title: 'Shir' }];
      props.onOptionToggle = sinon.spy();
      const driver = createDriver(<EditableSelector {...props} />);
      await driver.toggleItem(0);
      expect(props.onOptionToggle.calledOnce).toEqual(true);
      expect(props.onOptionToggle.calledWith(0)).toBe(true);
    });

    it('should call onOptionDelete', async () => {
      props.options = [
        { isSelected: false, title: 'Shir', onToggle: () => {} },
      ];
      props.onOptionDelete = sinon.spy();
      const driver = createDriver(<EditableSelector {...props} />);
      await driver.deleteRow(0);
      expect(props.onOptionDelete.calledWith({ index: 0 })).toEqual(true);
    });

    it('should use checkbox toggles', async () => {
      props.toggleType = 'checkbox';
      props.options = [{ isSelected: false, title: 'Shir' }];
      const driver = createDriver(<EditableSelector {...props} />);
      const selector = (await driver.items())[0];
      expect(await selector.toggleType()).toEqual(props.toggleType);
    });

    it('should use radio toggles', async () => {
      props.toggleType = 'radio';
      props.options = [{ isSelected: false, title: 'Shir' }];
      const driver = createDriver(<EditableSelector {...props} />);
      const selector = (await driver.items())[0];
      expect(await selector.toggleType()).toEqual(props.toggleType);
    });

    it('should stop edit when click add new row', async () => {
      props.options = [
        { isSelected: false, title: 'Shir', onToggle: () => {} },
      ];
      const driver = createDriver(<EditableSelector {...props} />);
      const newTitle = 'yo';
      expect(await driver.isEditingRow()).toBeFalsy();
      await driver.startEditing(0, newTitle);
      expect(await driver.isEditingRow()).toBeTruthy();
      await driver.startAdding();
      expect(await driver.isEditingRow()).toBeFalsy();
      expect(await driver.isAddingRow()).toBeTruthy();
    });

    it('should stop add when click edit row', async () => {
      props.options = [
        { isSelected: false, title: 'Shir', onToggle: () => {} },
      ];
      const driver = createDriver(<EditableSelector {...props} />);
      const newTitle = 'yo';
      expect(await driver.startAdding()).toBeFalsy();
      await driver.startAdding();
      expect(await driver.isAddingRow()).toBeTruthy();
      await driver.startEditing(0, newTitle);
      expect(await driver.isEditingRow()).toBeTruthy();
      expect(await driver.isAddingRow()).toBeFalsy();
    });
  }
});

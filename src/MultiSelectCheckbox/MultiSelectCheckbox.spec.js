import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import multiSelectCheckboxDriverFactory from './MultiSelectCheckbox.driver';
import MultiSelectCheckbox from './MultiSelectCheckbox';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import { multiSelectCheckboxTestkitFactory } from '../../testkit';
import { multiSelectCheckboxTestkitFactory as enzymeMultiSelectCheckboxTestkitFactory } from '../../testkit/enzyme';
import { mount } from 'enzyme';

describe('multiSelectCheckbox', () => {
  const createDriver = createDriverFactory(multiSelectCheckboxDriverFactory);
  const options = [
    { value: 'Alabama', id: 'Alabama-1' },
    { value: 'Alaska', id: 'Alaska' },
    { value: <div>Arkansas</div>, id: 'Arkansas', label: 'Arkansan Label' },
    { value: 'Arkansas', id: 'Arkansas' },
    { value: 'California', id: 'California' },
    { value: 'California2', id: 'California2' },
    { value: 'California3', id: 'California3' },
    { value: 'California4', id: 'California4' },
    { value: 'California5', id: 'California5' },
    { value: 'California6', id: 'California6' },
    { value: 'California7', id: 'California7', disabled: true },
    { value: 'Two words', id: 'Two words' },
  ];

  it('should not be editable', () => {
    const { driver } = createDriver(<MultiSelectCheckbox options={options} />);
    expect(driver.isEditable()).toBe(false);
  });

  it('should show dropdown on input click', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox options={options} />,
    );
    inputDriver.click();
    expect(dropdownLayoutDriver.isShown()).toBe(true);
  });

  it('should not show dropdown on input click when disabled', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox disabled options={options} />,
    );
    inputDriver.click();
    expect(dropdownLayoutDriver.isShown()).toBe(false);
  });

  it('should close dropdown on second input click', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox options={options} />,
    );
    inputDriver.click();
    inputDriver.click();
    expect(dropdownLayoutDriver.isShown()).toBe(false);
  });

  it('should close dropdown on Escape', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox options={options} />,
    );
    inputDriver.click();
    inputDriver.focus();
    inputDriver.keyDown('Escape');

    expect(dropdownLayoutDriver.isShown()).toBe(false);
  });

  const OPEN_DROPDOWN_CHARS = [
    { key: 'ArrowDown', keyCode: 40, which: 40 },
    { key: 'Enter', keyCode: 13, which: 13 },
    { key: 'Space', keyCode: 32, which: 32 },
  ];
  OPEN_DROPDOWN_CHARS.forEach(charData => {
    it(`should show dropdown on input focus and press on ${charData.key}`, () => {
      const { inputDriver, dropdownLayoutDriver } = createDriver(
        <MultiSelectCheckbox options={options} />,
      );
      inputDriver.focus();
      inputDriver.trigger('keyDown', charData);

      expect(dropdownLayoutDriver.isShown()).toBe(true);
    });
  });

  it('should not lose Focus or close the list on selection with a mouse click', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox options={options} />,
    );

    inputDriver.focus();
    dropdownLayoutDriver.clickAtOption(0);

    expect(inputDriver.isFocus()).toBe(true);
  });

  it('should display a selectedOptions separetaed by default delimiter', () => {
    const selectedOptions = [options[0].id, options[1].id];
    const { inputDriver } = createDriver(
      <MultiSelectCheckbox
        options={options}
        selectedOptions={selectedOptions}
      />,
    );
    expect(inputDriver.getValue()).toBe(
      `${options[0].value}, ${options[1].value}`,
    );
  });

  it('should display a selectedOptions separetaed by custom delimiter', () => {
    const selectedOptions = [options[0].id, options[1].id];
    const delimiter = ';';
    const { inputDriver } = createDriver(
      <MultiSelectCheckbox
        options={options}
        selectedOptions={selectedOptions}
        delimiter={delimiter}
      />,
    );
    expect(inputDriver.getValue()).toBe(
      `${options[0].value};${options[1].value}`,
    );
  });

  it('should not display the selectedOptions that not included in options', () => {
    const selectedOptions = [options[0].id, 'NOT_LEGAL_ID', options[1].id];
    const { inputDriver } = createDriver(
      <MultiSelectCheckbox
        options={options}
        selectedOptions={selectedOptions}
      />,
    );
    expect(inputDriver.getValue()).toBe(
      `${options[0].value}, ${options[1].value}`,
    );
  });

  it('should use provided valueParser that will enable handling option with a component in value', () => {
    const specialOption = options.find(x => typeof x.value !== 'string');
    const selectedOptions = [specialOption.id];
    const valueParser = option =>
      typeof option.value === 'string' ? option.value : option.label;

    const { driver } = createDriver(
      <MultiSelectCheckbox
        valueParser={valueParser}
        options={options}
        selectedOptions={selectedOptions}
      />,
    );
    expect(driver.getLabelAt(0)).toBe(specialOption.label);
  });

  it('should contain specific selected values', () => {
    const selectedOptions = [options[0].id, options[1].id];

    const { driver } = createDriver(
      <MultiSelectCheckbox
        options={options}
        selectedOptions={selectedOptions}
      />,
    );
    expect(driver.getNumOfLabels()).toBe(selectedOptions.length);
    expect(driver.getLabelAt(0)).toBe(options[0].value);
    expect(driver.getLabelAt(1)).toBe(options[1].value);
  });

  it('should not close dropdown after clicking on an option', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox options={options} />,
    );
    inputDriver.click();
    dropdownLayoutDriver.clickAtOption(0);
    expect(dropdownLayoutDriver.isShown()).toBe(true);
  });

  it('should call onSelect when selecting unselected option', () => {
    const onSelect = jest.fn();
    const { dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox options={options} onSelect={onSelect} />,
    );
    dropdownLayoutDriver.clickAtOption(0);
    expect(onSelect.mock.calls).toHaveLength(1);
    expect(onSelect).toHaveBeenCalledWith(options[0].id, options[0]);
  });

  it('should not call onSelect when selecting a disabled option', () => {
    const onSelect = jest.fn();
    const indexOfDisabled = options.findIndex(opt => opt.disabled);
    const { dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox options={options} onSelect={onSelect} />,
    );
    dropdownLayoutDriver.clickAtOption(indexOfDisabled);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should call onDeselect when selecting selected option', () => {
    const selectedOptions = [options[0].id, options[1].id];
    const onDeselect = jest.fn();
    const { dropdownLayoutDriver } = createDriver(
      <MultiSelectCheckbox
        options={options}
        selectedOptions={selectedOptions}
        onDeselect={onDeselect}
      />,
    );
    dropdownLayoutDriver.clickAtOption(0);
    expect(onDeselect).toHaveBeenCalledWith(options[0].id, options[0]);
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const selectedOptions = [options[0].id];
      const wrapper = div.appendChild(
        ReactTestUtils.renderIntoDocument(
          <div>
            <MultiSelectCheckbox
              dataHook={dataHook}
              selectedOptions={selectedOptions}
              options={options}
            />
          </div>,
        ),
      );
      const multiSelectCheckboxTestkit = multiSelectCheckboxTestkitFactory({
        wrapper,
        dataHook,
      });
      expect(multiSelectCheckboxTestkit.driver.exists()).toBe(true);
      expect(multiSelectCheckboxTestkit.inputDriver.exists()).toBe(true);
      expect(
        multiSelectCheckboxTestkit.dropdownLayoutDriver.exists(),
      ).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const selectedOptions = [options[0].id];
      const wrapper = mount(
        <MultiSelectCheckbox
          dataHook={dataHook}
          selectedOptions={selectedOptions}
          options={options}
        />,
      );
      const multiSelectCheckboxTestkit = enzymeMultiSelectCheckboxTestkitFactory(
        { wrapper, dataHook },
      );
      expect(multiSelectCheckboxTestkit.driver.exists()).toBe(true);
      expect(multiSelectCheckboxTestkit.inputDriver.exists()).toBe(true);

      expect(
        multiSelectCheckboxTestkit.dropdownLayoutDriver.exists(),
      ).toBeTruthy();
    });
  });
});

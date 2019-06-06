import React from 'react';
import PropTypes from 'prop-types';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import Input from '../Input';
import Checkbox from '../Checkbox/Checkbox';
import styles from './MultiSelectCheckbox.scss';

const OPEN_DROPDOWN_CHARS = [13 /*Enter*/, 40 /*ArrowDown*/, 32 /*Spacebar*/];

class MultiSelectCheckbox extends InputWithOptions {
  wrapOptionsWithCheckbox(options) {
    const newOptions = options.map(option => ({
      ...option,
      value: this.wrapWithCheckBox(option, this.isSelectedId(option.id)),
    }));
    return newOptions;
  }

  wrapWithCheckBox(option, isSelected) {
    return (
      <Checkbox checked={isSelected} disabled={option.disabled}>
        {option.value}
      </Checkbox>
    );
  }

  isSelectedId(optionId) {
    return this.props.selectedOptions.indexOf(optionId) !== -1;
  }

  dropdownAdditionalProps() {
    return {
      options: this.wrapOptionsWithCheckbox(this.props.options),
      closeOnSelect: false,
      selectedHighlight: false,
    };
  }

  selectedOptionsToText() {
    const selectedOptionsText = this.props.selectedOptions
      .map(selectedOption =>
        this.props.options.find(option => option.id === selectedOption),
      )
      .filter(selectedOption => selectedOption)
      .map(this.props.valueParser)
      .join(this.props.delimiter);
    return selectedOptionsText;
  }

  inputAdditionalProps() {
    const inputDataHook = 'multiselect-checkbox--input';

    return {
      readOnly: false,
      disableEditing: true,
      inputElement: (
        <Input
          textOverflow="ellipsis"
          disableEditing
          dataHook={inputDataHook}
        />
      ),
      dataHook: inputDataHook,
      value: this.selectedOptionsToText(),
    };
  }

  inputClasses() {
    return styles.showPointer;
  }

  _onSelect(option) {
    this.showOptions();

    if (this.closeOnSelect()) {
      this.setState({ showOptions: false });
    }

    // The option object is not the original since it was injected a checkbox
    const originalOption = this.props.options.find(op => option.id === op.id);
    if (this.isSelectedId(originalOption.id)) {
      this.props.onDeselect &&
        this.props.onDeselect(originalOption.id, originalOption);
    } else {
      this.props.onSelect &&
        this.props.onSelect(originalOption.id, originalOption);
    }
  }

  _onInputClicked(event) {
    this.state.showOptions ? this.hideOptions() : this.showOptions();
    if (this.props.onInputClicked) {
      this.props.onInputClicked(event);
    }
  }

  _onKeyDown(event) {
    if (
      !this.dropdownLayout._onKeyDown(event) &&
      OPEN_DROPDOWN_CHARS.indexOf(event.keyCode) !== -1
    ) {
      event.preventDefault();
      this.showOptions();
    }
  }

  _onFocus(e) {
    if (this.props.disabled) {
      return;
    }
    this._focused = true;
    this.setState({ isEditing: false });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }
}

MultiSelectCheckbox.propTypes = {
  ...InputWithOptions.propTypes,

  /** Array of objects. Objects must have an Id and can can include *value* and *node*. If value is '-', a divider will be rendered instead. */
  options: PropTypes.array,

  /** The selected options ids. */
  selectedOptions: PropTypes.array,

  /** A callback function called whenever the user selects a single option. The function receives the id of the selected option as the first argument, and the actual option object as the second argument.. */
  onSelect: PropTypes.func,

  /** A callback function to be called when an option was unchecked. The function receives the id of the unselected option as the first argument, and the actual option object as the second argument. */
  onDeselect: PropTypes.func,

  /** delimiter between the selected options that will be displayed in the input. */
  delimiter: PropTypes.string,
};

MultiSelectCheckbox.defaultProps = {
  ...InputWithOptions.defaultProps,
  delimiter: ', ',
  selectedOptions: [],
  closeOnSelect: false,
};

export default MultiSelectCheckbox;

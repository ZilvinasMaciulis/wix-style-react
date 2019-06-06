import React from 'react';
import classNames from 'classnames';
import defaultTo from 'lodash/defaultTo';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { allValidators, extendPropTypes } from '../utils/propTypes';
import Input from '../Input/Input';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import styles from './Dropdown.scss';

const NO_SELECTED_ID = null;

class Dropdown extends InputWithOptions {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      selectedId: NO_SELECTED_ID,

      ...Dropdown.getNextState(
        props,
        defaultTo(props.selectedId, props.initialSelectedId),
      ),
    };
  }

  isSelectedIdControlled() {
    return typeof this.props.selectedId !== 'undefined';
  }

  static isOptionsEqual(optionsA, optionsB) {
    return isEqual(sortBy(optionsA, 'id'), sortBy(optionsB, 'id'));
  }

  getSelectedId() {
    return this.isSelectedIdControlled()
      ? this.props.selectedId
      : this.state.selectedId;
  }

  _onInputClicked(event) {
    if (
      this.state.showOptions &&
      Date.now() - this.state.lastOptionsShow > 200
    ) {
      this.hideOptions();
    } else {
      this.showOptions();
    }

    if (this.props.onInputClicked) {
      this.props.onInputClicked(event);
    }
  }

  /**
   * Updates the value by the selectedId.
   * If selectedId is not found in options, then value is NOT changed.
   */
  static getNextState(props, selectedId) {
    if (typeof selectedId !== 'undefined') {
      const option = props.options.find(_option => {
        return _option.id === selectedId;
      });

      if (option) {
        const value = props.valueParser(option) || '';
        return { value, selectedId };
      } else {
        return { value: '', selectedId: NO_SELECTED_ID };
      }
    }
    return {};
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedId !== this.props.selectedId ||
      !Dropdown.isOptionsEqual(this.props.options, nextProps.options)
    ) {
      this.setState(
        Dropdown.getNextState(
          nextProps,
          defaultTo(nextProps.selectedId, this.state.selectedId),
        ),
      );
    }
  }

  inputClasses() {
    return classNames(styles.showPointer, {
      [styles.noBorder]: this.props.noBorder,
    });
  }

  dropdownAdditionalProps() {
    return {
      selectedId: this.getSelectedId(),
      value: this.state.value,
      tabIndex: -1,
    };
  }

  inputAdditionalProps() {
    const inputDataHook = 'dropdown--input';

    return {
      readOnly: false,
      disableEditing: true,
      value: this.state.value,
      inputElement: <Input dataHook={inputDataHook} />,
      dataHook: inputDataHook,
    };
  }

  _onSelect(option) {
    if (!this.isSelectedIdControlled()) {
      this.setState({
        value: this.props.valueParser(option),
        selectedId: option.id,
      });
    }
    super._onSelect(option);
  }

  _onChange(event) {
    this.setState({ value: event.target.value });
    super._onChange(event);
  }
}

Dropdown.propTypes = {
  ...InputWithOptions.propTypes,
  /** Sets the selected option id. (Implies Controlled mode) */
  selectedId: InputWithOptions.propTypes.selectedId,
  /** An initial selected option id. (Implies Uncontrolled mode) */
  initialSelectedId: InputWithOptions.propTypes.selectedId,
};

extendPropTypes(Dropdown, {
  selectedId: allValidators(
    InputWithOptions.propTypes.selectedId,
    (props, propName) => {
      if (
        props[propName] !== undefined &&
        props['initialSelectedId'] !== undefined
      ) {
        return new Error(
          `'selectedId' and 'initialSelectedId' cannot both be used at the same time.`,
        );
      }
    },
  ),
});

Dropdown.defaultProps = InputWithOptions.defaultProps;
Dropdown.displayName = 'Dropdown';

export default Dropdown;

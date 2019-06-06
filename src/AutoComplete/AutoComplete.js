import React from 'react';
import { func } from 'prop-types';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import Input from '../Input';

class AutoComplete extends InputWithOptions {
  static propTypes = {
    ...InputWithOptions.propTypes,
    predicate: func,
  };

  static defaultProps = {
    ...InputWithOptions.defaultProps,
    predicate: () => true,
  };

  inputAdditionalProps() {
    const dataHook = 'autocomplete--inputElement';

    return {
      inputElement: <Input dataHook={dataHook} />,
      dataHook,
    };
  }

  dropdownAdditionalProps() {
    const { options, predicate, emptyStateMessage } = this.props;
    const filterFunc = this.state.isEditing ? predicate : () => true;
    const filtered = options.filter(filterFunc);

    if (emptyStateMessage && filtered.length === 0) {
      return {
        options: [
          {
            id: 'empty-state-message',
            value: emptyStateMessage,
            disabled: true,
          },
        ],
      };
    } else {
      return { options: filtered };
    }
  }
}

export default AutoComplete;

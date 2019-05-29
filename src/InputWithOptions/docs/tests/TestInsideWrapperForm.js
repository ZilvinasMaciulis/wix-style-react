/* eslint-disable no-console */
import React from 'react';
import InputWithOptions from 'wix-style-react/InputWithOptions';

import { insideFormStorySettings as storySettings } from '../storySettings';

const options = [{ id: '0', value: 'First Option' }];

class TestInsideWrapperForm extends React.Component {
  state = {
    selectedId: -1,
    submitted: false,
  };

  render() {
    const onChange = event => {
      this.setState({ value: event.target.value });
    };

    const onSelect = option => {
      const value = option.value;
      this.setState({
        value,
        selectedId: option.id,
      });
    };

    const onManuallyInput = () => {
      this.setState({
        selectedId: -1,
      });
    };

    return (
      <form onSubmit={() => this.setState({ submitted: true })}>
        <InputWithOptions
          options={options}
          selectedId={this.state.selectedId}
          value={this.state.value}
          onChange={onChange}
          onSelect={onSelect}
          onManuallyInput={onManuallyInput}
          highlight
          dataHook={storySettings.dataHook}
        />
        <div data-hook="was-submitted">
          {this.setState.submitted ? 'yes' : 'no'}
        </div>
      </form>
    );
  }
}

export default TestInsideWrapperForm;

import React from 'react';
import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings } from './storySettings';
import { linearProgressBarTestkitFactory } from '../../../testkit';
import LinearProgressBar from '..';

const TestStories = storiesOf(getTestStoryKind(storySettings), module);
const { testStoryNames, dataHook } = storySettings;

TestStories.add(testStoryNames.tooltipOnErrorProgressIndication, () => (
  <InteractiveEyeTest />
));

const createLinearProgressBarDriver = dataHook =>
  linearProgressBarTestkitFactory({
    wrapper: document.body,
    dataHook,
  });

class InteractiveEyeTest extends React.PureComponent {
  componentDidMount() {
    const driver = createLinearProgressBarDriver(dataHook);
    driver.getTooltip().mouseEnter();
  }

  render() {
    return (
      <div style={{ padding: '40px' }}>
        <LinearProgressBar
          dataHook={dataHook}
          errorMessage="some error message"
          error
          showProgressIndication
          value={20}
        />
      </div>
    );
  }
}

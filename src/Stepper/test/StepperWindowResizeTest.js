import React from 'react';
import { storiesOf } from '@storybook/react';

import Stepper from '..';
import { TESTS_PREFIX } from '../../../stories/storiesHierarchy';
import { storySettings } from './storySettings';

const steps7 = [
  { text: 'This is a long step name', type: 'completed' },
  { text: 'This is a long step name' },
  { text: 'This is a long step name', type: 'error' },
  { text: 'This is a long step name' },
  { text: 'This is a long step name', type: 'error' },
  { text: 'This is a long step name' },
  { text: 'This is a long step name', type: 'disabled' },
];

const kind = `${TESTS_PREFIX}/${storySettings.category}/${
  storySettings.storyName
}`;

storiesOf(kind, module).add(storySettings.testStoryNames.WINDOW_RESIZE, () => (
  <div style={{ marginLeft: 100, marginTop: 100 }}>
    <Stepper steps={steps7} activeStep={2} dataHook={storySettings.dataHook} />
  </div>
));

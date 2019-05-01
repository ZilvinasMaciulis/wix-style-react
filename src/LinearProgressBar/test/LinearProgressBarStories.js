import React from 'react';
import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings } from './storySettings';

import LinearProgressBar from '..';

const TestStories = storiesOf(getTestStoryKind(storySettings), module);
const { testStoryNames, dataHook } = storySettings;

TestStories.add(testStoryNames.tooltipOnErrorProgressIndication, () => (
  <LinearProgressBar
    dataHook={dataHook}
    errorMessage="some error message"
    error
    showProgressIndication
    value={20}
  />
));

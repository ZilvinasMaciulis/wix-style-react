/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import {
  storySettings,
  insideFormStorySettings,
  testStories,
} from './storySettings';
import TestTabSwitches from './tests/TestTabSwitches';
import TestInsideWrapperForm from './tests/TestInsideWrapperForm';

const kind = getTestStoryKind({
  storyName: storySettings.storyName,
  category: storySettings.category,
});

const TestContainer = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f4f7',
    }}
  >
    {children}
  </div>
);

storiesOf(kind, module).add(testStories.tabsSwitches, () => (
  <TestContainer>
    <input data-hook="input-for-focus-1" />
    <TestTabSwitches />
    <input data-hook="input-for-focus-2" />
  </TestContainer>
));

const insideFormKind = getTestStoryKind({
  storyName: insideFormStorySettings.storyName,
  category: insideFormStorySettings.category,
});

storiesOf(insideFormKind, module).add(testStories.insideWrappingForm, () => (
  <TestInsideWrapperForm />
));

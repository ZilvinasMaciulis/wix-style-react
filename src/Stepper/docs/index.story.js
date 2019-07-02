/* eslint-disable no-console */
import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  code as baseCode,
  playground,
  api,
} from 'wix-storybook-utils/Sections';
import SectionHelper from 'wix-style-react/SectionHelper';
import { Layout, Cell } from 'wix-style-react/Layout';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import MaynSteps from '!raw-loader!./examples/ManySteps';
import FourSteps from '!raw-loader!./examples/FourSteps';
import Stepper from '..';

import testkitDesc from './testkit.md';

const code = config =>
  baseCode({
    components: {
      Stepper,
      steps7: steps7,
      steps4: steps4,
      onClick,
      ...allComponents,
    },
    autoRender: false,
    ...config,
  });

const steps7 = [
  { text: 'This is a long step name', type: 'completed' },
  { text: 'This is a long step name' },
  { text: 'This is a long step name', type: 'error' },
  { text: 'This is a long step name' },
  { text: 'This is a long step name', type: 'error' },
  { text: 'This is a long step name' },
  { text: 'This is a long step name', type: 'disabled' },
];

const steps4 = [
  { text: 'First step', type: 'completed' },
  { text: 'Second step' },
  { text: 'Third step', type: 'error' },
  { text: 'Forth step' },
];

const onClick = id => console.log(`step ${id} was clicked`);

export default {
  category: storySettings.category,
  storyName: 'Stepper',

  component: Stepper,
  componentPath: '..',

  componentProps: {
    buttonText: 'Hello World!',
    dataHook: storySettings.dataHook,
    steps: steps7,
    activeStep: 2,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Stepper/',
      component: (
        <Layout>
          <Cell span={6}>
            <SectionHelper title="Work in progress" appearance="danger">
              Component is currently in development and should not be used yet.
            </SectionHelper>
          </Cell>
        </Layout>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: 'Stepper',
            }),
          ]),

          columns([
            importExample("import Stepper from 'wix-style-react/Stepper';"),
          ]),

          divider(),

          title('Examples'),

          code({
            title: 'Stepper with 7 steps inside card',
            compact: true,
            source: MaynSteps,
          }),

          code({
            title: 'Stepper with 4 steps inside card',
            compact: true,
            source: FourSteps,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [description(testkitDesc)] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};

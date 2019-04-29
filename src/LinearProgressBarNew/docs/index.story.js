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
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import LinearProgressBarNew from '..';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'LinearProgressBarNew',

  component: LinearProgressBarNew,
  componentPath: '..',

  componentProps: {
    errorMessage: 'some error message',
    value: 20,
    light: false,
    error: false,
    showProgressIndication: false,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/LinearProgressBarNew/',
      component: (
        <div style={{ width: '50%' }}>
          <LinearProgressBarNew value={45} showProgressIndication />
        </div>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'This line here should briefly describe component in just a sentence or two. It should be short and easy to read.',
            }),
          ]),

          columns([
            importExample(
              "import LinearProgressBar from 'wix-style-react/LinearProgressBar';",
            ),
          ]),

          divider(),

          title('Examples'),

          columns([
            description({
              title: 'Simple Usage',
              text: 'A simple example with compact preview',
            }),

            code({
              compact: true,
              source: '<LinearProgressBarNew value={20} />',
            }),
          ]),

          code({
            title: 'Full Interactive Preview',
            description: 'A non compact version of same code example as above',
            source:
              '<LinearProgressBarNew showProgressIndication value={20} />',
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};

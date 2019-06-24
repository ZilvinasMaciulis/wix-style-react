import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/LiveCodeExample';
import {
  header,
  title as sectionTitle,
  description,
  table,
  importExample,
  columns,
  code,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

import Add from '../../src/new-icons/Add';
import Edit from '../../src/new-icons/Edit';
import Delete from '../../src/new-icons/Delete';
import More from '../../src/new-icons/More';
import { Layout, Cell } from 'wix-style-react/Layout';
import IconButton from 'wix-style-react/IconButton';
import PopoverMenu from 'wix-style-react/beta/PopoverMenu';
import SectionHelper from 'wix-style-react/SectionHelper';

const menuItems = [
  <PopoverMenu.MenuItem text="Add" prefixIcon={<Add />} />,
  <PopoverMenu.MenuItem text="Edit" prefixIcon={<Edit />} />,
  <PopoverMenu.MenuItem text="Delete" prefixIcon={<Delete />} />,
];

const commonProps = {
  appendTo: 'window',
  triggerElement: ({ onClick }) => (
    <IconButton onClick={onClick} priority="secondary">
      <More />
    </IconButton>
  ),
};

const liveCode = config =>
  code({
    previewProps: {
      style: { backgroundColor: '#f0f4f7' },
    },
    compact: true,
    components: baseScope,
    ...config,
  });

const example = ({ source, ...rest }) =>
  columns([description({ ...rest }), liveCode({ source })]);

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    header({
      component: (
        <Layout gap={10} alignItems="center">
          <Cell>
            <PopoverMenu {...commonProps}>{menuItems}</PopoverMenu>
          </Cell>
          <Cell span={6}>
            <SectionHelper title="Next Generation PopoverMenu">
              To enable new generation read more on Tooltip's API docs
            </SectionHelper>
          </Cell>
        </Layout>
      ),

      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),

    columns([
      description({
        title: 'Description',
        text: `Tooltips can be attached to any active element (icons, text links, buttons, etc.) on a page. They provide descriptions or explanations for their paired element. Thus, tooltips are highly contextual and specific and don’t explain the bigger picture or entire task flow.`,
      }),
    ]),

    columns([
      table({
        title: 'Included Components',
        rows: [
          [
            <LinkTo
              kind="BETA"
              story="PopoverMenu"
            >{`<PopoverMenu />`}</LinkTo>,
            'content element',
          ],
          [
            <LinkTo
              kind="5. Buttons"
              story="5.2 IconButton"
            >{`<IconButton/>`}</LinkTo>,
            'trigger element',
          ],
        ],
      }),
    ]),

    importExample(examples.importExample),

    sectionTitle('Examples'),
  ],
};

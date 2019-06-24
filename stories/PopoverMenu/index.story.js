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
    components: { ...baseScope, PopoverMenu },
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
              To use new generation PopoverMenu make sure to import it from
              /beta folder
            </SectionHelper>
          </Cell>
        </Layout>
      ),

      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),

    columns([
      description({
        title: 'Description',
        text: `A PopoverMenu is a menu component that can be open with given button component. It is often styled as a typical push button with a downward pointing arrow  to hint that activating the button will display a menu.`,
      }),
    ]),

    columns([
      table({
        title: 'Menu Component',
        rows: [
          [
            <LinkTo
              kind="BETA"
              story="PopoverMenu"
            >{`<PopoverMenu />`}</LinkTo>,
            'content element',
          ],
        ],
      }),
    ]),

    columns([
      table({
        title: 'Trigger Elements',
        rows: [
          [
            <LinkTo kind="5. Buttons" story="5.1 Button">{`<Button/>`}</LinkTo>,
            'trigger element',
          ],
          [
            <LinkTo
              kind="5. Buttons"
              story="5.2 IconButton"
            >{`<IconButton/>`}</LinkTo>,
            'trigger element',
          ],
          [
            <LinkTo
              kind="5. Buttons"
              story="5.3 TextButton"
            >{`<TextButton/>`}</LinkTo>,
            'trigger element',
          ],
        ],
      }),
    ]),

    importExample(examples.importExample),

    sectionTitle('Examples'),

    ...[
      {
        title: 'Plain Example',
        text: 'Plain example of PopoverMenu usage.',
        source: examples.basic,
      },
      {
        title: 'Skins',
        text: 'PopoverMenu items supports `dark` and `destructive` skins.',
        source: examples.skins,
      },
      {
        title: 'PrefixIcon',
        text: 'PopoverMenu items supports prefixIcon',
        source: examples.prefix,
      },
      {
        title: 'TextSize',
        text: 'PopoverMenu can enable small text size for its items.',
        source: examples.size,
      },
      {
        title: 'Divider',
        text: 'PopoverMenu items can be divided by using Divider.',
        source: examples.divider,
      },
      {
        title: 'Ellipsis',
        text:
          'All PopoverMenu items by default gets ellipsed, but wrapping text can be enabled too.',
        source: examples.wrap,
      },
    ].map(example),
  ],
};

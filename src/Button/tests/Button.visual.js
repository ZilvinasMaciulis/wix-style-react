import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../Button';
import Box from 'wix-style-react/Box';
import AddChannel from '../../new-icons/AddChannel';
import { SIZES, SKINS, PRIORITY } from '../constants';

const defaultProps = {
  children: 'Button',
};

const skins = Object.values(SKINS).filter(skin => skin !== SKINS.premiumLight);

const sizes = Object.values(SIZES);

const test = (it, props) => ({ it, props });

const tests = [
  {
    describe: 'Primary Skins',
    its: skins.map(skin => test(skin, { skin, priority: PRIORITY.primary })),
  },
  {
    describe: 'Secondary Skins',
    its: skins
      // box background for these skins (tests below)
      .filter(skin => skin !== SKINS.transparent)
      .map(skin => test(skin, { skin, priority: PRIORITY.secondary })),
  },
  {
    describe: 'Sizes',
    its: sizes.map(size => test(size, { size })),
  },
  {
    describe: 'Affixes',
    its: sizes.map(size =>
      test(size, {
        size,
        prefixIcon: <AddChannel />,
        suffixIcon: <AddChannel />,
      }),
    ),
  },
  {
    describe: 'Render As',
    its: [
      {
        it: 'as anchor',
        props: { as: 'a' },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`Button/${describe}`, module).add(it, () => (
      <Button {...defaultProps} {...props} />
    ));
  });
});

const testWithBoxWrapper = [
  { boxBackground: 'B20', skin: SKINS.transparent },
  { boxBackground: 'D10', skin: SKINS.premiumLight },
];

testWithBoxWrapper.forEach(({ skin, boxBackground }) => {
  storiesOf(`Button/Secondary Skins`, module).add(skin, () => (
    <Box backgroundColor={boxBackground} width={100} padding="3px">
      <Button {...defaultProps} priority={PRIORITY.secondary} skin={skin} />
    </Box>
  ));
});

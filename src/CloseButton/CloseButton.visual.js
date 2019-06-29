import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseButton from '.';
import { SIZES, SKINS } from './constants';
import { Layout, Cell } from 'wix-style-react/Layout';
import {
  renderChildrenNodes,
  createVisualTests,
} from '../../test/utils/visualTest/visualTestingUtils';

const defaultProps = {
  disabled: false,
  size: SIZES.small,
  skin: SKINS.standard,
};

const tests = [
  {
    describe: 'Sizes',
    ...createVisualTests({
      propName: 'size',
      propValues: SIZES,
    }),
  },
  {
    describe: 'Skins',
    ...createVisualTests({
      propName: 'skin',
      propValues: SKINS,
    }),
  },
];

tests.forEach(({ describe, its }) => {
  const children = renderChildrenNodes(
    { its },
    <CloseButton {...defaultProps} />,
  );

  storiesOf(`CloseButton/${describe}`, module).add(describe, () => (
    <Layout>
      <Cell span={children.length}>{children}</Cell>
    </Layout>
  ));
});

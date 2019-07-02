import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseButton from '../index';
import { SIZES, SKINS } from '../constants';
import { Layout, Cell } from 'wix-style-react/Layout';
import {
  renderChildrenNodes,
  createVisualTestsByProp,
} from '../../../test/utils/visualTest/visualTestingUtils';

const defaultProps = {
  disabled: false,
  size: SIZES.small,
  skin: SKINS.standard,
};

const tests = [
  {
    describe: 'Sizes',
    ...createVisualTestsByProp({
      propName: 'size',
      propValues: SIZES,
    }),
  },
  {
    describe: 'Skins',
    ...createVisualTestsByProp({
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

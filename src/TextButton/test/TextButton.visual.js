import React from 'react';
import { storiesOf } from '@storybook/react';
import TextButton from '../TextButton';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import ChevronDownSmall from 'wix-ui-icons-common/ChevronDownSmall';

const sizes = ['tiny', 'small', 'medium'];

const defaultProps = { children: 'Text Button' };
const smallAffix = {
  prefixIcon: <ChevronDownSmall />,
  suffixIcon: <ChevronDownSmall />,
};
const regularAffix = {
  prefixIcon: <ChevronDown />,
  suffixIcon: <ChevronDown />,
};

const tests = [
  {
    describe: 'size',
    its: sizes.map(size => {
      return { it: size, props: { size } };
    }),
  },
  {
    describe: 'affix',
    its: sizes.map(size => {
      if (size === 'medium') {
        return { it: size, props: { size, ...regularAffix } };
      }

      return { it: size, props: { size, ...smallAffix } };
    }),
  },
  {
    describe: 'underline',
    its: sizes.map(size => {
      return { it: size, props: { size, underline: 'always' } };
    }),
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`TextButton/${describe}`, module).add(it, () => (
      <TextButton {...props} {...defaultProps} />
    ));
  });
});

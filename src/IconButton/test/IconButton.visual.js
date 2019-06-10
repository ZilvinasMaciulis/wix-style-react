import React from 'react';
import { storiesOf } from '@storybook/react';
import IconButton from '../IconButton';
import More from '../../new-icons/More';
import MoreSmall from '../../new-icons/MoreSmall';

const tests = [
  {
    describe: 'size',
    its: [
      {
        it: 'tiny',
        props: { size: 'tiny', children: <MoreSmall /> },
      },
      {
        it: 'small',
        props: { size: 'small', children: <MoreSmall /> },
      },
      {
        it: 'medium',
        props: { size: 'medium', children: <More /> },
      },
      {
        it: 'large',
        props: { size: 'large', children: <More /> },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`IconButton/${describe}`, module).add(it, () => (
      <IconButton {...props} />
    ));
  });
});

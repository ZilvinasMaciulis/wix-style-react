import React from 'react';
import { storiesOf } from '@storybook/react';
import ListItemAction from '..';
import Edit from 'wix-ui-icons-common/Edit';

const commonProps = {
  title: 'The Title',
};

const tests = [
  {
    describe: 'sanity',
    its: [
      {
        it: 'default',
      },
    ],
  },
  {
    describe: 'prefixIcon',
    its: [
      {
        it: 'with icon',
        props: {
          prefixIcon: <Edit />,
        },
      },
      {
        it: 'without icon',
      },
    ],
  },
  {
    describe: 'skin',
    its: [
      {
        it: 'standard',
        props: {
          skin: 'standard',
          prefixIcon: <Edit />,
        },
      },
      {
        it: 'dark',
        props: {
          skin: 'dark',
          prefixIcon: <Edit />,
        },
      },
      {
        it: 'destructive',
        props: {
          skin: 'destructive',
          prefixIcon: <Edit />,
        },
      },
    ],
  },
  {
    describe: 'disabled',
    its: [
      {
        it: 'disabled',
        props: {
          disabled: true,
          prefixIcon: <Edit />,
        },
      },
    ],
  },
  {
    describe: 'size',
    its: [
      {
        it: 'small',
        props: {
          size: 'small',
          prefixIcon: <Edit />,
        },
      },
      {
        it: 'medium',
        props: {
          size: 'medium',
          prefixIcon: <Edit />,
        },
      },
    ],
  },
  {
    describe: 'as',
    its: [
      {
        it: 'div',
        props: {
          as: 'div',
          prefixIcon: <Edit />,
        },
      },
      {
        it: 'button',
        props: {
          as: 'button',
          prefixIcon: <Edit />,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`ListItemAction/${describe}`, module).add(it, () => (
      <ListItemAction {...commonProps} {...props} />
    ));
  });
});

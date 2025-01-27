import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '.';
import Button from '../Button';
import Text from '../Text';
import { Col, Container, Row } from '../Grid';

const tests = [
  {
    describe: 'subtitle',
    its: [
      {
        it: 'ellipsis with suffix',
        props: {
          suffix: (
            <Button
              onClick={() => alert('Clicked')}
              size="small"
              theme="fullblue"
            >
              Click
            </Button>
          ),
          subtitle: (
            <Text ellipsis>
              {' '}
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with
            </Text>
          ),
        },
      },
      {
        it: 'ellipsis without suffix',
        props: {
          subtitle: (
            <Text ellipsis>
              {' '}
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with
            </Text>
          ),
        },
      },
      {
        it: 'short',
        props: {
          suffix: (
            <Button
              onClick={() => alert('Clicked')}
              size="small"
              theme="fullblue"
            >
              Click
            </Button>
          ),
          subtitle: <Text>I am short subtitle</Text>,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`Card/${describe}`, module).add(it, () => (
      <div style={{ background: '#F0F4F7', padding: 30 }}>
        <Container>
          <Row>
            <Col span={6}>
              <Card>
                <Card.Header
                  title="Card header"
                  subtitle={props.subtitle}
                  suffix={props.suffix}
                />

                <Card.Content>sdf</Card.Content>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    ));
  });
});

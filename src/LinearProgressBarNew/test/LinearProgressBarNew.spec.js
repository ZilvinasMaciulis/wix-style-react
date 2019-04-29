import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import LinearProgressBarNew from '../LinearProgressBarNew';
import { linearProgressBarNewPrivateDriverFactory } from './LinearProgressBarNew.private.uni.driver';

describe('LinearProgressBarNew', () => {
  const render = createRendererWithUniDriver(
    linearProgressBarNewPrivateDriverFactory,
  );

  afterEach(() => {
    cleanup();
  });

  // it('should render', async () => {
  //   const { driver } = render(<LinearProgressBarNew />);
  //
  //   expect(await driver.exists()).toBeTruthy();
  //   expect(await driver.getButtonText()).toEqual('Click me!');
  // });
  //
  // it('should increment', async () => {
  //   const { driver } = render(<LinearProgressBarNew />);
  //
  //   await driver.clickButton();
  //   await driver.clickButton();
  //
  //   expect(await driver.getCountText()).toEqual(
  //     'You clicked this button even number (2) of times',
  //   );
  // });
  //
  // it('should allow changing the button text', async () => {
  //   const { driver } = render(<LinearProgressBarNew buttonText="Press me" />);
  //
  //   expect(await driver.getButtonText()).toEqual('Press me');
  // });
});

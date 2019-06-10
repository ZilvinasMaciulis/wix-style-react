import React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../../test/utils/unit';

import Stepper from '../Stepper';
import { stepperPrivateDriverFactory } from './Stepper.private.uni.driver';

describe('Stepper', () => {
  const render = createRendererWithUniDriver(stepperPrivateDriverFactory);

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<Stepper />);

    expect(await driver.exists()).toBeTruthy();
  });
});

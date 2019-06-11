import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';
import Stepper from '../Stepper';
import { stepperPrivateDriverFactory } from './Stepper.private.uni.driver';

describe('Stepper', () => {
  const render = createUniDriverFactory(stepperPrivateDriverFactory);

  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('Stepper', () => {
    it('should warn when active prop is not passed to stepper', async () => {
      render(<Stepper />);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Warning: Failed prop type: The prop `active` is marked as required in `Stepper`, but its value is `undefined`.',
        ),
      );
    });

    it('should warn when active prop is not a number', async () => {
      render(<Stepper active={{}} />);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Warning: Failed prop type: Invalid prop `active` of type `object` supplied to `Stepper`, expected `number`',
        ),
      );
    });

    it('should warn when a step does not contain a text', async () => {
      // expect(true).toEqual(true);
      render(<Stepper active={1} steps={[{}]} />);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Warning: Failed prop type: The prop `steps[0].text` is marked as required in `Stepper`, but its value is `undefined`',
        ),
      );
    });

    it('should warn when steps length is less than 2', async () => {
      expect(true).toEqual(true); // todo: impl
    });

    it('should warn when steps length is bigger than 7', async () => {
      expect(true).toEqual(true); // todo: impl
    });
  });
});

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
    describe('Props validation', () => {
      it('should warn when activeStep prop is not passed to stepper', async () => {
        render(<Stepper />);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            'Warning: Failed prop type: The prop `activeStep` is marked as required in `Stepper`, but its value is `undefined`.',
          ),
        );
      });

      it('should warn when activeStep prop is not a number', async () => {
        render(<Stepper activeStep={{}} />);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            'Warning: Failed prop type: Invalid prop `activeStep` of type `object` supplied to `Stepper`, expected `number`',
          ),
        );
      });

      it('should warn when a step does not contain a text', async () => {
        render(<Stepper activeStep={1} steps={[{}]} />);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            'Warning: Failed prop type: The prop `steps[0].text` is marked as required in `Stepper`, but its value is `undefined`',
          ),
        );
      });

      it('should warn when steps length is less than 2', async () => {
        render(<Stepper activeStep={1} steps={[{ text: 'step 1' }]} />);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            'Warning: Failed prop: The prop `steps` in `Stepper` has to be an array in the size of 2 to 7.',
          ),
        );
      });

      it('should warn when steps length is bigger than 7', async () => {
        const steps8 = [
          { text: 'step 1' },
          { text: 'step 2' },
          { text: 'step 3' },
          { text: 'step 4' },
          { text: 'step 5' },
          { text: 'step 6' },
          { text: 'step 7' },
          { text: 'step 8' },
        ];
        render(<Stepper activeStep={1} steps={steps8} />);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            'Warning: Failed prop: The prop `steps` in `Stepper` has to be an array in the size of 2 to 7.',
          ),
        );
      });
    });
  });
});

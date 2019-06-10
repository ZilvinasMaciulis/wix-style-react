import { stepperDriverFactory as publicDriverFactory } from '../Stepper.uni.driver';

export const stepperPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};

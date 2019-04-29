import { linearProgressBarNewDriverFactory as publicDriverFactory } from '../LinearProgressBarNew.uni.driver';

export const linearProgressBarNewPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};

import { createTestStoryUrl } from '../../../test/utils/storybook-helpers';

import { eyesItInstance } from '../../../test/utils/eyes-it';
import { storySettings } from '../docs/storySettings';
import { testStories } from './testStories';

describe('DateInput', () => {
  const eyes = eyesItInstance();

  eyes.it('should render DateInput with variations', async () => {
    const testStoryUrl = testName =>
      createTestStoryUrl({ ...storySettings, testName });
    await browser.get(testStoryUrl(testStories.dateInputVariations));
  });
});

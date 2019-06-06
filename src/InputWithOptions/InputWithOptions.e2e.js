import inputWithOptionsTestkitFactory from './InputWithOptions.protractor.driver';
import { $, browser } from 'protractor';
import {
  isFocused,
  waitForVisibilityOf,
  protractorTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';
import { sleep } from 'wix-ui-test-utils/react-helpers';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import {
  storySettings,
  insideFormStorySettings,
  testStories,
} from './docs/storySettings';

describe('InputWithOptions', () => {
  let driver;

  const focusOnInputWithOptions = async () => {
    const firstElement = $(`[data-hook="input-for-focus-1"]`);

    await pressTab();
    expect(await isFocused(firstElement)).toEqual(true);

    await pressTab();
    expect(await driver.isFocused()).toEqual(true);
  };

  describe('Component', () => {
    const { dataHook } = storySettings;

    beforeEach(async () => {
      await navigateToTestUrl(testStories.tabsSwitches, storySettings);
      driver = protractorTestkitFactoryCreator(inputWithOptionsTestkitFactory)({
        dataHook,
      });
      await waitForVisibilityOf(driver.element(), `Cant find ${dataHook}`);
    });

    it('should move out focus of input if nothing is pressed / selected', async () => {
      await focusOnInputWithOptions();
      await pressTab();
      expect(await driver.isFocused()).toEqual(false);
    });

    it('should move out focus of input when have manual text option', async () => {
      await focusOnInputWithOptions();

      await driver.enterText('some option');
      await pressTab();
      expect(await driver.isFocused()).toEqual(false);
    });
  });

  describe('Inside a wrapping form', () => {
    beforeEach(async () => {
      await navigateToTestUrl(
        testStories.insideWrappingForm,
        insideFormStorySettings,
      );
      driver = protractorTestkitFactoryCreator(inputWithOptionsTestkitFactory)({
        dataHook: insideFormStorySettings.dataHook,
      });

      await waitForVisibilityOf(
        driver.element(),
        `Cant find ${insideFormStorySettings.dataHook}`,
      );
    });

    it('should NOT submit the form on Enter key press', async () => {
      await driver.click();
      await driver.selectOptionAt(0);
      await driver.pressEnter();

      await sleep(500);
      const wasFormSubmitted =
        $('[data-hook="was-submitted"]').getText() === 'yes';

      expect(wasFormSubmitted).toBe(false);
    });
  });
});

const navigateToTestUrl = async (
  testName,
  { category, storyName, dataHook },
) => {
  const testStoryUrl = createTestStoryUrl({
    category,
    storyName,
    dataHook,
    testName,
  });
  await browser.get(testStoryUrl);
};

const pressTab = () =>
  browser
    .actions()
    .sendKeys(protractor.Key.TAB)
    .perform();

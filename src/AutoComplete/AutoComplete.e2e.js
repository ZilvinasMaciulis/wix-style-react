import { eyesItInstance } from '../../test/utils/eyes-it';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import { autoCompleteTestkitFactory } from '../../testkit/protractor';
import eventually from 'wix-eventually';

describe('AutoComplete', () => {
  const storyUrl = createStoryUrl({
    kind: 'Components',
    story: 'AutoComplete',
  });
  const dataHook = 'story-autocomplete';

  const eyes = eyesItInstance();

  eyes.it('should open autocomplete when it focused', async () => {
    const driver = autoCompleteTestkitFactory({ dataHook });

    await browser.get(storyUrl);

    await waitForVisibilityOf(driver.element(), 'Cannot find AutoComplete');

    expect(await driver.getDropdown().isDisplayed()).toBe(false);

    await driver.click();

    await eventually(async () => {
      expect(await driver.getDropdown().isDisplayed()).toBe(true);
    });
    expect(await driver.getDropdownItemsCount()).toEqual(5);

    await driver.getNativeInput().sendKeys('first');
    expect(await driver.getDropdownItemsCount()).toEqual(1);

    expect(await driver.getDropdownItem(0)).toBe('First option');
  });

  eyes.it('should choose one of autocomplete items', async () => {
    const driver = autoCompleteTestkitFactory({ dataHook });

    await browser.get(storyUrl);

    await waitForVisibilityOf(driver.element(), 'Cannot find AutoComplete');
    await driver.click();
    await driver.getDropdownItem(2).click();

    expect(await driver.getNativeInput().getAttribute('value')).toBe(
      'Third option',
    );
  });
});

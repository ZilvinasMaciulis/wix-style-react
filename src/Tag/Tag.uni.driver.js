import { baseUniDriverFactory } from '../../test/utils/unidriver';
import { dataHooks } from './Tag.helpers';

export const tagUniDriverFactory = base => {
  const thumb = base.$('.thumb');
  const removeButton = base.$(`[data-hook="${dataHooks.removeButton}"]`);

  return {
    ...baseUniDriverFactory(base),
    isTiny: () => base.hasClass('tinySize'),
    isSmall: () => base.hasClass('smallSize'),
    isMedium: () => base.hasClass('mediumSize'),
    isLarge: () => base.hasClass('largeSize'),
    isStandardTheme: () => base.hasClass('standardTheme'),
    isWarningTheme: () => base.hasClass('warningTheme'),
    isErrorTheme: () => base.hasClass('errorTheme'),
    isDarkTheme: () => base.hasClass('darkTheme'),
    isRemovable: () => removeButton.exists(),
    removeTag: () => removeButton.click(),
    click: () => base.click(),
    isThumbExists: () => thumb.exists(),
    isDisabled: () => base.hasClass('disabled'),
    getLabel: () => base.text(),
  };
};

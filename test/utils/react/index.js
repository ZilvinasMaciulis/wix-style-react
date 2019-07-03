import { render } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import { reactUniDriver } from 'wix-ui-test-utils/vanilla';

const getElement = ({ rendered, dataHook }) => {
  return dataHook
    ? rendered.container.querySelector(`[data-hook="${dataHook}"]`)
    : rendered.container.firstChild;
};

function createRendererBase(createDriver, defaultOptions = {}) {
  return (jsx, options = defaultOptions) => {
    const { dataHook, ...reactTestingLibraryOptions } = {
      ...defaultOptions,
      ...options,
    };

    const rendered = render(jsx, reactTestingLibraryOptions);
    const element = getElement({ rendered, dataHook });
    return {
      ...rendered,
      driver: createDriver({ rendered, element, component: jsx }),
    };
  };
}
/**
 * Creates a `render` function that returns the same object as `@testing-library/react`'s render, but
 * with and extra `driver` property.
 *
 * The returned render function arguments:
 * @param [React.Element] jsx a jsx element to render
 * @param [object] options - render-options for @testing-library/react. The options may also contain a `dataHook` prop which if provided then the driver would be created with the element which is found by the dataHook. If not provided then it assumes that the rendered root element is the component's root element and it will be used for the driver.
 */
export function createRendererWithDriver(driverFactory, defaultOptions = {}) {
  const createDriver = ({ rendered, element, component }) =>
    driverFactory({
      element: element,
      wrapper: rendered.container,
      eventTrigger: Simulate,
      component,
    });
  return createRendererBase(createDriver, defaultOptions);
}

/**
 * Creates a `render` function that returns the same object as `@testing-library/react`'s render, but
 * with and extra `driver` property which is a Unidriver.
 *
 * The returned render function arguments:
 * @param [React.Element] jsx a jsx element to render
 * @param [object] options - render-options for @testing-library/react. The options may also contain a `dataHook` prop which if provided then the driver would be created with the element which is found by the dataHook. If not provided then it assumes that the rendered root element is the component's root element and it will be used for the driver.
 */
export function createRendererWithUniDriver(
  driverFactory,
  defaultOptions = {},
) {
  const createDriver = ({ element, component }) =>
    driverFactory(
      reactUniDriver(element),
      reactUniDriver(document.body),
      reactUniDriver(document),
      component,
    );
  return createRendererBase(createDriver, defaultOptions);
}

export * from '@testing-library/react';

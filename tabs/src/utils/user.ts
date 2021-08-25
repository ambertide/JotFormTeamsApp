import { fireEvent } from "__mocks__/test-utils";

type TargetElement = Node | Element | Document | Window;

/** Below two are used to stop React-Northstar from crashing as it always assumes view to be not null. */
const fabricNormalizer = { view: global.document.defaultView };
const fabricNormalizerParam = { target: { view: global.document.defaultView } };

/**
 * Imitate user typing on an input.
 * @param element Element to target.
 * @param value Value to write inside the element.
 */
export function types(element: TargetElement, value: string) {
  fireEvent.change(element, {
    target: { value: value, ...fabricNormalizer },
  });
}

/**
 * Imitate the user clicking a button.
 * @param element Element to click.
 */
export function clicks(element: TargetElement) {
  fireEvent.click(element, fabricNormalizerParam);
}

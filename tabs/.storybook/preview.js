import { Provider, teamsTheme } from "@fluentui/react-northstar";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


export const decorators = [
  (Story) => (
    <Provider theme={teamsTheme} styles={{ backgroundColor: "#eeeeee" }} className="mainProvider">
      <Story />
    </Provider>
  ),
];

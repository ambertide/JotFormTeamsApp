import "../src/components/Components.css";
import { Provider, teamsDarkTheme, teamsTheme } from "@fluentui/react-northstar";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "Light",
    toolbar: {
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: ["Light", "Dark"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

function getTheme(themeName) {
  switch (themeName) {
    case "Dark":
      return teamsDarkTheme;
    default:
      return teamsTheme;
  }
}

function getBackground(themeName) {
  switch (themeName) {
    case "Light":
      return "#eeeeee";
    case "Dark":
      return "#2D2C2C";
  }
}

const withThemeProvider = (Story, context) => {
  const theme = getTheme(context.globals.theme);
  const backgroundColor = getBackground(context.globals.theme);
  return (
    <Provider theme={theme} styles={{ backgroundColor: backgroundColor }} className="mainProvider">
      <Story {...context} />
    </Provider>
  );
};

export const decorators = [withThemeProvider];

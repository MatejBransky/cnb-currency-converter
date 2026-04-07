type Mode<K extends string> = Record<K, string>;

/**
 * Creates a type-safe CSS variable theme with light/dark mode support.
 * @param config - Theme configuration with light and dark color values
 * @returns Theme object with CSS var references and a register function for injecting styles
 */
export function createTheme<K extends string>(config: {
  light: Mode<K>;
  dark: Mode<K>;
}) {
  const keys = Object.keys(config.light) as (keyof Mode<K>)[];

  const vars = keys.map((key) => {
    const name = `--${String(key)}`;
    const ref = `var(${name})`;
    const light = config.light[key];
    const dark = config.dark[key];
    return [key, { name, ref, light, dark }] as const;
  });

  return {
    theme: Object.fromEntries(vars.map(([key, { ref }]) => [key, ref])) as {
      [L in keyof Mode<K>]: string;
    },
    register,
  };

  function register(mode: "light" | "dark") {
    return vars.map(([, item]) => `${item.name}: ${item[mode]};`).join("\n");
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  const createTestTheme = () =>
    createTheme({
      light: {
        text: "black",
      },
      dark: {
        text: "white",
      },
    });

  it('returns CSS var name wrapped with "var()"', () => {
    const { theme } = createTestTheme();
    expect(theme.text).toBe("var(--text)");
  });

  it("registers vars in CSS", () => {
    const { register } = createTestTheme();
    expect(register("light")).toBe(`--text: black;`);
    expect(register("dark")).toBe("--text: white;");
  });
}


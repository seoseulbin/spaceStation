const colors = {
  // ${({ theme }) => theme.colors.컬러이름};
  main: "#35a29f",
  sub: "#2b2b2b",
};

const size = {
  maxWidth: 768,
  sm: 12,
  md: 16,
  lg: 20,
};

export const constants = {
  size,
};

export const defaultTheme = {
  colors,
};

export const theme = {
  ...constants,
  ...defaultTheme,
};

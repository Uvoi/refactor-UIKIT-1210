import '@emotion/react';
import { Theme as MuiTheme } from '@mui/material/styles';

import { Elevation, Palette, Shape } from '../theme';
import { TypographyThemeOptions } from '../theme/typography';

declare module '@emotion/react' {
  export interface Theme
    extends Omit<MuiTheme, 'shadows' | 'palette' | 'shape' | 'typography'> {
    elevation: Elevation;
    palette: Palette;
    shape: Shape;
    typography: TypographyThemeOptions;
  }
}

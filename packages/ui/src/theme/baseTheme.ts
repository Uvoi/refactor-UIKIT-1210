import {
  Theme as MuiTheme,
  ThemeOptions,
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { merge } from 'lodash-es';

import { Brand } from '../../types/brands';

import { typography } from './typography';
import { getPalette } from './palette';
import { getComponents } from './getComponents';

export type { Theme } from '@mui/material/styles';

export const createTheme = (
  brand: Brand,
  options: ThemeOptions = {}
): MuiTheme => {
  const themeOptions: ThemeOptions = {
    typography,
    palette: getPalette(brand),
    components: getComponents(brand),
  };

  return responsiveFontSizes(createMuiTheme(merge({}, themeOptions, options)));
};

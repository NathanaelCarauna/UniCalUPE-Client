import * as React from 'react';
import { TextProps } from '../types';

import { Text } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

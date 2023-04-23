import { IconType } from '@assets/resources/icons';

export type SvgIconMoodType = 'blue' | 'green' | 'orange' | 'red' | 'transparent' | 'grey';

export interface SvgIconProps {
  mood?: SvgIconMoodType;
  name?: IconType;
}

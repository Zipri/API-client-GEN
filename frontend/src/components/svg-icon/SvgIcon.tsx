import { FC, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import cn from 'classnames';

import { iconsResource } from '@assets/resources/icons';

import { SvgIconProps } from './models';
import cl from './SvgIcon.module.scss';

const SvgIcon: FC<SvgIconProps> = ({ mood, name }) => {
  const [icon, setIcon] = useState<any>();
  useEffect(() => {
    name && setIcon(iconsResource[name]);
  }, [name]);
  return (
    <div>
      <ReactSVG
        className={cn(
          mood === 'blue'
            ? cl.iconColorBlue
            : mood === 'green'
            ? cl.iconColorGreen
            : mood === 'orange'
            ? cl.iconColorOrange
            : mood === 'red'
            ? cl.iconColorRed
            : mood === 'transparent'
            ? cl.iconColorTransparent
            : cl.iconColorGray
        )}
        src={icon ?? ''}
      />
    </div>
  );
};

export { SvgIcon };

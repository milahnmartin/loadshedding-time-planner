import { Variants } from '@lstypes/types';
import classNames from 'classnames';

type LabelProps = {
  variant: Variants;
  data: string;
};

const GreenLabel = ({ data, variant }: LabelProps) => {
  const lscolorClassName = classNames(
    'text-white text-1xl rounded-lg p-2 w-32 text-center',
    {
      'bg-red-700': variant === 'ls',
      'bg-cblue': variant === 'availible',
      'bg-yellow-500': variant === 'buffer',
    }
  );

  return <span className={lscolorClassName}>{data}</span>;
};

export default GreenLabel;

import { Variants } from '@lstypes/types';
import classNames from 'classnames';

type LabelProps = {
  variant: Variants;
  data: string;
};

const GreenLabel = ({ data, variant }: LabelProps) => {
  const lscolorClassName = classNames(
    'text-white text-1xl rounded-lg p-2 text-center',
    {
      'bg-red-700 w-32': variant === 'ls',
      'bg-cblue w-96': variant === 'availible',
      'bg-yellow-500': variant === 'buffer',
    }
  );

  return <span className={lscolorClassName}>{data}</span>;
};

export default GreenLabel;

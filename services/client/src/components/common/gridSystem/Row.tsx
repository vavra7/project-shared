import { FC, ReactNode } from 'react';
import { JustifyContent, AlignItems } from './types';

interface Props {
  children?: ReactNode;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  id?: string;
  className?: string;
  style?: object;
}

const Row: FC<Props> = props => {
  let classes = 'row';

  if (props.className) classes = classes.concat(` ${props.className}`);
  if (props.justifyContent) classes = classes.concat(` jc-${props.justifyContent}`);
  if (props.alignItems) classes = classes.concat(` ai-${props.alignItems}`);

  return (
    <div id={props.id} className={classes} style={props.style}>
      {props.children}
    </div>
  );
};

export default Row;

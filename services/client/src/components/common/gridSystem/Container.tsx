import { FC, ReactNode } from 'react';
import { AlignItems, JustifyContent } from './types';

interface Props {
  children?: ReactNode;
  fluid?: boolean;
  flexDirection?: 'row' | 'column';
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  id?: string;
  className?: string;
  style?: object;
}

const Container: FC<Props> = props => {
  let classes = '';

  if (!props.fluid) {
    classes = classes.concat('container');
  } else {
    classes = classes.concat('container-fluid');
  }
  if (props.flexDirection) classes = classes.concat(` fd-${props.flexDirection}`);
  if (props.justifyContent) classes = classes.concat(` jc-${props.justifyContent}`);
  if (props.alignItems) classes = classes.concat(` ai-${props.alignItems}`);
  if (props.className) classes = classes.concat(` ${props.className}`);

  return (
    <div className={classes} id={props.id} style={props.style}>
      {props.children}
    </div>
  );
};

export default Container;

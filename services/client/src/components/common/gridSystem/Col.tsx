import { ReactNode, FC } from 'react';

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface Props {
  children?: ReactNode;
  cols?: Cols;
  xs?: Cols;
  sm?: Cols;
  md?: Cols;
  lg?: Cols;
  xl?: Cols;
  id?: string;
  className?: string;
  style?: object;
}

const Col: FC<Props> = props => {
  let classes = 'col';

  if (props.cols && !props.xs) classes = classes = classes.concat(` col-xs-${props.cols}`);
  if (props.xs) classes = classes = classes.concat(` col-xs-${props.xs}`);
  if (props.sm) classes = classes.concat(` col-sm-${props.sm}`);
  if (props.md) classes = classes.concat(` col-md-${props.md}`);
  if (props.lg) classes = classes.concat(` col-lg-${props.lg}`);
  if (props.xl) classes = classes.concat(` col-xl-${props.xl}`);
  if (props.className) classes = classes.concat(` ${props.className}`);

  return (
    <div id={props.id} className={classes} style={props.style}>
      {props.children}
    </div>
  );
};

export default Col;

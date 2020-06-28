import { motion, Point } from 'framer-motion';
import { PureComponent, ReactNode } from 'react';
import { Alert as AlertObjectType, AlertType } from '../../../graphql/store/types';
import alerts from '../../../lib/alerts';
import scopedStyles from './Alert.module.scss';

type AlertProps = AlertObjectType;

class Alert extends PureComponent<AlertProps> {
  private modifierClass: string;
  private swipeConfidenceThreshold = 20000;

  constructor(props: AlertProps) {
    super(props);

    this.modifierClass = this.getModifierClass();
  }

  getModifierClass(): string {
    switch (this.props.type) {
      case AlertType.Success:
        return scopedStyles['alert--success'];

      case AlertType.Info:
        return scopedStyles['alert--info'];

      case AlertType.Error:
        return scopedStyles['alert--error'];
    }
  }

  getSwipePower(offset: number, velocity: number): number {
    return Math.abs(offset) * velocity;
  }

  out(offset: Point, velocity: Point): void {
    const swipePower = this.getSwipePower(offset.x, velocity.x);

    if (swipePower > this.swipeConfidenceThreshold) {
      console.log('out', swipePower);
    }
  }
  render(): ReactNode {
    const { body, icon, title, id } = this.props;

    return (
      <motion.div
        animate={{ opacity: 1 }}
        className={`alert ${scopedStyles['alert']} ${this.modifierClass}`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        exit={{ opacity: 0, x: '100%' }}
        initial={{ opacity: 0 }}
        onDragEnd={(e, { offset, velocity }) => this.out(offset, velocity)}
        positionTransition
        whileTap={{ scale: 0.97 }}
      >
        <div className={`alert__loader ${scopedStyles['alert__loader']}`} />

        {icon && (
          <div className={`alert__icon ${scopedStyles['alert__icon']}`}>
            <i className={icon} />
          </div>
        )}

        <div className={`alert__content ${scopedStyles['alert__content']}`}>
          <div className={`title ${scopedStyles['title']}`}>{title}</div>

          {body && <div className={`body ${scopedStyles['body']}`}>{body}</div>}
        </div>

        <div className={`alert__close ${scopedStyles['alert__close']}`}>
          <i className="icon-times" onClick={() => alerts.hide(id)} />
        </div>
      </motion.div>
    );
  }
}

export default Alert;

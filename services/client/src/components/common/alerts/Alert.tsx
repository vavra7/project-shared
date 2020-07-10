import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { FC, useEffect } from 'react';
import { Alert as AlertObjectType, AlertTypeEnum } from '../../../graphql/store/modelGenerated';
import alerts from '../../../lib/alerts';
import scopedStyles from './Alert.module.scss';

type AlertProps = AlertObjectType;

const ALERT_WIDTH = 350;

const variants = {
  alert: {
    initial: {
      y: -50,
      scale: 0.5
    },
    animate: {
      y: 0,
      scale: 1
    },
    exit: {
      x: '100%'
    }
  },
  expirer: {
    initial: {
      width: '0%'
    },
    expire: {
      width: '100%',
      transition: {
        duration: 5,
        ease: 'linear',
        type: 'tween'
      }
    }
  }
};

const Alert: FC<AlertProps> = props => {
  const { body, icon, title, id, type } = props;
  const expirerControls = useAnimation();
  const alertControls = useAnimation();
  const expirerWidth = useMotionValue('0%');
  const alertX = useMotionValue(0);
  const alertOpacity = useTransform(alertX, [0, ALERT_WIDTH], [1, 0]);

  const modifierClass = (() => {
    switch (type) {
      case AlertTypeEnum.Success:
        return scopedStyles['alert--success'];

      case AlertTypeEnum.Info:
        return scopedStyles['alert--info'];

      case AlertTypeEnum.Error:
        return scopedStyles['alert--error'];
    }
  })();

  const continueExpiring = (): void => {
    const expireAnimation = variants.expirer.expire;
    const duration = expireAnimation.transition.duration;
    const progress: number = parseFloat(expirerWidth.get() as any);
    const remainingDuration: number = duration - (progress / 100) * duration;

    expirerControls.start({
      ...expireAnimation,
      transition: {
        ...expireAnimation.transition,
        duration: remainingDuration
      }
    });
  };

  const onCommonExit = (): void => {
    alertControls.start('exit').finally(() => {
      alerts.hide(id);
    });
  };

  const onDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ): void => {
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower > 20000) {
      alertControls.start({
        x: '100%',
        transition: {
          type: 'inertia',
          velocity: Math.min(velocity.x * 10, 4000)
        }
      });
    }
  };

  useEffect(() => {
    alertControls.start('animate');
    expirerControls.start('expire');
    alertX.onChange(x => {
      if (x >= ALERT_WIDTH) alerts.hide(id);
    });
  }, []);

  return (
    <motion.div
      animate={alertControls}
      className={`alert ${scopedStyles['alert']} ${modifierClass}`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      initial="initial"
      onDragEnd={onDragEnd}
      onHoverEnd={continueExpiring}
      onHoverStart={() => expirerControls.stop()}
      onTap={continueExpiring}
      onTapStart={() => expirerControls.stop()}
      positionTransition
      style={{ x: alertX, opacity: alertOpacity }}
      variants={variants.alert}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        animate={expirerControls}
        className={`alert__expirer ${scopedStyles['alert__expirer']}`}
        onAnimationComplete={onCommonExit}
        style={{ width: expirerWidth }}
        variants={variants.expirer}
      />

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
        <i className="icon-times" onClick={onCommonExit} />
      </div>
    </motion.div>
  );
};

export default Alert;

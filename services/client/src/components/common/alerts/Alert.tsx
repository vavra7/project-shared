import { PureComponent, ReactNode } from 'react';
import { Alert as AlertObjectType, AlertType } from '../../../graphql/store/types';
import scopedStyles from './Alert.module.scss';

type AlertProps = AlertObjectType;

class Alert extends PureComponent<AlertProps> {
  private modifierClass: string;

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

  render(): ReactNode {
    const { body, icon, title } = this.props;

    return (
      <div className={`alert ${scopedStyles['alert']} ${this.modifierClass}`}>
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
          <i className="icon-times" />
        </div>
      </div>
    );
  }
}

export default Alert;

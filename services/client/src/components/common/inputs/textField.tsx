import { FC } from 'react';
import { FieldProps } from 'formik';

interface Props {
  label?: string;
}

const TextField: FC<FieldProps & Props> = ({ field, form, label, ...props }) => {
  const touched = !!form.touched[field.name];
  const error = form.errors[field.name];

  return (
    <div className="my-2">
      <div>{label}</div>
      <input {...field} {...props} />
      <div style={{ fontSize: 'small', color: 'red' }}>{touched && error}</div>
    </div>
  );
};

export default TextField;

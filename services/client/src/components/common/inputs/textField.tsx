import { FieldProps } from 'formik';
import { FC } from 'react';

interface Props {
  label?: string;
}

const TextField: FC<FieldProps & Props> = ({ field, form, label, ...props }) => {
  const touched = !!form.touched[field.name];
  const error = form.errors[field.name];

  return (
    <div className="my-2">
      <div>{label}</div>
      <input className="pa-1" {...field} {...props} />
      <div className="mt-1" style={{ fontSize: 'small', color: 'red' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default TextField;

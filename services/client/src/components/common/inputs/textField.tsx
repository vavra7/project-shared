import { FC } from 'react';
import { FieldProps } from 'formik';

interface Props {
  label?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TextField: FC<FieldProps & Props> = ({ field, form, label, ...props }) => {
  return (
    <div className="my-2">
      <div>{label}</div>
      <input {...field} {...props} />
    </div>
  );
};

export default TextField;

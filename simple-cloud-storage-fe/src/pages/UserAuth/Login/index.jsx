/* eslint-disable no-unused-vars */
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormController from '../../../components/FormController';
import Button from '../../../components/Button';

const userLoginSchema = yup.object().shape({
  emailId: yup
    .string()
    .email('Please enter valid email id.')
    .required('Email Id is required.'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
    defaultValues: {
      emailId: '',
      password: '',
    },
  });
  const onSubmit = () => { };
  return <div className='loginForm__container'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormController
        control={control}
        widget={'INPUT'}
        name={'emailId'}
        inputPlaceholder={'Enter email id'}
        inputLabel={'Email Id'}
        inputId={'emailId'}
        inputType='text'
      />
      <FormController
        control={control}
        widget={'INPUT'}
        name={'password'}
        inputPlaceholder={'Enter password'}
        inputLabel={'Password'}
        inputId={'password'}
        inputType='text'
      />
      <Button btnType={'submit'} className={'loginBtn'}>LOG IN</Button>
    </form>
  </div>;
};

export default Login;

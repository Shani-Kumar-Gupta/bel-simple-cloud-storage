/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormController from '../../../components/FormController';
import Button from '../../../components/Button';
import { userSignup } from '../../../services/api';
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from '../../../helper';

const userLoginSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  emailId: yup
    .string()
    .email('Please enter valid email id.')
    .required('Email Id is required.'),
  password: yup.string().required('Password is required'),
});

const Signup = ({ switchToLogin }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
    defaultValues: {
      fullName: '',
      emailId: '',
      password: '',
    },
  });
  const onSubmit = async (data) => {
    const resData = await userSignup(data);
    if (resData && resData?.data?.statusCode == 200) {
      showSuccessToastMessage('Registered Successfullly!');
      setValue('fullName', '');
      setValue('emailId', '');
      setValue('password', '');
      switchToLogin();
      // navigate(ROUTES.DASHBOARD);
    } else {
      showErrorToastMessage(resData?.response?.data?.message);
    }
  };
  return (
    <div className="loginForm__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormController
          control={control}
          widget={'INPUT'}
          name={'fullName'}
          inputPlaceholder={'Enter full name'}
          inputLabel={'Full name'}
          inputId={'fullName'}
          inputType="text"
        />
        <FormController
          control={control}
          widget={'INPUT'}
          name={'emailId'}
          inputPlaceholder={'Enter email id'}
          inputLabel={'Email Id'}
          inputId={'emailId'}
          inputType="text"
        />
        <FormController
          control={control}
          widget={'INPUT'}
          name={'password'}
          inputPlaceholder={'Enter password'}
          inputLabel={'Password'}
          inputId={'password'}
          inputType="password"
        />
        <Button btnType={'submit'} className={'loginBtn'}>
          SIGN UP
        </Button>
      </form>
    </div>
  );
};

export default Signup;

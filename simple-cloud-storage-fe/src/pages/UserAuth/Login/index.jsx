/* eslint-disable no-unused-vars */
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormController from '../../../components/FormController';
import Button from '../../../components/Button';
import { showErrorToastMessage, showSuccessToastMessage } from '../../../helper';
import { userLogin } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigation/constants';

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
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const resData = await userLogin(data);
    if (resData && resData?.data?.statusCode == 200) {
      showSuccessToastMessage('Successfully logged in!');
      navigate(ROUTES.DASHBOARD);
    } else {
      showErrorToastMessage(resData?.response?.data?.message);
    }
    console.log("؋Shani",resData);
  };
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
        inputType='password'
      />
      <Button btnType={'submit'} className={'loginBtn'}>LOG IN</Button>
    </form>
  </div>;
};

export default Login;

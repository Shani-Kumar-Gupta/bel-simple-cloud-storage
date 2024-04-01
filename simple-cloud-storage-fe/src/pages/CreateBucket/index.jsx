/* eslint-disable no-unused-vars */
import FormController from '../../components/FormController';
import { images } from '../../configs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { createBucket } from '../../services/api';
import { useSelector } from 'react-redux';
import { showErrorToastMessage, showSuccessToastMessage } from '../../helper';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../navigation/constants';

const userLoginSchema = yup.object().shape({
  bucketName: yup.string().required('Bucket name is required'),
  bucketSize: yup.string().required('Bucket size is required'),
  tags: yup.string(),
});

const CreateBucket = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
    defaultValues: {
      bucketName: '',
      bucketSize: '',
      tags: '',
    },
  });
  const { userSCSData } = useSelector((state) => state.simpleCloudStorage);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let body = {
      ...data,
      userId: userSCSData?.userId
    };
    const resBucket = await createBucket(body);
    if (resBucket && resBucket?.data?.statusCode == 200) {
      showSuccessToastMessage('Bucket Created Successfully!');
      navigate(ROUTES.DASHBOARD);
    } else {
      showErrorToastMessage(resBucket?.response?.data?.message);
    }
  };
  return (
    <div className="createBucket__container">
      <section className="leftSection">
        <img
          src={images.bucket}
          alt="leftSectionLogo"
          width={'300px'}
          height={'300px'}
        />
      </section>
      <section className="rightSection">
        <h2 className="welcomeText">Create New Bucket</h2>
        <div className="createBucketForm__container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormController
              control={control}
              widget={'INPUT'}
              name={'bucketName'}
              inputPlaceholder={'Enter bucket name'}
              inputLabel={'Bucket Name'}
              inputId={'bucketName'}
              inputType="text"
            />
            <FormController
              control={control}
              widget={'INPUT'}
              name={'bucketSize'}
              inputPlaceholder={'Enter Bucket Size'}
              inputLabel={'Bucket Size'}
              inputId={'bucketSize'}
              inputType="text"
            />
            <FormController
              control={control}
              widget={'INPUT'}
              name={'tags'}
              inputPlaceholder={'Enter tags'}
              inputLabel={'tags'}
              inputId={'tags'}
              inputType="text"
            />
            <Button btnType={'submit'} className={'loginBtn'}>
              CREATE BUCKET
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateBucket;

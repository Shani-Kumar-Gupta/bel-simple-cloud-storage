import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import { fetchBucketById } from '../../services/api';
import { showErrorToastMessage, showSuccessToastMessage } from '../../helper';

const BucketFile = () => {
  const { bucketId } = useParams();
  const [bucketDetails, setBucketDetails] = useState(null);

  const fetchBucketDataById = async (bucketId) => {
    try {
      let bucketDetails = await fetchBucketById(bucketId);
      if (bucketDetails && bucketDetails?.data?.statusCode == 200) {
        setBucketDetails(bucketDetails?.data?.bucketDetails);
        showSuccessToastMessage('Bucket Details fetched Successfully!');
      } else {
        showErrorToastMessage(bucketDetails?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBucketDataById(bucketId);
  }, [bucketId]);

  return (
    <div className="bucketFile__container">
      <div className="mainBucketContainer">
        <div className="bucketInfo">
          <h2>Bucket Id: {bucketDetails?.id}</h2>
          <h3>Bucket Name: {bucketDetails?.bucketName}</h3>
          <h3>Bucket Size: {bucketDetails?.bucketSize}</h3>
          <h3>tags: {bucketDetails?.tags?.toString()}</h3>
          <h3>User Id: {bucketDetails?.userId}</h3>
        </div>
        <section className="createBucket">
          <h4>
            Welcome! Upload your files inside your bucket without any hustles 😎
          </h4>
          <Button btnType={'button'}>Upload Files/Folder</Button>
        </section>
      </div>
      <hr className="horizontalLize" />
    </div>
  );
};

export default BucketFile;

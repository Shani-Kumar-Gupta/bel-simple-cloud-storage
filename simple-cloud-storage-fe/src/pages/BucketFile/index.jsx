/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import { fetchBucketById, fetchUploadedFiles } from '../../services/api';
import { showErrorToastMessage, showSuccessToastMessage } from '../../helper';
import FileDetails from '../../components/FileDetails';

const BucketFile = () => {
  const { bucketId } = useParams();
  const [bucketDetails, setBucketDetails] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  const fetchBucketUploadedFiles = async (bucketId) => {
    try {
      let body = {
        bucketName: bucketDetails?.bucketName,
        bucketId: bucketId,
      };
      let uploadedFiles = await fetchUploadedFiles(body);
      if (uploadedFiles && uploadedFiles?.data?.statusCode == 200) {
        setUploadedFiles(uploadedFiles?.data?.uploadedFiles);
        showSuccessToastMessage('Uploaded file Details fetched Successfully!');
      } else {
        showErrorToastMessage(uploadedFiles?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log('Uploaded files', uploadedFiles);
  };

  const fetchBucketDataById = async (bucketId) => {
    try {
      let bucketDetail = await fetchBucketById(bucketId);
      if (bucketDetail && bucketDetail?.data?.statusCode == 200) {
        setBucketDetails(bucketDetail?.data?.bucketDetails);
        showSuccessToastMessage('Bucket Details fetched Successfully!');
      } else {
        showErrorToastMessage(bucketDetail?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    if (bucketId) {
      fetchBucketDataById(bucketId);
    }
  }, [bucketId]);

  useMemo(() => {
    if (bucketId && bucketDetails?.bucketName) {
      fetchBucketUploadedFiles(bucketId);
    }
  }, [bucketId, bucketDetails]);

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
      {uploadedFiles && uploadedFiles.length
        ? uploadedFiles.map((files, _id) => {
            return (
              <FileDetails
                key={_id}
                fileName={files.fileName}
                originalFileName={files.originalFileName}
                fileVersion={files.fileVersion}
                filePath={files.filePath}
                typeOfFile={files.typeOfFile}
                tags={files.tags}
                prevVersionsDetails={files.prevVersionsDetails}
                bucketName={bucketDetails?.bucketName}
                bucketId={bucketDetails?.id}
              />
            );
          })
        : null}
    </div>
  );
};

export default BucketFile;

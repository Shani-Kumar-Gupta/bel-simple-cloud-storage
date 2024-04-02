import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../../navigation/constants';
import { fetchBucketList } from '../../services/api';
import { showErrorToastMessage, showSuccessToastMessage } from '../../helper';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userSCSData } = useSelector((state) => state.simpleCloudStorage);
  const [userName] = useState(userSCSData?.name);
  const [email] = useState(userSCSData?.email);
  const [userId] = useState(userSCSData?.userId);
  const [bucketListData, setBucketListData] = useState([]);

  const getBucketList = async () => {
    try {
      let bucketList = await fetchBucketList();
      if (bucketList && bucketList?.data?.statusCode == 200) {
        setBucketListData(bucketList?.data?.bucketsList);
        showSuccessToastMessage('Bucket List fetched Successfully!');
      } else {
        showErrorToastMessage(bucketList?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBucketList();
  }, []);

  const createBucketRedirection = () => {
    navigate(ROUTES.CREATEBUCKET);
  };

  return (
    <div className="dashboard__container">
      <div className="mainDashboardContainer">
        <div className="userInfo">
          <h2>Hello! {userName} 🚀</h2>
          <h3>Email: {email}</h3>
          <h3>User Id: {userId}</h3>
        </div>
        <section className="createBucket">
          <h4>Welcome! Handle your file storage using Simple Cloud Storage</h4>
          <Button btnType={'button'} clickHandler={createBucketRedirection}>
            Create Bucket
          </Button>
        </section>
      </div>
      <hr className="horizontalLize" />
      <div className="bucketList__Container">
        <h2>Simple Cloud Storage Bucket Details</h2>
        <table>
          <thead>
            <tr>
              <th>Bucket Id</th>
              <th>Bucket Name</th>
              <th>Bucket Size</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {bucketListData && bucketListData.length
              ? bucketListData.map((bucket) => {
                  return (
                    <tr key={bucket.id}>
                      <td>
                        <Link to={`/bucketFiles/${bucket.id}`}>
                          {bucket.id}
                        </Link>
                      </td>
                      <td>{bucket.bucketName}</td>
                      <td>{bucket.bucketSize}</td>
                      <td>{bucket.tags?.toString()}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

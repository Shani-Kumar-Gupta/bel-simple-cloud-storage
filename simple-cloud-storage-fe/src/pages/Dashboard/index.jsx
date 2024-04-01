import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ROUTES from "../../navigation/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userSCSData } = useSelector((state) => state.simpleCloudStorage);
  const [userName] = useState(userSCSData?.name);
  const [email] = useState(userSCSData?.email);
  const [userId] = useState(userSCSData?.userId);

  useEffect(() => { }, []);

  const createBucketRedirection = () => {
    navigate(ROUTES.CREATEBUCKET);
  }

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
          <Button btnType={'button'} clickHandler={createBucketRedirection}>Create Bucket</Button>
        </section>
      </div>
      <hr className="horizontalLize" />
      <div className="bucketList__Container">
        <h2>Simple Cloud Storage Bucket Details</h2>
        <table>
          <tr>
            <th>Bucket Name</th>
            <th>Bucket Size</th>
            <th>Creation Date & Time</th>
          </tr>
          <tr>
            <td>Test1</td>
            <td>Test2</td>
            <td>Test3</td>
          </tr>
          <tr>
            <td>Test1</td>
            <td>Test2</td>
            <td>Test3</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Dashboard;
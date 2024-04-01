import { useState } from "react";
import Button from "../../components/Button";
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { userSCSData } = useSelector((state) => state.simpleCloudStorage);
  const [userName] = useState(userSCSData?.name);
  const [email] = useState(userSCSData?.email);
  const [userId] = useState(userSCSData?.userId);

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
          <Button btnType={'button'}>Create Bucket</Button>
        </section>
      </div>
    </div>
  )
}

export default Dashboard;
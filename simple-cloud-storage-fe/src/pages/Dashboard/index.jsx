import Button from "../../components/Button";

const Dashboard = () => {
  return (
    <div className="dashboard__container">
      <div className="mainDashboardContainer">
        <h2>Hello! Test User 🚀</h2>
        <section className="createBucket">
          <h4>Welcome! Handle your file storage using Simple Cloud Storage</h4>
          <Button btnType={'button'}>Create Bucket</Button>
        </section>
      </div>
    </div>
  )
}

export default Dashboard;
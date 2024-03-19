import { images } from "../../configs";
import Login from "./Login";
import Signup from "./Signup";

const UserAuth = () => {
  return (
    <div className="user__auth">
      <section className="leftSection">
        <img src={images.logo} alt="leftSectionLogo" width={'200px'} height={'200px'} />
      </section>
      <section className="rightSection">
        <h2 className="welcomeText">Welcome</h2>
        <section className="userAuthForm">
          <Login />
          <Signup />
        </section>
      </section>
    </div>
  )
}

export default UserAuth;
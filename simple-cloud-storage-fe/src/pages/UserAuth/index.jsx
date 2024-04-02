import { useState } from 'react';
import { images } from '../../configs';
import Login from './Login';
import Signup from './Signup';

const UserAuth = () => {
  const [login, setLogin] = useState(true);
  
  return (
    <div className="user__auth">
      <section className="leftSection">
        <img
          src={images.logo}
          alt="leftSectionLogo"
          width={'200px'}
          height={'200px'}
        />
      </section>
      <section className="rightSection">
        <h2 className="welcomeText">Welcome</h2>
        <section className="userAuthForm">
          {login ? <Login /> : <Signup switchToLogin={() => setLogin((o) => !o)} />}
        </section>
        <p onClick={() => setLogin((o) => !o)} className="bottomText">
          {login ? 'Create an account' : 'Login to your account'}
        </p>
      </section>
    </div>
  );
};

export default UserAuth;

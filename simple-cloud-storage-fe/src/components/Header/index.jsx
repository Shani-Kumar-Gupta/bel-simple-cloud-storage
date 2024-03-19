import { images } from '../../configs';

const Header = () => {
  return (
    <div className='header'>
      <img src={images.logo} alt='scsLogo' width={'60rem'} height={'60rem'} className='logo' />
      <h1 className='mainHeading'>Simple Cloud Storage</h1>
    </div>
  )
}

export default Header;
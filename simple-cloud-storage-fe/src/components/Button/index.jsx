/* eslint-disable react/prop-types */
const Button = ({ children, className, clickHandler, btnType }) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={clickHandler}
      type={btnType}
    >
      {children}
    </button>
  );
};

export default Button;

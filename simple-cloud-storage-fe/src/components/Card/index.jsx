/* eslint-disable react/prop-types */
import cns from 'classnames';

const Card = ({ children, cardClassNames }) => {
  return (
    <div className={cns(`card ${cardClassNames}`)}>
      {children}
    </div>
  )
}

export default Card;
import PropTypes from 'prop-types';

const Button = ({ text, image, funct }) => {
  return (
    <button onClick={funct} className="left-buttons" type="button">
      <div className="icon-left">
        <img src={image} alt="icon" width="20" height="20" />
      </div>
      <div>{text}</div>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  funct: PropTypes.func.isRequired,
};

export default Button;

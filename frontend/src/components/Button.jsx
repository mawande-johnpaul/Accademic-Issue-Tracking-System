import PropTypes from 'prop-types';
// button component definition with destructed props
const Button = ({ text, image, funct, isVisible }) => {
  // Functions to show buttons or not
  return (
    <button onClick={funct} className="left-buttons" type="button" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="icon-left">
        <img src={image} alt="icon" width="20" height="20" />
      </div>
      <div>{text}</div>
    </button>
  );
};
//Prop type validation to enforce correct prop usage
Button.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  funct: PropTypes.func.isRequired,
};
// Export the component for use in other parts of the application
export default Button;

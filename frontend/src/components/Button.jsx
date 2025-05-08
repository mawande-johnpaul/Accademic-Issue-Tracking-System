
const Button = ({text, image, funct}) => {
  return <div>
      <button onClick={funct} className="left-buttons">
        <div className="icon-left">
          <img src={image} alt="icon" width="20" height="20" />
        </div>
        <div>
          {text}
        </div>
      </button>
    </div>
}


export default Button;

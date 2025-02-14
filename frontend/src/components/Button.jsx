const Button = ({button_details}) => {
    function leftButtonClick() {
      console.log("Left Button Clicked")
    }
    return <div>
        <button onClick={leftButtonClick} className="left-buttons">Button</button>
      </div>
  }
  

export default Button;
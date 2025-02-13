const Button = ({ button_details }) => {
    function leftButtonClick() {
      console.log("Left Button Clicked")
    }
    return <div>
        <button className="left-buttons" onClick={leftButtonClick}>{button_details.text}</button>
      </div>
  }
  

export default Button;
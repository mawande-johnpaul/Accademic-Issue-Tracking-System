const Button = () => {
    function leftButtonClick() {
      console.log("Left Button Clicked")
    }
    return <div>
        <button className="left-buttons" onClick={leftButtonClick}>Button</button>
      </div>
  }
  

export default Button;
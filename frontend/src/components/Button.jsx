const Button = ({button_details}) => {
    function leftButtonClick() {
      console.log("Left Button Clicked")
    }
    return <div>
        <button onClick={leftButtonClick} className="left-buttons">
          <div className="icon-left">
            <img src="/new-issue.svg"></img>
          </div>
          <div>
            Button
          </div>
        </button>
      </div>
  }
  

export default Button;
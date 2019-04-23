import * as React from "react";
import './style.css';



export class TopBlock extends React.Component<any, any> {

  render() {

    return (
      <div className="kit-top-block">
        <div className="kit-top-block__logo">logo</div>
        <div className="kit-top-block__profile">
          <div>img</div>
          <div>dropdown</div>
        </div>
      </div>
    );
  }
}


// background-color: #fff;
// min-height: 55px;
// -webkit-box-shadow: 0 1px 6px rgba(57,73,76,0.35);
// box-shadow: 0 1px 6px rgba(57,73,76,0.35);
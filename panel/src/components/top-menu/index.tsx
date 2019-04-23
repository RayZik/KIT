import * as React from "react";
import './style.css';

export class TopMenu extends React.Component<any, any> {

  render() {

    return (
      <nav className="kit-top-menu">
        <div className="kit-top-menu__container">
          <div className="kit-top-menu__item">
            <a href="#">Главная</a>
          </div>
          <div className="kit-top-menu__item">
            <a href="#">Список</a>
          </div>
          <div className="kit-top-menu__item">
            <a href="#">Что-то</a>
          </div>
        </div>
      </nav>
    );
  }
}



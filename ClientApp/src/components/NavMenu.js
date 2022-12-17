import React, { Component } from 'react';
import './NavMenu.css';
import { Navbar } from "react-bulma-components";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar>
          <Navbar.Brand>
            <Navbar.Item href="#">
              <img
                  alt="Bulma: a modern CSS framework based on Flexbox"
                  height="28"
                  src="https://bulma.io/images/bulma-logo.png"
                  width="112"
              />
            </Navbar.Item>
            <Navbar.Burger>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Navbar.Burger>
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Container>
              
                  <Navbar.Item href="/counter">
                    Counter
                  </Navbar.Item>
                  <Navbar.Item href="/fetch-data">
                    Fetch Data
                  </Navbar.Item>
                  <Navbar.Divider />
                  <Navbar.Item href="/charts">
                    Charts
                  </Navbar.Item>
              
              <Navbar.Item href="#">
                Second
              </Navbar.Item>
            </Navbar.Container>
            <Navbar.Container align="end">
              <Navbar.Item href="#">
                At the end
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
      </header>
    );
  }
}

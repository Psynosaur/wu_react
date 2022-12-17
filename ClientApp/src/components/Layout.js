import React, { Component } from 'react';
import {Container} from "react-bulma-components";
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main" s>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

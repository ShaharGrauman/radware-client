import React, { Component } from "react";

export default class SwitchableComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: true,
    }
    this.constants={
      attackType:['one','two','three'],
      status:['In progress', 'In test','In QA','Published','Suspended'],
      reference:['one','two','three']

    }
    props.connectTo(this.switcher);
  }

  switcher = () => {
    this.setState({disabled : !this.state.disabled});
  }
}

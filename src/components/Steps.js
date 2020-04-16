import React, { Component } from "react";
import styled from "styled-components";

const StepBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;

const StepBar = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepBarBtn = styled.div`
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
  bottom: 25px;
  ::before {
    content: "^";
    display: inline-block;
    font-size: 24px;
    position: relative;
    bottom: -29px;
    left: 19px;
  }
`;

const StepBtn = styled.button`
  width: 120px;
  height: 48px;
  cursor: pointer;
  margin: 0 40px 0 40px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 15px;
  :hover {
    background-color: #e7e8e7;
  }
`;

export default class Steps extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StepBox>
        <StepBar className="stepBar">
          <a href="#" className="save" download="myCanvas">
            <StepBtn>
              <div className="saveBtn" />
            </StepBtn>
          </a>
          <StepBtn className="clear">
            <div className="clearBtn" />
          </StepBtn>
          <StepBtn className="undo">
            <div className="undoBtn" />
          </StepBtn>
          <StepBtn className="redo">
            <div className="redoBtn" />
          </StepBtn>
        </StepBar>
        <StepBarBtn
          className="stepBarBtn"
          onClick={this.props.stepBarBtnClickHandler}
        />
      </StepBox>
    );
  }
}

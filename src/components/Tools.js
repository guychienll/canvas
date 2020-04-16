import React, { Component } from "react";
import styled from "styled-components";

const ToolBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 75vh;
`;

const ToolBarBtn = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 25px;
  background-color: white;
  top: 25px;
  ::before {
    content: "^";
    display: inline-block;
    font-size: 24px;
    transform: rotate(180deg);
    position: relative;
    top: -1px;
    left: 19px;
  }
`;

const ToolBar = styled.div`
  width: 730px;
  height: 80px;
  display: flex;
  align-items: center;
  border-radius: 40px;
  margin-bottom: 40px;
  background-color: white;
  justify-content: center;
  box-shadow: 0 4px 16px gray;
`;

const ColorBtn = styled.button`
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 100%;
  margin: 0 8px 0 8px;
  :nth-child(4) {
    margin-left: 16px;
  }
  :hover {
    border: 1px solid black;
  }
  box-shadow: 4px 4px 10px gray;
`;

const ColorLabel = styled.label`
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  line-height: 27px;
  font-family: "Open Sans";
  margin: 0 0 0 40px;
`;

const SizeLabel = styled.label`
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  line-height: 27px;
  font-family: "Open Sans";
`;
const Size = styled.input`
  border: none;
  width: 74px;
  height: 48px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  text-align: center;
  border-radius: 24px;
  font-family: "Open Sans";
  background-color: #e8e8e8;
  margin: 0 8px 0 16px;
`;

const Tool = styled.div`
  cursor: pointer;
  width: 43px;
  height: 42px;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 20px 0 20px;
`;
const ColorPicker = styled.div`
  position: absolute;
  width: 380px;
  height: 280px;
  background: white;
  left: 450px;
  top: -250px;
  border-radius: 30px;
  box-shadow: 0 4px 16px gray;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  .picker {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    div {
      width: 95px;
      font-family: "Comic Sans MS";
    }
    :nth-child(1) {
      color: red;
    }
    :nth-child(2) {
      color: green;
    }
    :nth-child(3) {
      color: blue;
    }
  }
  input {
    width: 255px;
    height: 44px;
  }
  button {
    align-self: center;
    width: 120px;
    height: 44px;
    font-size: 16px;
    font-family: "Comic Sans MS";
    border-radius: 3px;
    border: 1px solid gray;
    color: gray;
    :hover {
      box-shadow: 0 4px 16px gray;
    }
  }
`;

export default class Tools extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const color = ["#FFFFFF", "#c4c4c4", "#f9b8b8", "#c3d8f7"];
    let picker = {
      red: this.props.picker.red,
      green: this.props.picker.green,
      blue: this.props.picker.blue,
    };
    let pickerColor = `rgb(${picker.red},${picker.green},${picker.blue})`;
    return (
      <ToolBox>
        <ToolBarBtn
          className="toolBarBtn"
          onClick={this.props.toolBarBtnClickHandler}
        />
        <ColorPicker className="pickerBoard displaynone">
          <div className="picker">
            <div> Red ({picker.red})</div>
            <input
              type="range"
              max="255"
              min="0"
              value={this.props.picker.red}
              onChange={this.props.colorPickerChangeHandler.bind(this, picker)}
              className="red"
            />
          </div>
          <div className="picker">
            <div> Green ({picker.green})</div>
            <input
              type="range"
              max="255"
              min="0"
              value={this.props.picker.green}
              onChange={this.props.colorPickerChangeHandler.bind(this, picker)}
              className="green"
            />
          </div>
          <div className="picker">
            <div> Blue ({picker.blue})</div>
            <input
              type="range"
              max="255"
              min="0"
              value={this.props.picker.blue}
              onChange={this.props.colorPickerChangeHandler.bind(this, picker)}
              className="blue"
            />
          </div>
          <button onClick={this.props.confirm.bind(this, pickerColor)}>
            Comfirm
          </button>
        </ColorPicker>
        <ToolBar className="toolBar">
          <Tool className="tool pen" onClick={this.props.toolChangerHandler} />
          <SizeLabel>
            SIZE:
            <Size
              type="number"
              min="0"
              onChange={this.props.sizeChangeHandler}
              value={this.props.size}
            />
            px
          </SizeLabel>
          <ColorLabel>COLOR:</ColorLabel>
          {color.map((color) => (
            <ColorBtn
              key={color}
              style={{ backgroundColor: color }}
              className="colorBtn"
              onClick={this.props.colorChangeHandler.bind(this, color)}
            />
          ))}
          <ColorBtn
            className="colorPicker colorBtn"
            style={{ backgroundColor: pickerColor }}
            onClick={this.props.colorPickerHandler.bind(this, pickerColor)}
          />
        </ToolBar>
      </ToolBox>
    );
  }
}

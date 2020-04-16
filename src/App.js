import React, { Component } from "react";
import Tools from "./components/Tools";
import Steps from "./components/Steps";
import Cvs from "./components/Cvs";
import styled from "styled-components";
import "./App.css";

const Sketchpad = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #e8e8e8;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#FFFFFF",
      size: "6",
      picker: {
        red: "0",
        green: "0",
        blue: "0",
      },
    };
    this.toolBarBtnClickHandler = this.toolBarBtnClickHandler.bind(this);
    this.stepBarBtnClickHandler = this.stepBarBtnClickHandler.bind(this);
    this.sizeChangeHandler = this.sizeChangeHandler.bind(this);
    this.colorChangeHandler = this.colorChangeHandler.bind(this);
    this.colorPickerHandler = this.colorPickerHandler.bind(this);
    this.colorPickerChangeHandler = this.colorPickerChangeHandler.bind(this);
    this.toolChangerHandler = this.toolChangerHandler.bind(this);
    this.sizeKeyboardChangeHandler = this.sizeKeyboardChangeHandler.bind(this);
    this.confirm = this.confirm.bind(this);
  }
  componentDidMount() {
    document.querySelector(".colorBtn").classList.add("ischecked");
    window.addEventListener("keyup", this.sizeKeyboardChangeHandler);
  }
  sizeKeyboardChangeHandler(e) {
    let size = this.state.size;
    if (e.key === "+") {
      size++;
    } else if (e.key === "-") {
      size--;
    }
    this.setState({
      size: size,
    });
  }
  toolBarBtnClickHandler() {
    const toolBar = document.querySelector(".toolBar").classList;
    const toolBarBtn = document.querySelector(".toolBarBtn").classList;
    if (!toolBar.contains("displaynone")) {
      toolBar.add("displaynone");
      toolBarBtn.add("toolBtn");
    } else {
      toolBar.remove("displaynone");
      toolBarBtn.remove("toolBtn");
    }
  }
  stepBarBtnClickHandler() {
    const stepBar = document.querySelector(".stepBar").classList;
    const stepBarBtn = document.querySelector(".stepBarBtn").classList;
    if (!stepBar.contains("displaynone")) {
      stepBar.add("displaynone");
      stepBarBtn.add("stepBtn");
    } else {
      stepBar.remove("displaynone");
      stepBarBtn.remove("stepBtn");
    }
  }
  sizeChangeHandler(e) {
    this.setState({
      size: e.target.value,
    });
  }
  colorChangeHandler(color, e) {
    const tool = document.querySelector(".tool");
    document.querySelectorAll(".colorBtn").forEach((btn) => {
      if (btn === e.target) {
        btn.classList.add("ischecked");
        tool.classList.add("pen");
        tool.classList.remove("eraser");
      } else {
        btn.classList.remove("ischecked");
      }
    });
    this.setState({
      color: color,
    });
  }
  colorPickerHandler(pickerColor, e) {
    const tool = document.querySelector(".tool");
    const picker = document.querySelector(".pickerBoard");
    document.querySelectorAll(".colorBtn").forEach((btn) => {
      if (btn === e.target) {
        btn.classList.add("ischecked");
        tool.classList.add("pen");
        tool.classList.remove("eraser");
      } else {
        btn.classList.remove("ischecked");
      }
    });
    if (!picker.classList.contains("displaynone")) {
      picker.classList.add("displaynone");
    } else {
      picker.classList.remove("displaynone");
    }
    this.setState({
      color: pickerColor,
    });
  }
  confirm(pickerColor, e) {
    const tool = document.querySelector(".tool");
    const picker = document.querySelector(".pickerBoard");
    document.querySelectorAll(".colorBtn").forEach((btn) => {
      if (btn === e.target) {
        tool.classList.add("pen");
        tool.classList.remove("eraser");
      }
    });
    if (!picker.classList.contains("displaynone")) {
      picker.classList.add("displaynone");
    } else {
      picker.classList.remove("displaynone");
    }
    this.setState({
      color: pickerColor,
    });
  }
  colorPickerChangeHandler(picker, e) {
    switch (e.target.classList[0]) {
      case "red":
        picker.red = e.target.value;
        break;
      case "green":
        picker.green = e.target.value;
        break;
      case "blue":
        picker.blue = e.target.value;
        break;
      default:
        break;
    }
    this.setState({
      picker: {
        red: picker.red,
        green: picker.green,
        blue: picker.blue,
      },
    });
  }
  toolChangerHandler() {
    const tool = document.querySelector(".tool");
    if (tool.classList.contains("pen")) {
      tool.classList.remove("pen");
      tool.classList.add("eraser");
      this.setState({
        color: "#e8e8e8",
      });
    } else {
      tool.classList.add("pen");
      tool.classList.remove("eraser");
      let originalColor;
      document.querySelectorAll(".colorBtn").forEach((x) => {
        if (x.classList.contains("ischecked")) {
          originalColor = x.style.backgroundColor;
        }
      });
      this.setState({
        color: originalColor,
      });
    }
  }
  render() {
    return (
      <Sketchpad>
        <Cvs size={this.state.size} color={this.state.color} />
        <Steps stepBarBtnClickHandler={this.stepBarBtnClickHandler} />
        <Tools
          toolBarBtnClickHandler={this.toolBarBtnClickHandler}
          sizeChangeHandler={this.sizeChangeHandler}
          colorChangeHandler={this.colorChangeHandler}
          colorPickerHandler={this.colorPickerHandler}
          toolChangerHandler={this.toolChangerHandler}
          colorPickerChangeHandler={this.colorPickerChangeHandler}
          confirm={this.confirm}
          size={this.state.size}
          picker={this.state.picker}
        />
      </Sketchpad>
    );
  }
}

import React, { Component } from "react";
import styled from "styled-components";

const Cvs = styled.canvas`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  cursor: crosshair;
`;

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
      stepImage: [],
    };
  }
  componentDidMount() {
    const canvas = document.querySelector(".myCanvas");
    const save = document.querySelector(".save");
    const clear = document.querySelector(".clear");
    const undo = document.querySelector(".undo");
    const redo = document.querySelector(".redo");
    const ctx = canvas.getContext("2d");
    const ww = (canvas.width = window.innerWidth);
    const wh = (canvas.height = window.innerHeight);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    let option = {
      canvas: canvas,
      save: save,
      clear: clear,
      undo: undo,
      redo: redo,
      ctx: ctx,
      ww: ww,
      wh: wh,
      lastX: 0,
      lastY: 0,
    };
    this.updateCanvas(option);
  }
  updateCanvas(option) {
    const { canvas, ctx, save, clear, undo, redo, ww, wh } = option;
    let { lastX, lastY } = option;
    canvas.addEventListener("mousemove", (e) => {
      if (e.buttons === 1) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.props.color;
        ctx.lineWidth = this.props.size;
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.restore();
        [lastX, lastY] = [e.clientX, e.clientY];
      } else {
        [lastX, lastY] = [e.clientX, e.clientY];
      }
    });
    canvas.addEventListener("mousedown", (e) => {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = this.props.color;
      ctx.lineWidth = this.props.size;
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.restore();
      [lastX, lastY] = [e.clientX, e.clientY];
    });
    canvas.addEventListener("mouseup", () => {
      this.push(option);
    });
    save.addEventListener("click", (e) => {
      const dataURL = canvas.toDataURL("image/png");
      document.querySelector(".save").href = dataURL;
    });
    clear.addEventListener("click", () => {
      ctx.clearRect(0, 0, ww, wh);
      this.push(option);
    });
    undo.addEventListener("click", (e) => {
      if (this.state.step > 0) {
        let step = this.state.step;
        step--;
        this.setState({
          step: step,
        });
        let image = new Image();
        image.src = this.state.stepImage[this.state.step];
        image.onload = function () {
          ctx.save();
          ctx.clearRect(0, 0, ww, wh);
          ctx.drawImage(image, 0, 0);
          ctx.restore();
        };
      }
    });
    redo.addEventListener("click", () => {
      let stepImage = this.state.stepImage;
      if (this.state.step < stepImage.length - 1) {
        let step = this.state.step;
        step++;
        this.setState({
          step: step,
        });
        let image = new Image();
        image.src = this.state.stepImage[this.state.step];
        image.onload = function () {
          ctx.clearRect(0, 0, ww, wh);
          ctx.drawImage(image, 0, 0);
        };
      }
    });
  }
  push(option) {
    let step = this.state.step;
    step++;
    this.setState({
      step: step,
    });
    if (step < this.state.stepImage.length) {
      let stepImage = this.state.stepImage;
      stepImage.length = step;
      this.setState({
        stepImage: stepImage,
      });
    }
    let stepImage = this.state.stepImage;
    stepImage.push(option.canvas.toDataURL());
    this.setState({
      stepImage: stepImage,
    });
  }
  render() {
    return <Cvs className="myCanvas" />;
  }
}

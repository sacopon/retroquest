import { Application, Graphics } from "pixi.js";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "presentation/helper/disable_touch_event";
import { getWindowSizeAsync } from "presentation/helper/get_window_size_async";

let app: PIXI.Application;

function setUpCanvas(size: { width: number; height: number }) {
  app = new Application({
    width: size.width,
    height: size.height,
    transparent: false,
  });

  app.view.style.width = `${size.width}px`;
  app.view.style.height = `${size.height}px`;
  app.view.style.position = "abosolute";
  app.view.style.left = app.view.style.top = app.view.style.right = app.view.style.bottom = "0px";
  app.view.style.margin = "auto";
  app.view.style.position = "absolute";

  disableOuterCanvasTouchEvent();
  disableTouchEvent(app.view);
  document.body.appendChild(app.view);
}

function setUpInlineFrame(size: { width: number, height: number }) {
  const iframe: HTMLIFrameElement = window.document.createElement("iframe");
  iframe.id = "myiframe";
  iframe.src = "./app.html";
  iframe.width = "256px";
  iframe.height = "224px";
  iframe.style.border = "0";
  iframe.style.position = "absolute";
  iframe.style.transformOrigin = "0 0";
  iframe.style.marginTop = `${Math.floor(size.height / 20)}px`;
  iframe.style.padding = "0";
  iframe.style.transform = `scale(${size.width / 256})`;
  disableTouchEvent(iframe);
  document.body.appendChild(iframe);
}

async function mainProgram() {
  const clientSize = await getWindowSizeAsync();

  setUpCanvas(clientSize);
  setUpInlineFrame(clientSize);

  const g = new Graphics();
  g.beginFill(0xff00ff);
  g.drawRect(0, 0, clientSize.width, clientSize.height);
  g.endFill();
  app.stage.addChild(g);
}

window.addEventListener("DOMContentLoaded", mainProgram);

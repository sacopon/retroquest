import { Application, Graphics } from "pixi.js";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "presentation/helper/disable_touch_event";

let app: PIXI.Application;

function setUpCanvas(size: { width: number; height: number }) {
  app = new Application({
    width: size.width,
    height: size.height,
    transparent: false,
  });

  app.view.style.position = "abosolute";
  app.view.style.left = app.view.style.top = app.view.style.right = app.view.style.bottom = "0px";
  app.view.style.margin = "auto";
  app.view.style.position = "absolute";

  disableOuterCanvasTouchEvent();
  disableTouchEvent(app.view);
  document.body.appendChild(app.view);
}

function setUpTestScreen(size: { width: number; height: number }) {
  const g = new Graphics();
  g.lineStyle(1, 0xffffff);

  for (let i = 0; i < 16; ++i) {
    g.moveTo(i * 16, 0);
    g.lineTo(i * 16, size.height);
  }

  for (let i = 0; i < 14; ++i) {
    g.moveTo(0, i * 16);
    g.lineTo(size.width, i * 16);
  }

  app.stage.addChild(g);
}

async function mainProgram() {
  const width = 256;
  const height = 224;

  setUpCanvas({ width, height });
  setUpTestScreen({ width, height });

  // NOTE: use sprite sample.
  // const url = `${window.location.origin}/assets/character.json`;
  // app.loader.add(url);
  // app.loader.load(() => {
  //   const sprite = Sprite.from("stay.png");
  //   sprite.x = screen.resolution.width - sprite.width;
  //   app.stage.addChild(sprite);
  // });
}

window.addEventListener("DOMContentLoaded", mainProgram);

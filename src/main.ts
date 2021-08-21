import { Application, Graphics, Sprite } from "pixi.js";
import { screen } from "presentation/application/config/configuration";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "presentation/helper/disable_touch_event";
import { getWindowSizeAsync } from "presentation/helper/get_window_size_async";

async function mainProgram() {
  const clientSize = await getWindowSizeAsync();

  const app = new Application({
    width: screen.resolution.width,
    height: screen.resolution.height,
    transparent: false,
  });

  const widthRatio = clientSize.width / screen.resolution.width;
  const heightRatio = clientSize.height / screen.resolution.height;
  let canvasWidth = 0;
  let canvasHeight = 0;

  const ratio = Math.min(widthRatio, heightRatio);
  canvasWidth = Math.floor(screen.resolution.width * ratio);
  canvasHeight = Math.floor(screen.resolution.height * ratio);

  app.view.style.width = `${canvasWidth}px`;
  app.view.style.height = `${canvasHeight}px`;
  app.view.style.position = "abosolute";
  app.view.style.left = app.view.style.top = app.view.style.right = app.view.style.bottom = "0px";
  app.view.style.margin = "auto";
  app.view.style.position = "absolute";

  disableOuterCanvasTouchEvent();
  disableTouchEvent(app.view);
  document.body.appendChild(app.view);

  // NOTE: use sprite sample.
  // const url = `${window.location.origin}/assets/character.json`;
  // app.loader.add(url);
  // app.loader.load(() => {
  //   const sprite = Sprite.from("stay.png");
  //   sprite.x = screen.resolution.width - sprite.width;
  //   app.stage.addChild(sprite);
  // });

  const g = new Graphics();
  g.beginFill(0xff00ff);
  g.drawRect(0, 0, screen.resolution.width, screen.resolution.height);
  g.endFill();
  app.stage.addChild(g);
}

window.addEventListener("DOMContentLoaded", mainProgram);

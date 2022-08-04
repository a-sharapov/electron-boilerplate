const { app, BrowserWindow, ipcMain } = require("electron");

require("update-electron-app")();

const createApp = () => {
  const window = new BrowserWindow({
    width: 400,
    height: 400,
    center: true,
    minWidth: 400,
    minHeight: 400,
    fullscreenable: false,
    // frame: false,
    icon: `${__dirname}/static/favicon.ico`,
    webPreferences: {
      devTools: true,
    },
  });

  window.removeMenu();
  ipcMain.handle("ping", () => "pong");
  window.loadFile("./build.html");
};

app.whenReady().then(() => {
  createApp();

  app.on("activate", () => {
    BrowserWindow.getAllWindows().length === 0 && createApp();
  });
});

app.on("window-all-closed", () => {
  switch (process.platform) {
    case "darwin":
      app.quit();
      break;
    default:
      app.quit();
  }
});

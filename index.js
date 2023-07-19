const {app, BrowserWindow} = require("electron");


app.on("ready", () => {
    const win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("index.html");

    const loadWindow = new BrowserWindow({
        height: 220,
        width: 220,
        frame: false,
        resizable: false
    });

    loadWindow.loadFile("loading.html");

    setTimeout(() => {
        win.loadFile("index.html");
        loadWindow.destroy();
        win.show();
    }, 3000)
});
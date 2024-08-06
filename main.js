const { app, BrowserWindow } = require("electron");

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 700,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		titleBarStyle: "hidden",
		titleBarOverlay: {
			color: "#1f1f1f",
			symbolColor: "#fff",
			height: 60,
		},
	});
	// mainWindow.webContents.openDevTools();
	mainWindow.loadFile("index.html");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

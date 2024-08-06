const { app, BrowserWindow } = require("electron");
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const server = express();
server.use(bodyParser.text());

server.post("/run-code", (req, res) => {
	const code = req.body;

	exec(`node -e "${code}"`, (error, stdout, stderr) => {
		if (error) {
			res.status(500).send(`Error: ${stderr}`);
		} else {
			res.send(stdout);
		}
	});
});

server.listen(3000, () => {
	console.log("Server is listening on port 3000");
});

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

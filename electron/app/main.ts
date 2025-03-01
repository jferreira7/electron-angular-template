import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    })

    if (!(process.env['NODE_ENV'] == 'development')) {
        win.loadFile(path.join(__dirname, '../../angular/dist/browser/index.html'))
        win.webContents.on('did-fail-load', () => win.loadURL(path.join(__dirname, '../../angular/dist/browser/index.html')))
    } else {
        win.loadURL('http://localhost:4200');
    }
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})



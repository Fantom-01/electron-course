const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
	subscribeStatistics: (callback) => {
		return ipcOn("statistics", (stats) => {
			callback(stats);
		});
	},
	getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
	key: Key
): Promise<EventPayloadMapping[Key]> {
	return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
	key: Key,
	callback: (payload: EventPayloadMapping[Key]) => void
) {
	const cB = (_: Electron.IpcRendererEvent, payload: any) =>
		callback(payload);
	electron.ipcRenderer.on(key, cB);
	return () => electron.ipcRenderer.off(key, cB);
}

interface WifiName {
	(): Promise<string | null>;
	sync(): string | null;
}
declare const wifiName: WifiName;
export default wifiName;

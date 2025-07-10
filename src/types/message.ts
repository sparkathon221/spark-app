interface IChatMessage {
	id: string;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
}
export default IChatMessage;

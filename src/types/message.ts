interface IChatMessage {
	id: string;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
}
export default IChatMessage;
export interface IPromptResponse {
	success: boolean,
	data: {
		totalResponse: number,
		product_ids: Array<string>,
		responseMessage: string,
	} | null
}
export interface IPromptRequest {
	text: string
}

import axios from 'axios';

// import { BASE_URL } from 'env/config';
const BASE_URL = 'localhost://4001';

export const fetchWoP = async (WoPid: number) => {
	const response = await axios.get<void>(`${BASE_URL}/WoP/${WoPid}`);
	return response.data;
};

// export interface TokenInstruction {
// 	instruction: string;
// 	tokenId: string;
// }

// export const getTokenInstruction = async () => {
// 	const response = await axios.post<TokenInstruction>(`${BASE_URL}/banking/token`);
// 	return response.data;
// };

// export interface TokenConfirmation {
// 	tokenId: string;
// 	tokenCode: string;
// }

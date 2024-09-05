import { TypeTokens } from "../types/tokens.type";

export interface AuthResponse {
	isVerified: boolean
	tokens: TypeTokens
}
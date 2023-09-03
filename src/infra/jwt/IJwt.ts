export interface IJwt {
	sign(payload: any, secret: string, options?: any): string;
	verify(token: string, secret: string): any;
	decode(
		token: string,
		options?: object
	): null | { [key: string]: any } | string;
}

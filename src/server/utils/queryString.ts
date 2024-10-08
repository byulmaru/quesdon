import * as OAuth from 'oauth-1.0a';

export default new class QueryStringUtils 
{
	decode(query: string): { [key: string]: string } 
	{
		const res: {[key: string]: string} = {};
		query.split('&').map((q) => 
		{
			const splitedQuery = q.split('=');
			if (splitedQuery.length < 2) 
				return;
			const name = splitedQuery[0];
			const value = splitedQuery.slice(1).join('=');
			res[name] = decodeURIComponent(value);
		});
		return res;
	}

	encode(params: {[key: string]: any}): string // eslint-disable-line @typescript-eslint/no-explicit-any
	{
		return Object.keys(params).map(
			(key) => encodeURIComponent(key) + '=' + OAuth.prototype.percentEncode(params[key])
		).join('&');
	}
}();

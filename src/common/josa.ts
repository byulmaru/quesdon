export default function josa(str: string, yesjong: string, nojong: string): string 
{
	return (str.charCodeAt(str.length - 1) - 0xac00) % 28 > 0 ? str + yesjong : str + nojong;
}

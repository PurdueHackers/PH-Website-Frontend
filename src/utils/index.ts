import axios from 'axios';
import getConfig from 'next/config';
import { Context } from '../@types';

const { publicRuntimeConfig: CONFIG } = getConfig();

export const api = axios.create({
	baseURL: CONFIG.API_URL
});

export const err = e =>
	!e
		? 'Whoops, something went wrong!'
		: e.message && typeof e.message === 'string'
		? e.message
		: e.error && typeof e.error === 'string'
		? e.error
		: 'Whoops, something went wrong!';

const dateToString = (date: string | number | Date) =>
	new Date(date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'America/Indiana/Indianapolis'
	});

export const formatDate = (date: string | number | Date) => {
	if (!date) return 'N/A';
	const str = dateToString(date);
	return str !== 'Invalid Date' ? str : 'N/A';
};

export const endResponse = (ctx: Context) => ctx && ctx.res && ctx.res.end();

export const shortName = (name: string) => {
	if (name.charAt(31) !== ' ' && name.charAt(32) !== ' ') {
		for (let i = 31; i > 0; i--) {
			if (name.charAt(i) === ' ') {
				return `${name.substring(0, i)}...`;
			}
		}
	}
	return name.substring(0, 32);
};
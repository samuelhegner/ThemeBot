export function getDaysBetweenDates(date_1: Date, date_2: Date) {
	let difference = date_1.getTime() - date_2.getTime();
	let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
	return Math.abs(TotalDays);
}

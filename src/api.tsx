const base_url = "https://api.rawg.io/api/";
const key = process.env.REACT_APP_API_RAWG;
const date = new Date();

//date consts
const getMonth = () => {
	let month = date.getMonth();
	month += 1;
	if (month < 10) {return '0' + month};
	return month;
}
const month = getMonth();

const getDay = () => {
	let day = date.getDate();
	if (day < 10) {return '0' + day};
	return day;
}
const day = getDay();
const year = date.getFullYear();

const currentDate = `${year}-${month}-${day}`;
const prevDate = `${year-1}-${month}-${day}`;
const nextDateYear = `${year+1}-${month}-${day}`;

const dateRequest = `dates=${prevDate},${currentDate}`;
const nextDateRequest = `dates=${currentDate},${nextDateYear}`;

//URL for popular games
export const popularGameURL = `${base_url}games?key=${key}&${dateRequest}&ordering=-rating`;

//URL for upcoming games
export const upcomingGamesURL = `${base_url}games?key=${key}&${nextDateRequest}&ordering=-rating`;

//URL for newest games
export const newestGamesURL = `${base_url}games?key=${key}&${dateRequest}&ordering=released`;

//URL for game
export const gameDetailsURL = (id: number) => `${base_url}games/${id}?key=${key}`;

//URL for game screenshots
export const screenshotsURL = (slug: string) => `${base_url}games/${slug}/screenshots?key=${key}`;

//URL for search game
export const searchedGamesURL = (game_name: string) => `${base_url}games?key=${key}&search=${game_name}&search_precise=true&page_size=20`;




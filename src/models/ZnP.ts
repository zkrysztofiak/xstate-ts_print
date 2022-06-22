const initialContext = {
	WoPid: 13,
	kwotaZnP: 100, //podstawa
	doplataReklamacja: 10,
	potracenia: 20,
	nalezneSaldo: 0, //wyliczona z algorytmu +/-
	doWyplaty: 0, //wyliczone
	error: {},
	// error: { message: 'message init' },
	message: '', // 'OK'
	validateStatus: 'success',
	fetched: {
		kwotaZnP: 0,
		doplataReklamacja: 0,
		potracenia: 0,
		nalezneSaldo: 0,
		doWyplaty: 0,
	},
};

export { initialContext };

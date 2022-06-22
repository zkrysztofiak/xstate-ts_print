import { createMachine, assign } from 'xstate';
import axios from 'axios';
import { initialContext } from './models/ZnP';
// import { ZnPContext } from './myTypes';
// import { fetchWoP } from './api/ZnP';

const BASE_URL = 'http://localhost:4001';

export const fetchWoP = async (WoPid: number) => {
	const response = await axios.get<void>(`${BASE_URL}/WoP/${WoPid}`);
	return response.data;
};

// type Context = typeof initialContext;
// export const zapoNaPlatnoscMachine = createMachine<ZnPContext, any, any>(
export const zapoNaPlatnoscMachine = createMachine(
	{
		id: 'zapoNaPlatnosc',
		context: initialContext,
		initial: 'idle',
		states: {
			idle: {
				on: {
					POBIERZ_ZWoP: 'pytanieOnrWoPForm',
				},
			},
			pytanieOnrWoPForm: {
				on: {
					NR_WoP_POBRANY: {
						target: 'pobieranieWoP',
						actions: ['updateNrWoP', 'updateNrWoPconsoleLog'],
					},
				},
			},
			pobieranieWoP: {
				invoke: {
					id: 'fetchWoP',
					src: (context, event) => fetchWoP(context.WoPid),
					onDone: {
						target: 'pobranoDaneWoP',
						actions: ['pobieranieWoPonDone', 'updateFetched'],
					},
					onError: {
						target: 'pytanieOnrWoPForm',
						actions: ['pobieranieWoPonError', 'pobieranieWoPonError404'],
						// actions: console.log((context, event: any) => event.data),
					},
				},
			},
			pobranoDaneWoP: {
				on: { TESTUJ_POKRYCIE100PR: 'testPokrycia100procent' },
			},
			failureWoP: {
				on: { RETRY: 'pobieranieWoP' },
			},
			testPokrycia100procent: {
				on: {
					TAK100PR: 'akceptacjaKierDWB',
					PONIZEJ100PR: 'pomniejszanieKwotyWoP',
				},
			},
			pomniejszanieKwotyWoP: {
				on: {
					DONE_POMNIEJSZONO: {
						target: 'akceptacjaKierDWB',
						actions: 'przelicz',
					},
				},
			},
			akceptacjaKierDWB: {
				on: { AKCEPT_KIER_DWB: 'przekazanieZnP2BFK' },
			},
			przekazanieZnP2BFK: {
				on: { PRZEKAZ2BFK: 'przesylanieDanychUtylizacjiWoP' }, //side action - Aktualizuj montaż finansowy
			},
			przesylanieDanychUtylizacjiWoP: {
				on: { PRZESLIJ_UTYL_WoP: 'przeslanoDaneUtylizacjiWoP' },
			},
			przeslanoDaneUtylizacjiWoP: {
				on: {
					AKTUALIZUJ_MONTAZ_FIN: 'aktualizacjaMontazuFin',
					TESTUJ_WYK100PR: 'testWyk100procent',
				},
			},
			aktualizacjaMontazuFin: {
				on: { AKTUALNY_MONTAZ_FIN: 'montazFinAktualny' },
			},
			montazFinAktualny: {},
			testWyk100procent: {
				on: {
					TAK_WYK100PR: 'koniec',
					PONIZEJ_WYK100PR: 'idle',
				},
			},
			koniec: {
				type: 'final',
			},
		},
	},
	{
		actions: {
			// increment: assign({ kwotaZnP: (context) => context.kwotaZnP + 1 }),
			updateNrWoPconsoleLog: (context, event: any) => console.log('event =', event),
			updateNrWoP: assign({ WoPid: (context, { nrWoP }: any) => nrWoP }),
			// updateNrWoP: assign({ WoPid: (context, event: any) => event.nrWoP }),
			updateFetched: assign({ kwotaZnP: (context, event: any) => context.fetched.kwotaZnP }),
			przelicz: assign({ kwotaZnP: (context, event: any) => context.fetched.kwotaZnP - event.potracenia + event.doplataReklamacja }),
			// pobieranieWoPonDone: (context, event) => console.log('event.data =', event.data),
			pobieranieWoPonDone: assign({
				fetched: (_, event: any) => event.data,
				message: (_) => 'OK',
				validateStatus: (_) => 'success',
				// error: (_, event: any) => event.data,
				error: (_, event: any) => {},
			}),
			pobieranieWoPonError: assign({
				error: (_, event: any) => event.data,
				message: (_, data) => data?.error?.message,
				validateStatus: (_) => 'error',
			}),
			// pobieranieWoPonError: assign({ error: (_, event: any) => event.data, message: (_) => '404', validateStatus: (_) => 'error' }),
			pobieranieWoPonError404: assign({ message: (_) => '404' }), // do wywalenia
		},
	}
);
// const fetchWoP = (WoPid: number) => {
// 	return fetch(`http://localhost:4001/WoP/${WoPid}`)
// 		.then((response) => {
// 			if (!response.ok) {
// 				console.log('!response.ok , response=', response);
// 				throw new Error('Network response was not ok');
// 			}
// 			return response.json();
// 		})
// 		.catch((response) => {
// 			console.log('!response.ok , response=', response);
// 			return Promise.reject();
// 		});
// };

// As shorthand, in XState, events that only have a type can be represented just by their string type:
// equivalent to { type: 'TIMER' }
// const timerEvent = 'TIMER';

// state transition (shorthand)
// this is equivalent to { target: 'resolved' }
// RESOLVE: 'resolved',

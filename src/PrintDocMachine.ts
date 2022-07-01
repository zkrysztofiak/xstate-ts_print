import { createMachine, assign } from 'xstate';
import axios from 'axios';
import { initialContext } from './models/typyPr';
// import { ZnPContext } from './myTypes';
// import { fetchWoP } from './api/ZnP';

const BASE_URL = 'http://localhost:4001';

export const fetchWoP = async (umowaID: number) => {
	const response = await axios.get<void>(`${BASE_URL}/WoP/${umowaID}`);
	return response.data;
};

// type Context = typeof initialContext;
// export const PrintMachine = createMachine<ZnPContext, any, any>(
export const PrintDocMachine = createMachine(
	{
		id: 'PrintMachine',
		context: initialContext,
		initial: 'idle',
		states: {
			idle: {
			  on: {
				DRUKUJ: "przygotowanie_danych",
			  },
			},
			przygotowanie_danych: {
			//   after: { 1000: "przygotowanie_danych" },
			  on: {
				GENERUJ_PDF: "generowaniePDF",
			  },
			},
			generowaniePDF: {
			  // after: { 1000: "wybor_gdzie" },
			  on: {
				SPRAWDZ_PDF: "kontrolaPDF",
			  },
			},
			kontrolaPDF: {
			  on: {
				PDF_OK: "wybor_gdzie",
				PDF_ZLY: "przygotowanie_danych",
			  },
			},
			wybor_gdzie: {
			  on: {
				NA_DRUKARKE: "drukowanie",
				DO_PDF_ONLY: "zapis_pdf",
			  },
			},
		
			drukowanie: {
			  //after: { 1000: "wybor_gdzie" },
			  on: {
				DRUK_DONE: "zapis_pdf",
			  },
			},
			zapis_pdf: {
			  on: {
				ZAPIS_BLAD: 'failure',
				ZAPIS_OK: 'koniec',
		
			  }
			},
			koniec: {
			  type: "final",
			},
			failure: {
			  on: {
				RETRY: {
				  target: "zapis_pdf",
				  //actions: assign({
				   // retries: (context, event) 
					 // => context.retries + 1,
				  //}),
				},
			  },
			},
		  },

	},
	{
		actions: {
			// increment: assign({ layoutID: (context) => context.layoutID + 1 }),
			updateNrWoPconsoleLog: (context, event: any) => console.log('event =', event),
			updateNrWoP: assign({ WoPid: (context, { nrWoP }: any) => nrWoP }),
			// updateNrWoP: assign({ WoPid: (context, event: any) => event.nrWoP }),
			updateFetched: assign({ layoutID: (context, event: any) => context.fetched.layoutID }),
			przelicz: assign({ layoutID: (context, event: any) => context.fetched.layoutID - 2 + 1 }),
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

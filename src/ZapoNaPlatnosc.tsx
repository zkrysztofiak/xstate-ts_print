import React from 'react';
import { Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { useMachine } from '@xstate/react';
import { zapoNaPlatnoscMachine } from './zapoNaPlatnoscMachine';
import { Form2 } from './Form2';
import { FormNrWoP } from './FormNrWoP';
import { SOptions } from './myTypes';

function ZapoNaPlatnosc() {
	const [current, send] = useMachine(zapoNaPlatnoscMachine);
	console.log('current.context.validateStatus=', current.context.validateStatus, 'current.context.error=', current.context.error);
	// let myString: string = 'error';
	// let myProp: SOptions = myString as SOptions;

	const enumPropValidateStatus = current.context.validateStatus as SOptions;

	const handleOnFinishForm2 = (values: any) => {
		console.log(values);
		console.log(values.potracenia);
		send('DONE_POMNIEJSZONO', {
			potracenia: values.potracenia,
			doplataReklamacja: values.doplataReklamacja,
		});
	};
	const handleOnFinishFormNrWoP = (values: any) => {
		console.log(values);
		send('NR_WoP_POBRANY', { nrWoP: values.nrWoP, pupa: 1313 });
	};
	return (
		<>
			<table className='containerZnP'>
				<thead>
					<tr>
						<th colSpan={2}>{current.matches('pobieranieWoP') && <Spin tip='Loading...' />}</th>
						<th colSpan={4}>Status: {current.value}</th>
						<th colSpan={4}>kwotaZnP: {current.context.kwotaZnP}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>00fr</td>
						<td>01fr</td>
						<td>02fr</td>
						<td>03fr</td>
						<td>04fr</td>
						<td>
							<Button type='primary' disabled={!current.matches('przeslanoDaneUtylizacjiWoP')} onClick={() => send('AKTUALNY_MONTAZ_FIN')}>
								AKTUALNY MONTAZ FIN.
							</Button>
						</td>
						<td>06fr</td>
						<td>07fr</td>
						<td>08fr</td>
						<td>09fr</td>
					</tr>
					<tr>
						<td>
							<Button type='primary' disabled={!current.matches('idle')} onClick={() => send('POBIERZ_ZWoP')}>
								POBIERZ WoP z SZOBa
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('pobranoDaneWoP')} onClick={() => send('TESTUJ_POKRYCIE100PR')}>
								TESTUJ POKRYCIE 100%
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('testPokrycia100procent')} onClick={() => send('TAK100PR')}>
								TAK 100%
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('akceptacjaKierDWB')} onClick={() => send('AKCEPT_KIER_DWB')}>
								AKCEPT KIER. DWB
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('przekazanieZnP2BFK')} onClick={() => send('PRZEKAZ2BFK')}>
								PRZEKAZ do BFK
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('przesylanieDanychUtylizacjiWoP')} onClick={() => send('PRZESLIJ_UTYL_WoP')}>
								PRZESLIJ UTYL. WoP
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('przeslanoDaneUtylizacjiWoP')} onClick={() => send('TESTUJ_WYK100PR')}>
								TESTUJ WYK 100%
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('testWyk100procent')} onClick={() => send('TAK_WYK100PR')}>
								TAK WYK. 100%
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('koniec')} onClick={() => send('TAK_WYK100PR')}>
								KONEC
							</Button>
						</td>
					</tr>
					<tr>
						<td>20fr</td>
						<td>21fr</td>
						<td>
							<Button type='primary' disabled={!current.matches('testPokrycia100procent')} onClick={() => send('PONIZEJ100PR')}>
								PONIZEJ 100%
							</Button>
						</td>
						<td>
							<Button
								type='primary'
								disabled={!current.matches('pomniejszanieKwotyWoP')}
								onClick={() => send('DONE_POMNIEJSZONO', { kwotaMinus: 66, dupa: 3435 })}>
								Korekty
							</Button>
						</td>
						<td>24fr</td>
						<td>25fr</td>
						<td>26fr</td>
						<td>
							<Button type='primary' disabled={!current.matches('testWyk100procent')} onClick={() => send('PONIZEJ_WYK100PR')}>
								PONIZEJ WYK. 100%
							</Button>
						</td>
						<td>28fr</td>
						<td>29fr</td>
					</tr>
					<tr>
						<td className='td_form1' colSpan={2}>
							{current.matches('pytanieOnrWoPForm') && (
								<FormNrWoP
									nrWoP={current.context.WoPid}
									errorMessage={current.context.message}
									validateStatus={enumPropValidateStatus}
									handleOnFinish={handleOnFinishFormNrWoP}
								/>
							)}
							{current.matches('pomniejszanieKwotyWoP') && (
								<Form2
									kwotaZnP={current.context.fetched.kwotaZnP}
									doplataReklamacja={current.context.fetched.doplataReklamacja}
									potracenia={current.context.fetched.potracenia}
									handleOnFinish={handleOnFinishForm2}
								/>
							)}
						</td>
						<td colSpan={8}>
							<pre style={{ textAlign: 'left' }}>{JSON.stringify({ value: current.value, context: current.context }, null, 2)}</pre>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default ZapoNaPlatnosc;

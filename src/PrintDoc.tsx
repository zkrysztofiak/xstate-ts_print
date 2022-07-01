import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { useMachine } from '@xstate/react';
import { PrintDocMachine } from './PrintDocMachine';
import { FormPrint1 } from './FormPrint1';
// import { FormNrWoP } from './FormNrWoP';
// import { SOptions } from './myTypes';
import pdf_draft from './img/pdf_draft.jpg'; // Tell Webpack this JS file uses this image
//const logo =  require("./img/pdf_draft.JPG")

function ZapoNaPlatnosc() {
	const [current, send] = useMachine(PrintDocMachine);
	console.log('current.context.validateStatus=', current.context.validateStatus, 'current.context.error=', current.context.error);
	// let myString: string = 'error';
	// let myProp: SOptions = myString as SOptions;

	// const enumPropValidateStatus = current.context.validateStatus as SOptions;

	const handleOnFinishFormPrint1 = (values: any) => {
		console.log(values);
		console.log(values.potracenia);
		setLoading(true);setTimeout(() => {send('GENERUJ_PDF', {
			potracenia: values.potracenia,
			doplataReklamacja: values.doplataReklamacja,
		}); setLoading(false)}, 1000)
		// send('GENERUJ_PDF', {
		// 	potracenia: values.potracenia,
		// 	doplataReklamacja: values.doplataReklamacja,
		// });
	};
	// const handleOnFinishFormNrWoP = (values: any) => {
	// 	console.log(values);
	// 	send('NR_WoP_POBRANY', { nrWoP: values.nrWoP, pupa: 1313 });
	// };
	const [loading, setLoading] = useState<boolean>(false);
	let genrujPDF = ():void => {
		setLoading(true);setTimeout(() => {send('GENERUJ_PDF');setLoading(false)}, 1000)
	  }
	return (
		<>
			<table className='containerZnP'>
				<thead>
					<tr>
						{/* <th colSpan={2}>{current.matches('przygotowanie_danych') && <Spin tip='Loading...' />}</th> */}
						<th colSpan={2}>{loading && <Spin tip='Loading...' />}</th>
						<th colSpan={4}>Status: {current.value}</th>
						<th colSpan={4}>layoutID: {current.context.layoutID}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>00fr</td>
						<td>01fr</td>
						<td>02fr</td>
						<td>03fr</td>
						<td>04fr</td>
						<td>05fr</td>
						<td>06fr</td>
						<td>07fr</td>
						<td>08fr</td>
						<td>09fr</td>
					</tr>
					<tr>
						<td>
							<Button type='primary' disabled={!current.matches('idle')} onClick={() => send('DRUKUJ')}>
								DRUKUJ
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('przygotowanie_danych')} loading={loading} onClick={genrujPDF}
								// () => {setLoading(true);setTimeout(() => {send('GENERUJ_PDF');setLoading(false)}, 1000)}
								
								
							>
								GENERUJ PDF
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('generowaniePDF')} onClick={() => send('SPRAWDZ_PDF')}>
								SPRAWDZ PDF
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('kontrolaPDF')} onClick={() => send('PDF_OK')}>
								PDF OK ?
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('wybor_gdzie')} onClick={() => send('NA_DRUKARKE')}>
								NA DRUKARKE
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('drukowanie')} onClick={() => send('DRUK_DONE')}>
								DRUK OK (udany)
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('zapis_pdf')} onClick={() => send('ZAPIS_OK')}>
								Zapis OK ?
							</Button>
						</td>
						<td>
							{/* <Button type='primary' disabled={!current.matches('testWyk100procent')} onClick={() => send('TAK_WYK100PR')}>
								TAK WYK. 100%
							</Button> */}
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
						<td>22fr</td>
						<td>
							<Button	type='primary'	disabled={!current.matches('kontrolaPDF')} danger={true} onClick={() => send('PDF_ZLY')}>
								PDF ZLY
							</Button>
						</td>
						<td>
							<Button	type='primary'	disabled={!current.matches('wybor_gdzie')}	onClick={() => send('DO_PDF_ONLY')}>
								Tylko PDF (archwum)
							</Button>
						</td>
						<td>25fr</td>
						<td>
							<Button type='primary' disabled={!current.matches('zapis_pdf')} danger={true} onClick={() => send('ZAPIS_BLAD')}>
								Błąd zapisu ?
							</Button>
						</td>
						<td>
							<Button type='primary' disabled={!current.matches('failure')} onClick={() => send('RETRY')}>
								RETRY
							</Button>
						</td>
						<td>28fr</td>
						<td>29fr</td>
					</tr>
					<tr>
						<td className='td_form1' colSpan={6}>
						{(current.matches('generowaniePDF') || current.matches('kontrolaPDF') ) && (
								<img src={pdf_draft} alt="Logo" />
						)}
						{current.matches('przygotowanie_danych') && (
							<FormPrint1
								layoutID={current.context.fetched.layoutID}
								umowaID={current.context.fetched.umowaID}
								handleOnFinish={handleOnFinishFormPrint1}
							/>
						)}
						</td>
						<td colSpan={4}>
							<pre style={{ textAlign: 'left' }}>{JSON.stringify({ value: current.value, context: current.context }, null, 2)}</pre>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default ZapoNaPlatnosc;

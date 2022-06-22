import React from 'react';
import { render } from 'react-dom';
import './App.css';
import ZapoNaPlatnosc from './ZapoNaPlatnosc';
// import TrafficLights from './TrafficLights';

// ReactDOM.render(
// 	<React.StrictMode>
// 		<TrafficLights />
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );

const rootElement = document.getElementById('root');
render(
	<section>
		{/* <TrafficLights /> */}
		<ZapoNaPlatnosc />
	</section>,
	rootElement
);

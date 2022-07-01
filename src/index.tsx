import React from 'react';
import { render } from 'react-dom';
import './App.css';
import PrintDoc from './PrintDoc';

const rootElement = document.getElementById('root');
render(
	<section>
		<PrintDoc />
	</section>,
	rootElement
);

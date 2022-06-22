import React from 'react';
import { Form, Input, Button } from 'antd';
import { Form2Props } from './myTypes';

// validateFields().then((values) => {
// 	// Do something with value
// });

const handleOnFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo);
};
export const Form2: React.FC<Form2Props> = (props) => {
	return (
		<div className=''>
			<>
				<Form
					layout='vertical'
					initialValues={{
						kwotaZnP: props.kwotaZnP,
						potracenia: props.potracenia,
						doplataReklamacja: props.doplataReklamacja,
						nalezneSaldo: props.nalezneSaldo,
						doWyplaty: props.nalezneSaldo,
					}}
					onFinish={props.handleOnFinish}
					onFinishFailed={handleOnFinishFailed}>
					<Form.Item label='KwotaZnP' name='kwotaZnP'>
						<Input disabled={true} />
					</Form.Item>
					<Form.Item label='Dopłata z reklamacji:' name='doplataReklamacja'>
						<Input />
					</Form.Item>
					<Form.Item label='Potrącenia:' name='potracenia'>
						<Input />
					</Form.Item>
					<Form.Item label='Kwota nalezna/Saldo:' name='nalezneSaldo'>
						<Input disabled={true} />
					</Form.Item>
					<Form.Item label='Kwota do wyplaty:' name='doWyplaty'>
						<Input disabled={true} />
					</Form.Item>
					<Form.Item>
						{/* <Button type='primary' size='large' onClick={props.handleOnClick}> */}
						<Button type='primary' size='large' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</>
		</div>
	);
};

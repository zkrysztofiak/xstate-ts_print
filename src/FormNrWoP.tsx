import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormNrWoPprops } from './myTypes';

export const FormNrWoP: React.FC<FormNrWoPprops> = (props) => {
	return (
		<div className=''>
			<>
				<Form
					layout='vertical'
					initialValues={{
						nrWoP: props.nrWoP,
					}}
					onFinish={props.handleOnFinish}>
					<Form.Item
						label='Nr WoP'
						name='nrWoP'
						help={props.errorMessage}
						// help='hhhheeellp!'
						validateStatus={props.validateStatus} // validateStatus='error'
						rules={[
							{
								required: true,
								message: 'Coś wpisz 404 (Not Found)',
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button type='primary' size='large' htmlType='submit'>
							Pobierz
						</Button>
					</Form.Item>
				</Form>
			</>
		</div>
	);
};

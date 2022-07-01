import React from 'react';
import { Form, Input, Button } from 'antd';

interface Fields {
	layoutID: string;
	umowaID: string;
}

interface Form1Props {
	layoutID: number;
	umowaID: number;
	name?: string;
	handleOnFinish?: (values: Fields) => void;
}

export const FormPrint1: React.FC<Form1Props> = ({ layoutID, umowaID, handleOnFinish }) => {
	return (
		<div className=''>
			<>
				<Form layout='vertical' onFinish={handleOnFinish}>
					<Form.Item label='layoutID' name='layoutID'>
						<Input placeholder={layoutID + ''} />
					</Form.Item>
					<Form.Item label='umowaID i inne parametry:' name='umowaID'>
						<Input placeholder={umowaID + ''} />
					</Form.Item>
					<Form.Item>
						<Button type='primary' size='large' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</>
		</div>
	);
};

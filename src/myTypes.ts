export type UserID = number;
export type User = {
	id: UserID;
	firstName: string;
	lastName: string;
};

type Fields = {
	// WoPid: number;
	kwotaZnP: number; //podstawa
	doplataReklamacja?: number;
	potracenia: number;
	nalezneSaldo?: number; //wyliczona z algorytmu +/-
	doWyplaty?: number; //wyliczone
	kwotaNaleznaSaldo?: number;
};

export interface Form2Props extends Fields {
	// handleOnFinish: (changedFields: Fields) => void;
	handleOnFinish(changedFields: Fields): void;
}
export enum SOptions {
	error = 'error',
	success = 'success',
}

// export type SOptions = 'error' | 'success' | 'Banana';

interface FieldsFormNrWo {
	nrWoP: number;
	errorMessage: String;
	// validateStatus: 'error' | 'success';
	validateStatus: SOptions;
}
export interface FormNrWoPprops extends FieldsFormNrWo {
	handleOnFinish: (changedFields: FieldsFormNrWo) => void;
}

export interface ZnPContext extends Fields {
	WoPid: number;
	error: any;
	message: String;
	validateStatus: String;
	fetched: {};
}

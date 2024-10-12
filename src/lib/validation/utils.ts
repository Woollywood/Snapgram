import { FieldValues } from 'react-hook-form';

export const reduceFields = <T extends FieldValues = FieldValues>(formValues: T) => {
	return Object.keys(formValues).reduce<Record<string, { label: string }>>(
		(acc, key) => ({ ...acc, [key]: { label: `${key[0].toUpperCase()}${key.slice(1)}` } }),
		{},
	);
};

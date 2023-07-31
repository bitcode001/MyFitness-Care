import React from 'react';
import {Text} from 'react-native';
import {ErrorMessage} from 'formik';

export default function ErrorLabel({
  fieldKey,
}: {
  fieldKey: string;
}): JSX.Element {
  return (
    <ErrorMessage name={fieldKey}>
      {msg => <Text className="text-red-500 text-sm">{msg}</Text>}
    </ErrorMessage>
  );
}

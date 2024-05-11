import { ChangeEvent, useCallback } from 'react';
import { Stack, Text, TextInput } from '@sanity/ui';
import { set, unset } from 'sanity';
import CharacterCount from './CharacterCount';

interface Props {
  elementProps: any;
  onChange: Function;
  value: string;
  schemaType: unknown;
}

export const StringInput = (props: Props) => {
  const { elementProps, onChange, value = '' } = props;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    onChange(nextValue ? set(nextValue) : unset());
  }, [onChange]);

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
      />
      <Text style={{ marginLeft: 'auto' }}><CharacterCount {...props} /></Text>
    </Stack>
  );
};

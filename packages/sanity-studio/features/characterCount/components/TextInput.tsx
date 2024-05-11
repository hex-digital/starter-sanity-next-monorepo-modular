import { ChangeEvent, useCallback } from 'react';
import { Stack, Text, TextArea } from '@sanity/ui';
import { set, TextInputProps, unset } from 'sanity';
import CharacterCount from './CharacterCount';

export const TextInput = (props: TextInputProps) => {
  const { elementProps, onChange, value = '' } = props;

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.currentTarget.value;
    onChange(nextValue ? set(nextValue) : unset());
  }, [onChange]);

  return (
    <Stack space={2}>
      <TextArea
        {...elementProps}
        onChange={handleChange}
        value={value}
        style={{ resize: 'vertical' }}
      />
      <Text style={{ marginLeft: 'auto' }}><CharacterCount {...props} /></Text>
    </Stack>
  );
};

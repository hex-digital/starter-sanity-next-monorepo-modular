import styles from './CharacterCount.module.css';
import { StringInputProps, StringSchemaType, TextInputProps, TextSchemaType } from 'sanity';
import { StringCountSchemaDefinition, TextCountSchemaDefinition } from '../types';

type StringInputCharProps = StringInputProps & { schemaType: StringSchemaType & StringCountSchemaDefinition };
type TextInputCharProps = TextInputProps & { schemaType: TextSchemaType & TextCountSchemaDefinition };

function getMinMax(schemaType: StringInputCharProps['schemaType'] | TextInputCharProps['schemaType']) {
  return {
    min: schemaType.options.minLength,
    max: schemaType.options.maxLength,
  };
}

export default function CharacterCount(props: StringInputCharProps | TextInputCharProps) {
  const { value = '', schemaType } = props;
  const { min, max } = getMinMax(schemaType);

  let characters: string;
  let classes = [styles.textInput];

  if (min || max) {
    characters = `${value.length}`;
    if (max) {
      characters = `${characters} / ${max}`;
    }
  }
  if ((min && value.length < min) || (max && value.length > max)) {
    classes.push(styles.textInputWarning);
  }

  return (
    <span className={classes.join(' ')}>{characters}</span>
  );
}

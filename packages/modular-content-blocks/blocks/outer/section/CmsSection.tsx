import Section from '@pkg/ui/components/blocks/Section';
import { ModularBlock } from '@pkg/sanity-web/types/sanity';

interface CmsSectionData {
  className?: string;
  block?: ModularBlock & {
    title?: string;
  };
}

export const component = (props: CmsSectionData) => {
  return <Section className={props.className}>Cms Section: {props.block?.title}</Section>;
}

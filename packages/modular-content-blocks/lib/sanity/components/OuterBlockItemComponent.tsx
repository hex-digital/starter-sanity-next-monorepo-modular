import type { ReactNode } from 'react';
import type { ObjectItemProps } from 'sanity';
import { Stack, Card } from '@sanity/ui';
import { ObjectMember } from 'sanity';
import { ReactElement, ReactPortal } from 'react';
import { OBJECT } from '@pkg/config/sanity/schemaTypes';
import { ModularBlocksProvider } from './ModularBlocksProvider';

const fieldToChildFields: Record<string | OBJECT, (Array<string> | ((props: ObjectItemProps) => ReactNode))> = {
  default: ['content'],
}

export function OuterBlockItemComponent(props: ObjectItemProps) {
  if (
    !props.children
    || typeof props.children === 'string'
    || typeof props.children === 'number'
    || typeof props.children === 'boolean'
    || !('props' in props.children)
  ) {
    return props.renderDefault(props);
  }

  const { type, children, hasInnerBlocks = [] } = getChildrenPreview(props, props.children);

  return (
    <Stack>
      <Card>
        <Card margin={2} style={{marginBottom: type === 'preview' ? '-10px' : '0'}}>
          <ModularBlocksProvider>
            {props.renderDefault(props)}
          </ModularBlocksProvider>
        </Card>
        {(
          <Card paddingX={6} paddingBottom={hasInnerBlocks ? 5 : 4} borderBottom={hasInnerBlocks}>
            <ModularBlocksProvider overviewPreview={true}>
              {children}
            </ModularBlocksProvider>
          </Card>
        )}
      </Card>
    </Stack>
  )
}

function getChildrenPreview(props: ObjectItemProps, children: ReactElement | ReactPortal) {
  const type = props?.value?._type || 'default';

  const childFields = type in fieldToChildFields
    ? fieldToChildFields[type]
    : fieldToChildFields.default;

  if (typeof childFields === 'function') {
    return {
      type: 'custom',
      children: childFields(children.props),
    };
  }

  const contentMember = children?.props.members.find(
    (member: ObjectMember) => 'name' in member && childFields.includes(member.name)
  );

 const members = !contentMember
    ? []
    : [{
      ...contentMember,
      field: {
        ...contentMember.field,
        schemaType: {
          ...contentMember.field.schemaType,
          title: ' ', // Empty string to hide original field title
        },
      },
    }];

  // Deep clone object so the regular modal view is unaffected
  // while showing only the "inner" modular content, and removing its "title" via empty string
  return {
    type: 'preview',
    childFields,
    hasInnerBlocks: !!contentMember,
    children: {
      ...children,
      props: {
        ...children.props,
        members,
      },
    },
  };
}

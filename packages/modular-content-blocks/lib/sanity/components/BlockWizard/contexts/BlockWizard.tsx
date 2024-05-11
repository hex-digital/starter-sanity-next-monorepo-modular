import React, { createContext, ReactNode } from 'react';

interface ContextProps {
  openBlockWizard: (handleAdd?: any) => void;
}

interface Props extends ContextProps {
  children: ReactNode;
}

export const BlocksWizardContext = createContext<ContextProps>({
  openBlockWizard: (handleAdd?: any) => {}
});

export const BlocksWizardProvider = (props: Props) => {
  const { children, openBlockWizard } = props;

  const contextValue: ContextProps = { openBlockWizard };

  return (
    <BlocksWizardContext.Provider value={contextValue}>
      {children}
    </BlocksWizardContext.Provider>
  );
};

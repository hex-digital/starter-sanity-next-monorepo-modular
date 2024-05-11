import { UserViewComponent } from "sanity/structure";

export interface Options {
  indentation?: number;
}

const JsonPreview: UserViewComponent<Options> = ({ options, document }) => {
  const { displayed } = document;
  const { indentation = 2 } = options;
  const JSONstring = JSON.stringify(displayed, null, indentation);

  return (<pre>{JSONstring}</pre>);
};

export default JsonPreview;

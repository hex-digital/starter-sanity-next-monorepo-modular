import { Image } from 'sanity';

export interface BlockAddParams {
  blocks: Array<{
    blockName: string;
    initialValue?: any;
  }>;
  clone?: boolean;
}

export type OnBlockAddFn = (toAdd: BlockAddParams) => void;

export interface ReusableBlockDocument {
  _id: string;
  _type: string;
  title?: string;
  image?: Image;
  content?: Array<any>;
}

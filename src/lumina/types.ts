export type ComponentCategory =
  | 'primitives'
  | 'form'
  | 'navigation'
  | 'data-display'
  | 'overlay'
  | 'blocks'
  | 'playground'
  | 'docs';

export interface ComponentDocItem {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  usageSnippet: string;
  tags: string[];
}

export interface TreeItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: TreeItem[];
}

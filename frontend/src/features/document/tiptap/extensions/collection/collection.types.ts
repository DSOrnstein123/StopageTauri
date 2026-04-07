export const COLUMN_TYPES = ["text", "number", "date", "checkbox"] as const;

export type ColumnType = (typeof COLUMN_TYPES)[number];

export interface ColumnValueMap {
  text: string;
  number: number;
  date: string;
  checkbox: boolean;
}

export interface Collection {
  id: string;
  name: string;
  schema: ColumnSchema[];
  position: number;
}

export interface ColumnSchema {
  id: string;
  name: string;
  type: ColumnType;
}

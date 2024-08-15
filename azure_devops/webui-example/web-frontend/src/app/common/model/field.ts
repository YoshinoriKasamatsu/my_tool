export interface SupportedOperation {
  referenceName: string;
  name: string;
}

export interface FieldValue {
  isLocked: boolean;
  name: string;
  referenceName: string;
  description: string;
  type: string;
  usage: string;
  readOnly: boolean;
  canSortBy: boolean;
  isQueryable: boolean;
  supportedOperations: SupportedOperation[];
  isIdentity: boolean;
  isPicklist: boolean;
  isPicklistSuggested: boolean;
  url: string;
}

export interface Field{
  count: number;
  value: FieldValue[];
}

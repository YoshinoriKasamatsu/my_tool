export interface ClassificationChild {
  id: number;
  identifier: string;
  name: string;
  structureType: string;
  hasChildren: boolean;
  path: string;
  url: string;
}

export interface ClassificationValue {
  id: number;
  identifier: string;
  name: string;
  structureType: string;
  hasChildren: boolean;
  children: ClassificationChild[];
  path: string;
  url: string;
}


export interface Classification {
  count: number;
  value: ClassificationValue[];
}

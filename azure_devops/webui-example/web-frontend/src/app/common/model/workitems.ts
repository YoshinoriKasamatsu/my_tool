export interface DynamicObject {
  [key: string]: string | number | boolean;
}

export interface WorkItem {
  id:number;
  rev:number;
  url: string;
  fields: DynamicObject[];
}

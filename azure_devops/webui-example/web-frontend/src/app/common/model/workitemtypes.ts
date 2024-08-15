
export interface Icon {
  id: string,
  url: string
}

export interface State {
  name: string,
  color: string,
  category: string
}

export interface Field {
  defaultValue:  string | null,
  alwaysRequired: boolean,
  referenceName: string,
  name: string,
  url: string
}

export interface FieldInstance {
  defaultValue: string | null,
  alwaysRequired: false,
  referenceName: string,
  name: string,
  url: string
}

export interface Transition {

}

export interface WorkItemTypesValue {
  name: string,
  referenceName: string,
  description: string,
  color: string,
  icon: Icon,
  isDisabled: boolean,
  url: string,
  fields: Field[],
  fieldInstances: FieldInstance[],
  transitions: Transition[],
  states: State[]
}

export interface WorkItemTypes {
  count: number;
  value: WorkItemTypesValue[];
}

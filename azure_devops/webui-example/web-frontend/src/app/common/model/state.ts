export interface StateValue {
  name: string;
  color: string;
  category: string;
}

export interface State {
  count: number;
  value: StateValue[];
}

export interface Category {
  count: number,
  value: CategoryValue[]

}

export interface CategoryValue {
  name: string;
  referenceName: string;
  defaultWorkItemType: DefaultWorkItemTypeName;
  workItemTypes: WorkItemTypesName[];
}

export interface DefaultWorkItemTypeName {
  name: string;
  ur: string;
}

export interface WorkItemTypesName {
  name: string;
  ur: string;
}

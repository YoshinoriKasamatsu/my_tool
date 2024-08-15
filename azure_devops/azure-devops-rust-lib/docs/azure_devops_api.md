
# Wiql
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/wiql/query-by-wiql?view=azure-devops-rest-7.0&tabs=HTTP
```
POST https://dev.azure.com/{organization}/{project}/{team}/_apis/wit/wiql?api-version=7.0
```

# WorkItems
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/work-items/list?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/{project}/_apis/wit/workitems?ids={ids}&api-version=7.0
```

# revisions
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/revisions/list?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/{project}/_apis/wit/workItems/{id}/revisions?api-version=7.0
```

# pullrequests
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/git/pull-requests/get-pull-requests?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/{project}/_apis/git/repositories/{repository_id}/pullrequests?api-version=7.0
```

# Field
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/fields/list?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/{project}/_apis/wit/fields?$expand={$expand}&api-version=7.0
```

# Work Item Types(WorkItmeの種類ごとの項目一覧)
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/work-item-types/list?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/{project}/_apis/wit/workitemtypes?api-version=7.0
```

# Work Item Types Field(WorkItemのフィールド一覧をBug/Taskなどを指定して取得)
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/work-item-types-field/list?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/{project}/_apis/wit/workitemtypes/{type}/fields?$expand={$expand}&api-version=7.0
```

# Work Item Type Categoriees(WorkItemのカテゴリ一覧取得)
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/work-item-type-categories/list?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/{project}/_apis/wit/workitemtypecategories?api-version=7.0
```

# Work Item Type States(チケットの状態[New, Activeなど])
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/work-item-type-states/list?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/{project}/_apis/wit/workitemtypes/{type}/states?api-version=7.0
```

# Classification Nodes(AreaやIterationの選択肢)
https://learn.microsoft.com/ja-jp/rest/api/azure/devops/wit/classification-nodes/get-root-nodes?view=azure-devops-rest-7.0
```
GET https://dev.azure.com/{organization}/{project}/_apis/wit/classificationnodes?$depth={$depth}&api-version=7.0
```

# Projects - List
https://learn.microsoft.com/en-us/rest/api/azure/devops/core/projects/list?view=azure-devops-rest-7.1&tabs=HTTP
```
GET https://dev.azure.com/{organization}/_apis/projects?api-version=7.0
```

# Projects - Get Project Properties
https://learn.microsoft.com/en-us/rest/api/azure/devops/core/projects/get-project-properties?view=azure-devops-rest-7.1&tabs=HTTP
```
GET https://dev.azure.com/{organization}/_apis/projects/{projectId}/properties?api-version=7.1-preview.1
```

# Processes - List
https://learn.microsoft.com/en-us/rest/api/azure/devops/core/processes/list?view=azure-devops-rest-7.1
```
GET https://dev.azure.com/{organization}/_apis/process/processes?api-version=7.1-preview.1
```

# Work Item Types - Get
https://learn.microsoft.com/en-us/rest/api/azure/devops/processes/work-item-types/get?view=azure-devops-rest-7.0&tabs=HTTP
```
GET https://dev.azure.com/{organization}/_apis/work/processes/{processId}/workitemtypes/{witRefName}?api-version=7.0
```

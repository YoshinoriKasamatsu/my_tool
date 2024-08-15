

/*
    組織のプロジェクト一覧を取得する
*/
pub fn create_projects_url(organization: &str) -> String {
    let request_url = format!("https://dev.azure.com/{}/_apis/projects?api-version=7.0", organization);
    request_url
}

/*
    組織のプロジェクトの情報を取得する
*/
pub fn create_project_url(organization: &str, project_id: &str) -> String {
    let request_url = format!("https://dev.azure.com/{}/_apis/projects/{}/properties?api-version=7.1-preview.1", organization, project_id);
    request_url
}
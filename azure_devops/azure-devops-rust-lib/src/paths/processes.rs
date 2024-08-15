
/*
    Work Item Types Lit
*/
pub fn create_processes_url(organization: &str, process_id: &str, expand: &str) -> String {
    let request_url = format!("https://dev.azure.com/{}/_apis/work/processes/{}/workitemtypes?$expand={}&api-version=7.0", organization, &process_id, &expand);
    request_url
}

/*
    Work Item Type
*/
pub fn create_process_url(organization: &str, project_id: &str, wit_ref_name: &str, expand: &str) -> String {
    let request_url = format!("GET https://dev.azure.com/{}/_apis/work/processes/{}/workitemtypes/{}?$expand={}&api-version=7.0", organization, project_id, wit_ref_name, expand);
    request_url
}
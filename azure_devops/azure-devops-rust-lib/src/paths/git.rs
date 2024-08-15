use url::Url;

pub fn create_url(
    organization: &str,
    project: &str,
    repository_id: &str,
    skip: Option<u32>,
    top: Option<u32>,
    creator_id: Option<&str>,
    reviewer_id: Option<&str>,
    source_ref_name: Option<&str>,
    target_ref_name: Option<&str>,
    status: Option<&str>,
) -> String {

    let mut params: Vec<(&str, String)> = Vec::new();

    if let Some(skip_value) = skip {
        params.push(("$skip", skip_value.to_string()));
    }

    if let Some(top_value) = top{
        let value = top_value.to_string();
        params.push(("$top", value))
    }

    if let Some(create_id_value) = creator_id{
        params.push(("searchCriteria.creatorId", create_id_value.to_string()))
    }

    params.push(("searchCriteria.includeLinks", "true".to_string()));

    if let Some(reviewer_id_value) = reviewer_id{
        params.push(("searchCriteria.reviewerId", reviewer_id_value.to_string()))
    }

    if let Some(source_ref_name_value) = source_ref_name{
        params.push(("searchCriteria.sourceRefName", source_ref_name_value.to_string()))
    }

    if let Some(target_ref_name_value) = target_ref_name{
        params.push(("searchCriteria.targetRefName", target_ref_name_value.to_string()))
    }

    if let Some(status_value) = status{
        params.push(("searchCriteria.status", status_value.to_string()))
    }

    params.push(("api-version", String::from("7.0")));

    let base_url = format!("https://dev.azure.com/{}/{}/_apis/git/repositories/{}/pullrequests", organization, project, repository_id);

    let request_url = Url::parse_with_params(&base_url, params).unwrap();

    request_url.to_string()
}

interface QueryParamsInterface{
    task_assings: any,
    csrf_token: any,
    user_id: any,
    account_id: any,
  }
  
  export const getQueryParams = () : QueryParamsInterface => {
  
    const params = new URLSearchParams(window.location.search);
    const paramObj : any = {};
    const params_keys = Array.from(params.keys())
    params_keys.forEach(value => {
      paramObj[value] = params.get(value)
    })
    return paramObj
  }
  
  export const getDateAndTime = () => {
    return Date().toLocaleString()
  }
  
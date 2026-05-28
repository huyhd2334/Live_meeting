import api from '@/lib/axios'

export const getWorkSpaceByUserId = async() => {
    const result = await api.get("workspace/get", { withCredentials: true })
    return result.data  
}

export const createUserWorkSpaceService = async({workspace_name, description}) => {
    const result = await api.post("workspace/create", {workspace_name, description}, { withCredentials: true })
    return result.data
}

export const deleteWorkSpaceService = async(workspace_id) => {
    const result = await api.delete(`workspace/delete/${workspace_id}`, { withCredentials: true})
    return result.data
}

export const addMemberService = async({workspace_id, member_id, role}) => {
    const result = await api.post("/workspace/addmember", {workspace_id, member_id, role}, {withCredentials:true})
    return result.data
}

export const findProjectByWorkspaceService = async(project_id) => {
    const result = await api.get(`/workspace/get/projects/${project_id}`, { withCredentials: true})
    return result.data
}

export const getAllService = async(project_id) => {
    const result = await api.get(`/workspace/get/full/${project_id}`, { withCredentials: true})
    return result.data.data
}
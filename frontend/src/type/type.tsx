export interface TypeOperator {
    id: number
    login: string
    branch_name: string
    role: string
}

export interface TypeBranch {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export interface TypeAdminReport {
    id: number
    login: string
    branch_name: string
    working_time: any
    total_amount: string
    admin_part: string
}

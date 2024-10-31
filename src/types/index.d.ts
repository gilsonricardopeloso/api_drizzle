const permissionTypeEnum = pgEnum('permission_type', ['admin', 'guest', 'read', 'write'])
interface Permissions {
    id: number | string
    resourceId: number
    type: permissionTypeEnum
    name: string
}

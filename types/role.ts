export interface Role {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface RoleWithPermissions extends Role {
  permission_ids: string[];
}

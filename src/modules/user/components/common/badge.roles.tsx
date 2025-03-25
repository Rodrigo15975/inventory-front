export const getRoleName = (roleId: string) => {
  const roles: Record<string, string> = {
    ADMIN: 'ADMIN',
    ALMACENERO: 'ALMACENERO',
  }
  return roles[roleId] || roleId
}

export const getRoleBadgeVariant = (role: string) => {
  const variants: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
  > = {
    ADMIN: 'destructive',
    ALMACENERO: 'secondary',
  }
  return variants[role] || 'default'
}

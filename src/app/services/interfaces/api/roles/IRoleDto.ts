
export enum roles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_DEVELOPER = 'ROLE_DEVELOPER',
  ROLE_USER = 'ROLE_USER',
}


export interface IRoleDto {
  role: roles;
  id: number;
}

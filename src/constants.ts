export enum DataBaseEntity {
  USERS = 'users',
  ARTISTS = 'artists',
}

export const initialDataBase = {
  [DataBaseEntity.USERS]: {},
  [DataBaseEntity.ARTISTS]: {},
}
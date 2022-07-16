export enum DataBaseEntity {
  USERS = 'users',
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  TRACKS = 'tracks',
  FAVOURITES = 'favorites',
}

const coreEntities = {
  [DataBaseEntity.ARTISTS]: {},
  [DataBaseEntity.ALBUMS]: {},
  [DataBaseEntity.TRACKS]: {},
}

export const initialDataBase = {
  ...coreEntities,
  [DataBaseEntity.USERS]: {},
  [DataBaseEntity.FAVOURITES]: {
    ...coreEntities,
  },
}
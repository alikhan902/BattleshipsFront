export type AuthResponse =
{
  username?: string;
  password?: string;
  message?: string;
  status?: number;
}

export type GameSectionType =
{
  id: string,
  name: string,
  turn: number,
  created_at: string,
}

export type CreateGameMessage =
{
  message?: string,
  room_id?: string,
  status?: number
}

export type CreateGameProps =
{
  handleSubmitShowModal: () => void,
  createGameSuccess: (id: string) => void
}

export type CellType =
{
  readonly x: number,
  readonly y: number,
  has_ship: boolean,
  is_shot: boolean
  is_mis_shot: boolean
}

export type CellTypeProps =
{
  my: boolean,
  cell: CellType,
  updateTurn: (cell: CellType) => void;
  isWaiting: boolean
}

export type RoomType =
{
  readonly id: string,
  name: string,
  turn: string,
  current_turn: string,
  player_field: CellType[],
  opponent_field: CellType[]
}

export type CellExportType =
{
  readonly id: string,
  name: string,
  turn: string,
  cell: CellType
}

export type RoomMessage =
{
  message?: string;
  status?: number;
}
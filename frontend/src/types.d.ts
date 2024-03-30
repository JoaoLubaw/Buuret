export declare type Buser = {
  id: number
  username: string
  name: string
  password: string
  email: string
  birthdate: string
  telephone?: string | null
  description?: string
  followers?: number[]
  followers_count?: number
  following_count?: number
  buus_received_count?: number
  following?: number[]
  background?: string
  profile?: string
  rets?: Ret[]
  rereteds?: number | null
  buus_received?: Buus[]
  liked?: Ret[]
  token?: string
  is_active: boolean
}

export declare type LoginBuser = {
  username: string
  password: string
  access: string
}

export declare type Ret = {
  id?: number
  user?: Buser | undefined
  likes?: number[] | null
  datetime?: Date | undefined
  content: string
  media?: string | null | file
  comret?: boolean | null
  replies?: Ret[] | null
  replyto?: Ret | null
  rerets?: null | number[]
  reretedby?: string | null
  refbuu?: number | null | undefined
  likes_count?: number
  replies_count?: number
  reret_count?: number
}

export declare type Buu = {
  id: number
  sender?: Buser | number | undefined
  receiver?: Buser | number | undefined
  content: string
  opened: boolean
}

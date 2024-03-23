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
  user: number | undefined
  likes?: Buser[] | null
  datetime?: Date
  content: string
  media?: string | null
  comret?: boolean | null
  replies?: Ret[] | null
  replyto?: Ret | null
  rerets?: Buser[] | null
  isreret?: boolean
  refbuu?: Buu | null
}

export declare type Buu = {
  id: number
  sender: Buser
  receiver: Buser
  content: string
  opened: boolean
}

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
  id: number
  user: Buser
  likes?: Buser[]
  datetime: Date
  content: string
  media?: string
  comret?: boolean
  replies?: Ret[]
  replyto?: Ret
  rerets?: Buser[]
  isreret?: boolean
  refbuu?: Buu
}

export declare type Buu = {
  id: number
  sender: Buser
  receiver: Buser
  content: string
  opened: boolean
}

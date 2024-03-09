export declare type Buser = {
  id?: number
  username?: string
  name?: string
  password?: string
  email?: string
  birthdate?: string
  phone?: string
  description?: string
  followers?: Buser[]
  followers_count?: number
  following_count?: number
  buus_received_count?: number
  following?: Buser[]
  background?: string
  profile?: string
  rets?: Ret[]
  buusReceived?: Buus[]
  liked?: Ret[]
  token?: string
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

export type Customer = {
  id: number
  name: string
  title: string
  address: Address
}

export type Image = {
  id: string
  width: number
  height: number
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
}

export type Address = {
  street: string
  city: string
  zipCode: string
  county?: string
  country?: string
}

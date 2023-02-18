export default class Phone {
  constructor (
    readonly id: string,
    readonly countryCode: string,
    readonly phoneNumber: string,
    readonly createdAt: number
  ) {}
}

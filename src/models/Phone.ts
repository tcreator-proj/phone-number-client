export default class Phone {
  constructor (
    readonly id: number,
    readonly countryCode: string,
    readonly phoneNumber: string,
    readonly createdAt: string
  ) {}
}

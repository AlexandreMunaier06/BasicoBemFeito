export class Card{
    constructor(cardName, cardNumber, expirationMonth, expirationYear, CVV){
        this.cardName = localStorage.setItem("cardName", cardName)
        this.cardNumber = localStorage.setItem("cardNumber", cardNumber)
        this.expirationMonth = localStorage.setItem("expirationMonth", expirationMonth)
        this.expirationYear = localStorage.setItem("expirationYear", expirationYear)
        this.CVV = localStorage.setItem("CVV", CVV)
    }
}
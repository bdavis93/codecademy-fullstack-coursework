// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8] //1
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9] //2
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]    //3
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5] //4
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6] //5

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5] //6
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3] //7
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]    //8
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5] //9
const invalid5 = [7, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4] //10

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]    //11
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9] //12
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3] //13
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3] //14
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3] //15

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

class CreditCard {
    static UNKNOWN = new CreditCard("Uknown", 0)
    static AMEX = new CreditCard("Amex", 3)
    static VISA = new CreditCard("Visa", 4)
    static MASTER = new CreditCard("Master", 5)
    static DISCOVER = new CreditCard("Discover", 6)

    constructor(cardName, value) {
      this.name = cardName;
      this.value = value;
    }
}

function validateCreditCard(card) {
    let cardDigits = card.slice(0, -1);
    let checkDigit = card[card.length - 1];
    let checkSum = checkDigit;
    let offset = (card.length === 16) ? 0 : 1;

    cardDigits.forEach( (digit, index) => {
        let digitToAdd = ((index+offset) % 2 === 0) ? digit * 2 : digit;
        checkSum += (digitToAdd > 9) ? (digitToAdd - 9) : digitToAdd; 
    });

    return checkSum % 10 === 0; 
}

function findInvalidCreditCards(cardBatch) {
    const invalidCards = [];
    for( let [i, card] of cardBatch.entries()) {
        if(!validateCreditCard(card)) invalidCards.push(card);
    }
    return invalidCards;
}

function getInvalidCardCompanies(invalidCards) {
    const cardCompanies = [];
    for(card of invalidCards) {
        const companyId = card[0];
        switch(companyId) {
            case CreditCard.AMEX.value: 
                cardCompanies.push(CreditCard.AMEX.name);
            case CreditCard.MASTER.value: 
                cardCompanies.push(CreditCard.MASTER.name);
            case CreditCard.VISA.value: 
                cardCompanies.push(CreditCard.VISA.name);
            case CreditCard.DISCOVER.value: 
                cardCompanies.push(CreditCard.DISCOVER.name);
            default:
                cardCompanies.push(CreditCard.UNKNOWN.name);
        }
    }
    return new Set(cardCompanies);
}

const invalidCards = findInvalidCreditCards(batch);
const invalidCardCompanies = getInvalidCardCompanies(invalidCards);
console.log(invalidCardCompanies);
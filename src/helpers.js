export const calculateCardValue = cardValue => {
    switch (cardValue) {
        case "ACE":
            return 1;
            break;
        case "JACK":
            return 11;
            break;
        case "QUEEN":
            return 12;
            break;
        case "KING":
            return 13;
            break;
        default:
            return parseInt(cardValue);
            break;
    }

    return parseInt(cardValue);
};

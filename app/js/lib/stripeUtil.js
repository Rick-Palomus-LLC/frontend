const StripeUtil = {
    addCard: addCard,
    submitPayment: submitPayment
}

export default StripeUtil;

const stripe = Stripe('ENV.STRIPE_PUBLISHABLE_KEY');

function addCard(selector){
    const elements = stripe.elements();
        
    const card = elements.create('card');
    
    card.mount(selector);
    
    return card;
}

async function submitPayment(card){
    if(!card)
        throw new Error('Card is required');
    
    const {token, error} = await this._stripe.createToken(this._card);
    
    if(error)
        throw new Error(error.message);

    return token;
}

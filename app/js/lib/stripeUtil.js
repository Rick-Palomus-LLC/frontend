export default class StripeUtil {
    
    constructor(){
        this._stripe = Stripe('ENV.STRIPE_PUBLISHABLE_KEY');
    }

    addCard(selector){
        if(this._card)
            return this._card;
        
        const elements = this._stripe.elements();
        
        const card = elements.create('card');

        card.mount(selector);

        this._card = card;

        return card;
    }

    async submitPayment(){
        if(!this._card)
            return;

        const {token, error} = await this._stripe.createToken(this._card);

        if(error)
            throw new Error(error.message);

        return token;
    }
}
import '../sass/app.sass';
import '../../index.pug';

import FormUtil from './lib/formUtil';
import StripeUtil from './lib/stripeUtil';

(() => {
    const stripeUtil = new StripeUtil();

    document.addEventListener('DOMContentLoaded', () => init());

    function init(){
        stripeUtil.addCard('#credit-card');

        const form = document.getElementById('call-form');

        form.addEventListener('submit', submitHandler);
    }

    function appendError(error) {

    }

    function appendSuccessMessage(message) {

    }

    function getFormFields() {
        return {};
    }

    async function submitForm(){
        const token = await stripeUtil.submitPayment();

        const fields = getFormFields();

        fields.token = token;

        const message = await FormUtil.submit(fields);

        return message;
    }

    async function submitHandler(e){
        e.preventDefault();
        
        try {
            const message = await submitForm();

            appendSuccessMessage(message);
        }
        catch (error) {
            appendError(error);
        }
    }
})();
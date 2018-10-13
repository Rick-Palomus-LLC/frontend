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
        _appendNotification(document.querySelector('.error'), message);
    }

    function appendSuccessMessage(message) {
        _appendNotification(document.querySelector('.success'), message);
    }

    function _appendNotification(el, message) {
        el.textContent = message;
        el.classList.remove('hidden');
    }

    function clearNotifications() {
        const notifications = document.querySelectorAll('.notification');

        notifications.forEach(el => el.textContent = '' && el.classList.add('hidden'));
    }

    function getFormFields() {
        return {
            name: getValue('name'),
            number: getValue('number')
        }
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
        
        clearNotifications();

        try {
            const message = await submitForm();

            appendSuccessMessage(message);
        }
        catch (error) {
            appendError(error);
        }
    }

    function getValue(name){
        const el = document.querySelector(`input[name="${name}"]`);
        return el && el.value;
    }
})();
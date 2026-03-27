import twilio from './twilio'
import payment from './payment'

const webhooks = {
    twilio: Object.assign(twilio, twilio),
    payment: Object.assign(payment, payment),
}

export default webhooks
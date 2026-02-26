import SmsWebhookController from './SmsWebhookController'
import SmsController from './SmsController'

const SMS = {
    SmsWebhookController: Object.assign(SmsWebhookController, SmsWebhookController),
    SmsController: Object.assign(SmsController, SmsController),
}

export default SMS
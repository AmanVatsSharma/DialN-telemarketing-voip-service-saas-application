import MessageVariantController from './MessageVariantController'
import ContactQualityController from './ContactQualityController'

const Admin = {
    MessageVariantController: Object.assign(MessageVariantController, MessageVariantController),
    ContactQualityController: Object.assign(ContactQualityController, ContactQualityController),
}

export default Admin
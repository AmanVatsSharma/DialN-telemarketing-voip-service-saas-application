import AuthController from './AuthController'
import CampaignController from './CampaignController'
import ContactController from './ContactController'
import CallController from './CallController'
import CrmIntegrationController from './CrmIntegrationController'
import UserController from './UserController'
import AnalyticsController from './AnalyticsController'

const V1 = {
    AuthController: Object.assign(AuthController, AuthController),
    CampaignController: Object.assign(CampaignController, CampaignController),
    ContactController: Object.assign(ContactController, ContactController),
    CallController: Object.assign(CallController, CallController),
    CrmIntegrationController: Object.assign(CrmIntegrationController, CrmIntegrationController),
    UserController: Object.assign(UserController, UserController),
    AnalyticsController: Object.assign(AnalyticsController, AnalyticsController),
}

export default V1
import Api from './Api'
import SMS from './SMS'
import DashboardController from './DashboardController'
import Admin from './Admin'
import CallController from './CallController'
import CampaignController from './CampaignController'
import CampaignContactController from './CampaignContactController'
import CampaignAnalyticsController from './CampaignAnalyticsController'
import CampaignTemplateController from './CampaignTemplateController'
import ContactController from './ContactController'
import ContactListController from './ContactListController'
import ContactTagController from './ContactTagController'
import AudioFileController from './AudioFileController'
import KnowledgeBaseController from './KnowledgeBaseController'
import AiAgentController from './AiAgentController'
import AnalyticsController from './AnalyticsController'
import SequenceController from './SequenceController'
import IntegrationController from './IntegrationController'
import UserController from './UserController'
import AgentController from './AgentController'
import RoleController from './RoleController'
import CustomerNumberController from './CustomerNumberController'
import Customer from './Customer'
import CreditController from './CreditController'
import PaymentController from './PaymentController'
import TwimlController from './TwimlController'
import DtmfWebhookController from './DtmfWebhookController'
import TrunkManagementController from './TrunkManagementController'
import TrunkWebhookController from './TrunkWebhookController'
import ByocTrunkController from './ByocTrunkController'
import Settings from './Settings'
import KycController from './KycController'
import InstallController from './InstallController'

const Controllers = {
    Api: Object.assign(Api, Api),
    SMS: Object.assign(SMS, SMS),
    DashboardController: Object.assign(DashboardController, DashboardController),
    Admin: Object.assign(Admin, Admin),
    CallController: Object.assign(CallController, CallController),
    CampaignController: Object.assign(CampaignController, CampaignController),
    CampaignContactController: Object.assign(CampaignContactController, CampaignContactController),
    CampaignAnalyticsController: Object.assign(CampaignAnalyticsController, CampaignAnalyticsController),
    CampaignTemplateController: Object.assign(CampaignTemplateController, CampaignTemplateController),
    ContactController: Object.assign(ContactController, ContactController),
    ContactListController: Object.assign(ContactListController, ContactListController),
    ContactTagController: Object.assign(ContactTagController, ContactTagController),
    AudioFileController: Object.assign(AudioFileController, AudioFileController),
    KnowledgeBaseController: Object.assign(KnowledgeBaseController, KnowledgeBaseController),
    AiAgentController: Object.assign(AiAgentController, AiAgentController),
    AnalyticsController: Object.assign(AnalyticsController, AnalyticsController),
    SequenceController: Object.assign(SequenceController, SequenceController),
    IntegrationController: Object.assign(IntegrationController, IntegrationController),
    UserController: Object.assign(UserController, UserController),
    AgentController: Object.assign(AgentController, AgentController),
    RoleController: Object.assign(RoleController, RoleController),
    CustomerNumberController: Object.assign(CustomerNumberController, CustomerNumberController),
    Customer: Object.assign(Customer, Customer),
    CreditController: Object.assign(CreditController, CreditController),
    PaymentController: Object.assign(PaymentController, PaymentController),
    TwimlController: Object.assign(TwimlController, TwimlController),
    DtmfWebhookController: Object.assign(DtmfWebhookController, DtmfWebhookController),
    TrunkManagementController: Object.assign(TrunkManagementController, TrunkManagementController),
    TrunkWebhookController: Object.assign(TrunkWebhookController, TrunkWebhookController),
    ByocTrunkController: Object.assign(ByocTrunkController, ByocTrunkController),
    Settings: Object.assign(Settings, Settings),
    KycController: Object.assign(KycController, KycController),
    InstallController: Object.assign(InstallController, InstallController),
}

export default Controllers
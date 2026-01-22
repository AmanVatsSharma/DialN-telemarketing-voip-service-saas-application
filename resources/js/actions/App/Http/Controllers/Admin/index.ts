import CallLogsController from './CallLogsController'
import ErrorLogsController from './ErrorLogsController'
import SystemConfigController from './SystemConfigController'
import CronMonitorController from './CronMonitorController'
import PhoneNumberController from './PhoneNumberController'
import NumberRequestController from './NumberRequestController'
import CreditManagementController from './CreditManagementController'
import PricingRuleController from './PricingRuleController'
import ProfitDashboardController from './ProfitDashboardController'
import ProfitAnalyticsController from './ProfitAnalyticsController'
import ThemeController from './ThemeController'
import KycSettingsController from './KycSettingsController'
import KycReviewController from './KycReviewController'

const Admin = {
    CallLogsController: Object.assign(CallLogsController, CallLogsController),
    ErrorLogsController: Object.assign(ErrorLogsController, ErrorLogsController),
    SystemConfigController: Object.assign(SystemConfigController, SystemConfigController),
    CronMonitorController: Object.assign(CronMonitorController, CronMonitorController),
    PhoneNumberController: Object.assign(PhoneNumberController, PhoneNumberController),
    NumberRequestController: Object.assign(NumberRequestController, NumberRequestController),
    CreditManagementController: Object.assign(CreditManagementController, CreditManagementController),
    PricingRuleController: Object.assign(PricingRuleController, PricingRuleController),
    ProfitDashboardController: Object.assign(ProfitDashboardController, ProfitDashboardController),
    ProfitAnalyticsController: Object.assign(ProfitAnalyticsController, ProfitAnalyticsController),
    ThemeController: Object.assign(ThemeController, ThemeController),
    KycSettingsController: Object.assign(KycSettingsController, KycSettingsController),
    KycReviewController: Object.assign(KycReviewController, KycReviewController),
}

export default Admin
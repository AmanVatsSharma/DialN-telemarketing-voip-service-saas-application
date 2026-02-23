import ProfileController from './ProfileController'
import PasswordController from './PasswordController'
import TwoFactorAuthenticationController from './TwoFactorAuthenticationController'
import TwilioController from './TwilioController'
import ApiKeyController from './ApiKeyController'

const Settings = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    PasswordController: Object.assign(PasswordController, PasswordController),
    TwoFactorAuthenticationController: Object.assign(TwoFactorAuthenticationController, TwoFactorAuthenticationController),
    TwilioController: Object.assign(TwilioController, TwilioController),
    ApiKeyController: Object.assign(ApiKeyController, ApiKeyController),
}

export default Settings
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import geoPermissions from './geo-permissions'
import token0f65b5 from './token'
/**
* @see \App\Http\Controllers\Settings\TwilioController::settings
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/settings/twilio',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::settings
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::settings
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::settings
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::settings
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
const settingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: settings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::settings
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
settingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: settings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::settings
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
settingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: settings.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

settings.form = settingsForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::configure
* @see app/Http/Controllers/Settings/TwilioController.php:51
* @route '/settings/twilio/configure'
*/
export const configure = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configure.url(options),
    method: 'post',
})

configure.definition = {
    methods: ["post"],
    url: '/settings/twilio/configure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::configure
* @see app/Http/Controllers/Settings/TwilioController.php:51
* @route '/settings/twilio/configure'
*/
configure.url = (options?: RouteQueryOptions) => {
    return configure.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::configure
* @see app/Http/Controllers/Settings/TwilioController.php:51
* @route '/settings/twilio/configure'
*/
configure.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configure.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::configure
* @see app/Http/Controllers/Settings/TwilioController.php:51
* @route '/settings/twilio/configure'
*/
const configureForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: configure.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::configure
* @see app/Http/Controllers/Settings/TwilioController.php:51
* @route '/settings/twilio/configure'
*/
configureForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: configure.url(options),
    method: 'post',
})

configure.form = configureForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::sync
* @see app/Http/Controllers/Settings/TwilioController.php:641
* @route '/settings/twilio/sync'
*/
export const sync = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/settings/twilio/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::sync
* @see app/Http/Controllers/Settings/TwilioController.php:641
* @route '/settings/twilio/sync'
*/
sync.url = (options?: RouteQueryOptions) => {
    return sync.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::sync
* @see app/Http/Controllers/Settings/TwilioController.php:641
* @route '/settings/twilio/sync'
*/
sync.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::sync
* @see app/Http/Controllers/Settings/TwilioController.php:641
* @route '/settings/twilio/sync'
*/
const syncForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::sync
* @see app/Http/Controllers/Settings/TwilioController.php:641
* @route '/settings/twilio/sync'
*/
syncForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

sync.form = syncForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::remove
* @see app/Http/Controllers/Settings/TwilioController.php:613
* @route '/settings/twilio/remove'
*/
export const remove = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(options),
    method: 'delete',
})

remove.definition = {
    methods: ["delete"],
    url: '/settings/twilio/remove',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::remove
* @see app/Http/Controllers/Settings/TwilioController.php:613
* @route '/settings/twilio/remove'
*/
remove.url = (options?: RouteQueryOptions) => {
    return remove.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::remove
* @see app/Http/Controllers/Settings/TwilioController.php:613
* @route '/settings/twilio/remove'
*/
remove.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::remove
* @see app/Http/Controllers/Settings/TwilioController.php:613
* @route '/settings/twilio/remove'
*/
const removeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: remove.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::remove
* @see app/Http/Controllers/Settings/TwilioController.php:613
* @route '/settings/twilio/remove'
*/
removeForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: remove.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

remove.form = removeForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::configurePhones
* @see app/Http/Controllers/Settings/TwilioController.php:232
* @route '/settings/twilio/configure-phones'
*/
export const configurePhones = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configurePhones.url(options),
    method: 'post',
})

configurePhones.definition = {
    methods: ["post"],
    url: '/settings/twilio/configure-phones',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::configurePhones
* @see app/Http/Controllers/Settings/TwilioController.php:232
* @route '/settings/twilio/configure-phones'
*/
configurePhones.url = (options?: RouteQueryOptions) => {
    return configurePhones.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::configurePhones
* @see app/Http/Controllers/Settings/TwilioController.php:232
* @route '/settings/twilio/configure-phones'
*/
configurePhones.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configurePhones.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::configurePhones
* @see app/Http/Controllers/Settings/TwilioController.php:232
* @route '/settings/twilio/configure-phones'
*/
const configurePhonesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: configurePhones.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::configurePhones
* @see app/Http/Controllers/Settings/TwilioController.php:232
* @route '/settings/twilio/configure-phones'
*/
configurePhonesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: configurePhones.url(options),
    method: 'post',
})

configurePhones.form = configurePhonesForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::testWebhook
* @see app/Http/Controllers/Settings/TwilioController.php:357
* @route '/settings/twilio/test-webhook'
*/
export const testWebhook = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testWebhook.url(options),
    method: 'post',
})

testWebhook.definition = {
    methods: ["post"],
    url: '/settings/twilio/test-webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::testWebhook
* @see app/Http/Controllers/Settings/TwilioController.php:357
* @route '/settings/twilio/test-webhook'
*/
testWebhook.url = (options?: RouteQueryOptions) => {
    return testWebhook.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::testWebhook
* @see app/Http/Controllers/Settings/TwilioController.php:357
* @route '/settings/twilio/test-webhook'
*/
testWebhook.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testWebhook.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::testWebhook
* @see app/Http/Controllers/Settings/TwilioController.php:357
* @route '/settings/twilio/test-webhook'
*/
const testWebhookForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: testWebhook.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::testWebhook
* @see app/Http/Controllers/Settings/TwilioController.php:357
* @route '/settings/twilio/test-webhook'
*/
testWebhookForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: testWebhook.url(options),
    method: 'post',
})

testWebhook.form = testWebhookForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::health
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
export const health = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: health.url(options),
    method: 'get',
})

health.definition = {
    methods: ["get","head"],
    url: '/settings/twilio/health',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::health
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
health.url = (options?: RouteQueryOptions) => {
    return health.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::health
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
health.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: health.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::health
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
health.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: health.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::health
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
const healthForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: health.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::health
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
healthForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: health.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::health
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
healthForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: health.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

health.form = healthForm

/**
* @see routes/twilio.php:22
* @route '/api/twilio/token'
*/
export const token = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: token.url(options),
    method: 'get',
})

token.definition = {
    methods: ["get","head"],
    url: '/api/twilio/token',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/twilio.php:22
* @route '/api/twilio/token'
*/
token.url = (options?: RouteQueryOptions) => {
    return token.definition.url + queryParams(options)
}

/**
* @see routes/twilio.php:22
* @route '/api/twilio/token'
*/
token.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: token.url(options),
    method: 'get',
})

/**
* @see routes/twilio.php:22
* @route '/api/twilio/token'
*/
token.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: token.url(options),
    method: 'head',
})

/**
* @see routes/twilio.php:22
* @route '/api/twilio/token'
*/
const tokenForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: token.url(options),
    method: 'get',
})

/**
* @see routes/twilio.php:22
* @route '/api/twilio/token'
*/
tokenForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: token.url(options),
    method: 'get',
})

/**
* @see routes/twilio.php:22
* @route '/api/twilio/token'
*/
tokenForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: token.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

token.form = tokenForm

/**
* @see routes/twilio.php:74
* @route '/api/twilio/status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/api/twilio/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/twilio.php:74
* @route '/api/twilio/status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see routes/twilio.php:74
* @route '/api/twilio/status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
* @see routes/twilio.php:74
* @route '/api/twilio/status'
*/
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

/**
* @see routes/twilio.php:74
* @route '/api/twilio/status'
*/
const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see routes/twilio.php:74
* @route '/api/twilio/status'
*/
statusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see routes/twilio.php:74
* @route '/api/twilio/status'
*/
statusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

status.form = statusForm

const twilio = {
    settings: Object.assign(settings, settings),
    configure: Object.assign(configure, configure),
    sync: Object.assign(sync, sync),
    remove: Object.assign(remove, remove),
    configurePhones: Object.assign(configurePhones, configurePhones),
    testWebhook: Object.assign(testWebhook, testWebhook),
    health: Object.assign(health, health),
    geoPermissions: Object.assign(geoPermissions, geoPermissions),
    token: Object.assign(token, token0f65b5),
    status: Object.assign(status, status),
}

export default twilio
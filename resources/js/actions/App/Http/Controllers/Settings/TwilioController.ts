import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\TwilioController::show
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/settings/twilio',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::show
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::show
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::show
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::show
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::show
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::show
* @see app/Http/Controllers/Settings/TwilioController.php:20
* @route '/settings/twilio'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

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
* @see \App\Http\Controllers\Settings\TwilioController::healthCheck
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
export const healthCheck = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: healthCheck.url(options),
    method: 'get',
})

healthCheck.definition = {
    methods: ["get","head"],
    url: '/settings/twilio/health',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::healthCheck
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
healthCheck.url = (options?: RouteQueryOptions) => {
    return healthCheck.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::healthCheck
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
healthCheck.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: healthCheck.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::healthCheck
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
healthCheck.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: healthCheck.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::healthCheck
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
const healthCheckForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: healthCheck.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::healthCheck
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
healthCheckForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: healthCheck.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::healthCheck
* @see app/Http/Controllers/Settings/TwilioController.php:395
* @route '/settings/twilio/health'
*/
healthCheckForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: healthCheck.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

healthCheck.form = healthCheckForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::getGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
export const getGeoPermissions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getGeoPermissions.url(options),
    method: 'get',
})

getGeoPermissions.definition = {
    methods: ["get","head"],
    url: '/settings/twilio/geo-permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::getGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
getGeoPermissions.url = (options?: RouteQueryOptions) => {
    return getGeoPermissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::getGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
getGeoPermissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getGeoPermissions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::getGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
getGeoPermissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getGeoPermissions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::getGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
const getGeoPermissionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getGeoPermissions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::getGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
getGeoPermissionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getGeoPermissions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::getGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
getGeoPermissionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getGeoPermissions.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getGeoPermissions.form = getGeoPermissionsForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::updateGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
export const updateGeoPermissions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateGeoPermissions.url(options),
    method: 'post',
})

updateGeoPermissions.definition = {
    methods: ["post"],
    url: '/settings/twilio/geo-permissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::updateGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
updateGeoPermissions.url = (options?: RouteQueryOptions) => {
    return updateGeoPermissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::updateGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
updateGeoPermissions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateGeoPermissions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::updateGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
const updateGeoPermissionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateGeoPermissions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::updateGeoPermissions
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
updateGeoPermissionsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateGeoPermissions.url(options),
    method: 'post',
})

updateGeoPermissions.form = updateGeoPermissionsForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAllCountries
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
export const enableAllCountries = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enableAllCountries.url(options),
    method: 'post',
})

enableAllCountries.definition = {
    methods: ["post"],
    url: '/settings/twilio/geo-permissions/enable-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAllCountries
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
enableAllCountries.url = (options?: RouteQueryOptions) => {
    return enableAllCountries.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAllCountries
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
enableAllCountries.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enableAllCountries.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAllCountries
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
const enableAllCountriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enableAllCountries.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAllCountries
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
enableAllCountriesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enableAllCountries.url(options),
    method: 'post',
})

enableAllCountries.form = enableAllCountriesForm

const TwilioController = { show, configure, sync, remove, configurePhones, testWebhook, healthCheck, getGeoPermissions, updateGeoPermissions, enableAllCountries }

export default TwilioController
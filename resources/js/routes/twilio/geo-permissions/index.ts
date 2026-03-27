import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\TwilioController::get
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
export const get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(options),
    method: 'get',
})

get.definition = {
    methods: ["get","head"],
    url: '/settings/twilio/geo-permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::get
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
get.url = (options?: RouteQueryOptions) => {
    return get.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::get
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
get.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::get
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
get.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: get.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::get
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
const getForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: get.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::get
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
getForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: get.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::get
* @see app/Http/Controllers/Settings/TwilioController.php:750
* @route '/settings/twilio/geo-permissions'
*/
getForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: get.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

get.form = getForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::update
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/settings/twilio/geo-permissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::update
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::update
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::update
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::update
* @see app/Http/Controllers/Settings/TwilioController.php:800
* @route '/settings/twilio/geo-permissions'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAll
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
export const enableAll = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enableAll.url(options),
    method: 'post',
})

enableAll.definition = {
    methods: ["post"],
    url: '/settings/twilio/geo-permissions/enable-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAll
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
enableAll.url = (options?: RouteQueryOptions) => {
    return enableAll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAll
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
enableAll.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enableAll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAll
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
const enableAllForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enableAll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwilioController::enableAll
* @see app/Http/Controllers/Settings/TwilioController.php:880
* @route '/settings/twilio/geo-permissions/enable-all'
*/
enableAllForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enableAll.url(options),
    method: 'post',
})

enableAll.form = enableAllForm

const geoPermissions = {
    get: Object.assign(get, get),
    update: Object.assign(update, update),
    enableAll: Object.assign(enableAll, enableAll),
}

export default geoPermissions
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import call from './call'
/**
* @see \App\Http\Controllers\Api\WidgetController::validate
* @see app/Http/Controllers/Api/WidgetController.php:16
* @route '/api/widget/validate'
*/
export const validate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(options),
    method: 'post',
})

validate.definition = {
    methods: ["post"],
    url: '/api/widget/validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::validate
* @see app/Http/Controllers/Api/WidgetController.php:16
* @route '/api/widget/validate'
*/
validate.url = (options?: RouteQueryOptions) => {
    return validate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::validate
* @see app/Http/Controllers/Api/WidgetController.php:16
* @route '/api/widget/validate'
*/
validate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::validate
* @see app/Http/Controllers/Api/WidgetController.php:16
* @route '/api/widget/validate'
*/
const validateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::validate
* @see app/Http/Controllers/Api/WidgetController.php:16
* @route '/api/widget/validate'
*/
validateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validate.url(options),
    method: 'post',
})

validate.form = validateForm

/**
* @see \App\Http\Controllers\Api\WidgetController::token
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
export const token = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: token.url(options),
    method: 'post',
})

token.definition = {
    methods: ["post"],
    url: '/api/widget/token',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::token
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
token.url = (options?: RouteQueryOptions) => {
    return token.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::token
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
token.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: token.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::token
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
const tokenForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: token.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::token
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
tokenForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: token.url(options),
    method: 'post',
})

token.form = tokenForm

/**
* @see \App\Http\Controllers\Api\WidgetController::phoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
export const phoneNumbers = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: phoneNumbers.url(options),
    method: 'post',
})

phoneNumbers.definition = {
    methods: ["post"],
    url: '/api/widget/phone-numbers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::phoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
phoneNumbers.url = (options?: RouteQueryOptions) => {
    return phoneNumbers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::phoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
phoneNumbers.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: phoneNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::phoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
const phoneNumbersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: phoneNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::phoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
phoneNumbersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: phoneNumbers.url(options),
    method: 'post',
})

phoneNumbers.form = phoneNumbersForm

const widget = {
    validate: Object.assign(validate, validate),
    token: Object.assign(token, token),
    phoneNumbers: Object.assign(phoneNumbers, phoneNumbers),
    call: Object.assign(call, call),
}

export default widget
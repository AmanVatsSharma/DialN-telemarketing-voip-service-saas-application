import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Api\WidgetController::getToken
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
export const getToken = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getToken.url(options),
    method: 'post',
})

getToken.definition = {
    methods: ["post"],
    url: '/api/widget/token',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::getToken
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
getToken.url = (options?: RouteQueryOptions) => {
    return getToken.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::getToken
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
getToken.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getToken.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::getToken
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
const getTokenForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: getToken.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::getToken
* @see app/Http/Controllers/Api/WidgetController.php:94
* @route '/api/widget/token'
*/
getTokenForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: getToken.url(options),
    method: 'post',
})

getToken.form = getTokenForm

/**
* @see \App\Http\Controllers\Api\WidgetController::getPhoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
export const getPhoneNumbers = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getPhoneNumbers.url(options),
    method: 'post',
})

getPhoneNumbers.definition = {
    methods: ["post"],
    url: '/api/widget/phone-numbers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::getPhoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
getPhoneNumbers.url = (options?: RouteQueryOptions) => {
    return getPhoneNumbers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::getPhoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
getPhoneNumbers.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getPhoneNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::getPhoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
const getPhoneNumbersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: getPhoneNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::getPhoneNumbers
* @see app/Http/Controllers/Api/WidgetController.php:142
* @route '/api/widget/phone-numbers'
*/
getPhoneNumbersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: getPhoneNumbers.url(options),
    method: 'post',
})

getPhoneNumbers.form = getPhoneNumbersForm

/**
* @see \App\Http\Controllers\Api\WidgetController::initiateCall
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
export const initiateCall = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiateCall.url(options),
    method: 'post',
})

initiateCall.definition = {
    methods: ["post"],
    url: '/api/widget/call/initiate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::initiateCall
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
initiateCall.url = (options?: RouteQueryOptions) => {
    return initiateCall.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::initiateCall
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
initiateCall.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiateCall.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::initiateCall
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
const initiateCallForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: initiateCall.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::initiateCall
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
initiateCallForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: initiateCall.url(options),
    method: 'post',
})

initiateCall.form = initiateCallForm

/**
* @see \App\Http\Controllers\Api\WidgetController::endCall
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
export const endCall = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: endCall.url(args, options),
    method: 'post',
})

endCall.definition = {
    methods: ["post"],
    url: '/api/widget/call/{callId}/end',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::endCall
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
endCall.url = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { callId: args }
    }

    if (Array.isArray(args)) {
        args = {
            callId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        callId: args.callId,
    }

    return endCall.definition.url
            .replace('{callId}', parsedArgs.callId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::endCall
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
endCall.post = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: endCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::endCall
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
const endCallForm = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: endCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::endCall
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
endCallForm.post = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: endCall.url(args, options),
    method: 'post',
})

endCall.form = endCallForm

const WidgetController = { validate, getToken, getPhoneNumbers, initiateCall, endCall }

export default WidgetController
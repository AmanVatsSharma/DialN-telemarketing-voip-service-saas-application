import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\KycController::submit
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/settings/kyc/verify-phone',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KycController::submit
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::submit
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::submit
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::submit
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(options),
    method: 'post',
})

submit.form = submitForm

const verifyPhone = {
    submit: Object.assign(submit, submit),
}

export default verifyPhone
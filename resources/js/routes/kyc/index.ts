import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import basic7283c7 from './basic'
import verifyPhoneDc04df from './verify-phone'
import businessE58f3e from './business'
/**
* @see \App\Http\Controllers\KycController::index
* @see app/Http/Controllers/KycController.php:26
* @route '/settings/kyc'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/kyc',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::index
* @see app/Http/Controllers/KycController.php:26
* @route '/settings/kyc'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::index
* @see app/Http/Controllers/KycController.php:26
* @route '/settings/kyc'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::index
* @see app/Http/Controllers/KycController.php:26
* @route '/settings/kyc'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::index
* @see app/Http/Controllers/KycController.php:26
* @route '/settings/kyc'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::index
* @see app/Http/Controllers/KycController.php:26
* @route '/settings/kyc'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::index
* @see app/Http/Controllers/KycController.php:26
* @route '/settings/kyc'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\KycController::basic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
export const basic = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: basic.url(options),
    method: 'get',
})

basic.definition = {
    methods: ["get","head"],
    url: '/settings/kyc/basic',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::basic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
basic.url = (options?: RouteQueryOptions) => {
    return basic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::basic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
basic.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: basic.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::basic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
basic.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: basic.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::basic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
const basicForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: basic.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::basic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
basicForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: basic.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::basic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
basicForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: basic.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

basic.form = basicForm

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
export const verifyPhone = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifyPhone.url(options),
    method: 'get',
})

verifyPhone.definition = {
    methods: ["get","head"],
    url: '/settings/kyc/verify-phone',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
verifyPhone.url = (options?: RouteQueryOptions) => {
    return verifyPhone.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
verifyPhone.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifyPhone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
verifyPhone.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verifyPhone.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
const verifyPhoneForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verifyPhone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
verifyPhoneForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verifyPhone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
verifyPhoneForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verifyPhone.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

verifyPhone.form = verifyPhoneForm

/**
* @see \App\Http\Controllers\KycController::resendCode
* @see app/Http/Controllers/KycController.php:278
* @route '/settings/kyc/resend-code'
*/
export const resendCode = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendCode.url(options),
    method: 'post',
})

resendCode.definition = {
    methods: ["post"],
    url: '/settings/kyc/resend-code',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KycController::resendCode
* @see app/Http/Controllers/KycController.php:278
* @route '/settings/kyc/resend-code'
*/
resendCode.url = (options?: RouteQueryOptions) => {
    return resendCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::resendCode
* @see app/Http/Controllers/KycController.php:278
* @route '/settings/kyc/resend-code'
*/
resendCode.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendCode.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::resendCode
* @see app/Http/Controllers/KycController.php:278
* @route '/settings/kyc/resend-code'
*/
const resendCodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendCode.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::resendCode
* @see app/Http/Controllers/KycController.php:278
* @route '/settings/kyc/resend-code'
*/
resendCodeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendCode.url(options),
    method: 'post',
})

resendCode.form = resendCodeForm

/**
* @see \App\Http\Controllers\KycController::business
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
export const business = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: business.url(options),
    method: 'get',
})

business.definition = {
    methods: ["get","head"],
    url: '/settings/kyc/business',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::business
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
business.url = (options?: RouteQueryOptions) => {
    return business.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::business
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
business.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: business.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::business
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
business.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: business.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::business
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
const businessForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: business.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::business
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
businessForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: business.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::business
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
businessForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: business.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

business.form = businessForm

/**
* @see \App\Http\Controllers\KycController::document
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
export const document = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: document.url(args, options),
    method: 'get',
})

document.definition = {
    methods: ["get","head"],
    url: '/settings/kyc/document/{documentType}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::document
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
document.url = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentType: args }
    }

    if (Array.isArray(args)) {
        args = {
            documentType: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        documentType: args.documentType,
    }

    return document.definition.url
            .replace('{documentType}', parsedArgs.documentType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::document
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
document.get = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: document.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::document
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
document.head = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: document.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::document
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
const documentForm = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: document.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::document
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
documentForm.get = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: document.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::document
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
documentForm.head = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: document.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

document.form = documentForm

const kyc = {
    index: Object.assign(index, index),
    basic: Object.assign(basic, basic7283c7),
    verifyPhone: Object.assign(verifyPhone, verifyPhoneDc04df),
    resendCode: Object.assign(resendCode, resendCode),
    business: Object.assign(business, businessE58f3e),
    document: Object.assign(document, document),
}

export default kyc
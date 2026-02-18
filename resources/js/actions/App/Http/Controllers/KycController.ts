import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\KycController::showBasic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
export const showBasic = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showBasic.url(options),
    method: 'get',
})

showBasic.definition = {
    methods: ["get","head"],
    url: '/settings/kyc/basic',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::showBasic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
showBasic.url = (options?: RouteQueryOptions) => {
    return showBasic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::showBasic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
showBasic.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showBasic.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showBasic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
showBasic.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showBasic.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::showBasic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
const showBasicForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showBasic.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showBasic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
showBasicForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showBasic.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showBasic
* @see app/Http/Controllers/KycController.php:53
* @route '/settings/kyc/basic'
*/
showBasicForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showBasic.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showBasic.form = showBasicForm

/**
* @see \App\Http\Controllers\KycController::storeBasic
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
export const storeBasic = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBasic.url(options),
    method: 'post',
})

storeBasic.definition = {
    methods: ["post"],
    url: '/settings/kyc/basic',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KycController::storeBasic
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
storeBasic.url = (options?: RouteQueryOptions) => {
    return storeBasic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::storeBasic
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
storeBasic.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBasic.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::storeBasic
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
const storeBasicForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBasic.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::storeBasic
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
storeBasicForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBasic.url(options),
    method: 'post',
})

storeBasic.form = storeBasicForm

/**
* @see \App\Http\Controllers\KycController::showVerifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
export const showVerifyPhone = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showVerifyPhone.url(options),
    method: 'get',
})

showVerifyPhone.definition = {
    methods: ["get","head"],
    url: '/settings/kyc/verify-phone',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::showVerifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
showVerifyPhone.url = (options?: RouteQueryOptions) => {
    return showVerifyPhone.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::showVerifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
showVerifyPhone.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showVerifyPhone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showVerifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
showVerifyPhone.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showVerifyPhone.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::showVerifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
const showVerifyPhoneForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showVerifyPhone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showVerifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
showVerifyPhoneForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showVerifyPhone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showVerifyPhone
* @see app/Http/Controllers/KycController.php:145
* @route '/settings/kyc/verify-phone'
*/
showVerifyPhoneForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showVerifyPhone.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showVerifyPhone.form = showVerifyPhoneForm

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
export const verifyPhone = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyPhone.url(options),
    method: 'post',
})

verifyPhone.definition = {
    methods: ["post"],
    url: '/settings/kyc/verify-phone',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
verifyPhone.url = (options?: RouteQueryOptions) => {
    return verifyPhone.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
verifyPhone.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyPhone.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
const verifyPhoneForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verifyPhone.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::verifyPhone
* @see app/Http/Controllers/KycController.php:168
* @route '/settings/kyc/verify-phone'
*/
verifyPhoneForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verifyPhone.url(options),
    method: 'post',
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
* @see \App\Http\Controllers\KycController::showBusiness
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
export const showBusiness = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showBusiness.url(options),
    method: 'get',
})

showBusiness.definition = {
    methods: ["get","head"],
    url: '/settings/kyc/business',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::showBusiness
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
showBusiness.url = (options?: RouteQueryOptions) => {
    return showBusiness.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::showBusiness
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
showBusiness.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showBusiness.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showBusiness
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
showBusiness.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showBusiness.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::showBusiness
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
const showBusinessForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showBusiness.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showBusiness
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
showBusinessForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showBusiness.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::showBusiness
* @see app/Http/Controllers/KycController.php:319
* @route '/settings/kyc/business'
*/
showBusinessForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showBusiness.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showBusiness.form = showBusinessForm

/**
* @see \App\Http\Controllers\KycController::storeBusiness
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
export const storeBusiness = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBusiness.url(options),
    method: 'post',
})

storeBusiness.definition = {
    methods: ["post"],
    url: '/settings/kyc/business',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KycController::storeBusiness
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
storeBusiness.url = (options?: RouteQueryOptions) => {
    return storeBusiness.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::storeBusiness
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
storeBusiness.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBusiness.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::storeBusiness
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
const storeBusinessForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBusiness.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::storeBusiness
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
storeBusinessForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBusiness.url(options),
    method: 'post',
})

storeBusiness.form = storeBusinessForm

/**
* @see \App\Http\Controllers\KycController::downloadDocument
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
export const downloadDocument = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadDocument.url(args, options),
    method: 'get',
})

downloadDocument.definition = {
    methods: ["get","head"],
    url: '/settings/kyc/document/{documentType}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KycController::downloadDocument
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
downloadDocument.url = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloadDocument.definition.url
            .replace('{documentType}', parsedArgs.documentType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::downloadDocument
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
downloadDocument.get = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadDocument.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::downloadDocument
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
downloadDocument.head = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadDocument.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KycController::downloadDocument
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
const downloadDocumentForm = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadDocument.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::downloadDocument
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
downloadDocumentForm.get = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadDocument.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KycController::downloadDocument
* @see app/Http/Controllers/KycController.php:409
* @route '/settings/kyc/document/{documentType}'
*/
downloadDocumentForm.head = (args: { documentType: string | number } | [documentType: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadDocument.form = downloadDocumentForm

const KycController = { index, showBasic, storeBasic, showVerifyPhone, verifyPhone, resendCode, showBusiness, storeBusiness, downloadDocument }

export default KycController
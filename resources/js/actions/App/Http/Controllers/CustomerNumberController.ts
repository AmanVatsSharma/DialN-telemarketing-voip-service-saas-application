import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CustomerNumberController::available
* @see app/Http/Controllers/CustomerNumberController.php:46
* @route '/numbers/available'
*/
export const available = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: available.url(options),
    method: 'get',
})

available.definition = {
    methods: ["get","head"],
    url: '/numbers/available',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::available
* @see app/Http/Controllers/CustomerNumberController.php:46
* @route '/numbers/available'
*/
available.url = (options?: RouteQueryOptions) => {
    return available.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::available
* @see app/Http/Controllers/CustomerNumberController.php:46
* @route '/numbers/available'
*/
available.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: available.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::available
* @see app/Http/Controllers/CustomerNumberController.php:46
* @route '/numbers/available'
*/
available.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: available.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::available
* @see app/Http/Controllers/CustomerNumberController.php:46
* @route '/numbers/available'
*/
const availableForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: available.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::available
* @see app/Http/Controllers/CustomerNumberController.php:46
* @route '/numbers/available'
*/
availableForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: available.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::available
* @see app/Http/Controllers/CustomerNumberController.php:46
* @route '/numbers/available'
*/
availableForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: available.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

available.form = availableForm

/**
* @see \App\Http\Controllers\CustomerNumberController::countries
* @see app/Http/Controllers/CustomerNumberController.php:30
* @route '/numbers/countries'
*/
export const countries = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: countries.url(options),
    method: 'get',
})

countries.definition = {
    methods: ["get","head"],
    url: '/numbers/countries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::countries
* @see app/Http/Controllers/CustomerNumberController.php:30
* @route '/numbers/countries'
*/
countries.url = (options?: RouteQueryOptions) => {
    return countries.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::countries
* @see app/Http/Controllers/CustomerNumberController.php:30
* @route '/numbers/countries'
*/
countries.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: countries.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::countries
* @see app/Http/Controllers/CustomerNumberController.php:30
* @route '/numbers/countries'
*/
countries.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: countries.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::countries
* @see app/Http/Controllers/CustomerNumberController.php:30
* @route '/numbers/countries'
*/
const countriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: countries.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::countries
* @see app/Http/Controllers/CustomerNumberController.php:30
* @route '/numbers/countries'
*/
countriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: countries.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::countries
* @see app/Http/Controllers/CustomerNumberController.php:30
* @route '/numbers/countries'
*/
countriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: countries.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

countries.form = countriesForm

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:76
* @route '/numbers/my-numbers'
*/
export const myNumbers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myNumbers.url(options),
    method: 'get',
})

myNumbers.definition = {
    methods: ["get","head"],
    url: '/numbers/my-numbers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:76
* @route '/numbers/my-numbers'
*/
myNumbers.url = (options?: RouteQueryOptions) => {
    return myNumbers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:76
* @route '/numbers/my-numbers'
*/
myNumbers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:76
* @route '/numbers/my-numbers'
*/
myNumbers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myNumbers.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:76
* @route '/numbers/my-numbers'
*/
const myNumbersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:76
* @route '/numbers/my-numbers'
*/
myNumbersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:76
* @route '/numbers/my-numbers'
*/
myNumbersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myNumbers.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myNumbers.form = myNumbersForm

/**
* @see \App\Http\Controllers\CustomerNumberController::myRequests
* @see app/Http/Controllers/CustomerNumberController.php:109
* @route '/numbers/my-requests'
*/
export const myRequests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myRequests.url(options),
    method: 'get',
})

myRequests.definition = {
    methods: ["get","head"],
    url: '/numbers/my-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::myRequests
* @see app/Http/Controllers/CustomerNumberController.php:109
* @route '/numbers/my-requests'
*/
myRequests.url = (options?: RouteQueryOptions) => {
    return myRequests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::myRequests
* @see app/Http/Controllers/CustomerNumberController.php:109
* @route '/numbers/my-requests'
*/
myRequests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myRequests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myRequests
* @see app/Http/Controllers/CustomerNumberController.php:109
* @route '/numbers/my-requests'
*/
myRequests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myRequests.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myRequests
* @see app/Http/Controllers/CustomerNumberController.php:109
* @route '/numbers/my-requests'
*/
const myRequestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myRequests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myRequests
* @see app/Http/Controllers/CustomerNumberController.php:109
* @route '/numbers/my-requests'
*/
myRequestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myRequests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myRequests
* @see app/Http/Controllers/CustomerNumberController.php:109
* @route '/numbers/my-requests'
*/
myRequestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myRequests.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myRequests.form = myRequestsForm

/**
* @see \App\Http\Controllers\CustomerNumberController::request
* @see app/Http/Controllers/CustomerNumberController.php:126
* @route '/numbers/{phoneNumber}/request'
*/
export const request = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: request.url(args, options),
    method: 'post',
})

request.definition = {
    methods: ["post"],
    url: '/numbers/{phoneNumber}/request',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::request
* @see app/Http/Controllers/CustomerNumberController.php:126
* @route '/numbers/{phoneNumber}/request'
*/
request.url = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { phoneNumber: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { phoneNumber: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            phoneNumber: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        phoneNumber: typeof args.phoneNumber === 'object'
        ? args.phoneNumber.id
        : args.phoneNumber,
    }

    return request.definition.url
            .replace('{phoneNumber}', parsedArgs.phoneNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::request
* @see app/Http/Controllers/CustomerNumberController.php:126
* @route '/numbers/{phoneNumber}/request'
*/
request.post = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: request.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::request
* @see app/Http/Controllers/CustomerNumberController.php:126
* @route '/numbers/{phoneNumber}/request'
*/
const requestForm = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: request.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::request
* @see app/Http/Controllers/CustomerNumberController.php:126
* @route '/numbers/{phoneNumber}/request'
*/
requestForm.post = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: request.url(args, options),
    method: 'post',
})

request.form = requestForm

/**
* @see \App\Http\Controllers\CustomerNumberController::cancel
* @see app/Http/Controllers/CustomerNumberController.php:152
* @route '/numbers/requests/{numberRequest}/cancel'
*/
export const cancel = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/numbers/requests/{numberRequest}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::cancel
* @see app/Http/Controllers/CustomerNumberController.php:152
* @route '/numbers/requests/{numberRequest}/cancel'
*/
cancel.url = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { numberRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { numberRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            numberRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        numberRequest: typeof args.numberRequest === 'object'
        ? args.numberRequest.id
        : args.numberRequest,
    }

    return cancel.definition.url
            .replace('{numberRequest}', parsedArgs.numberRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::cancel
* @see app/Http/Controllers/CustomerNumberController.php:152
* @route '/numbers/requests/{numberRequest}/cancel'
*/
cancel.post = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::cancel
* @see app/Http/Controllers/CustomerNumberController.php:152
* @route '/numbers/requests/{numberRequest}/cancel'
*/
const cancelForm = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::cancel
* @see app/Http/Controllers/CustomerNumberController.php:152
* @route '/numbers/requests/{numberRequest}/cancel'
*/
cancelForm.post = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

cancel.form = cancelForm

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
export const myNumbersApi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myNumbersApi.url(options),
    method: 'get',
})

myNumbersApi.definition = {
    methods: ["get","head"],
    url: '/numbers/api/my-numbers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbersApi.url = (options?: RouteQueryOptions) => {
    return myNumbersApi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbersApi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myNumbersApi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbersApi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myNumbersApi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
const myNumbersApiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myNumbersApi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbersApiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myNumbersApi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbersApiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myNumbersApi.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myNumbersApi.form = myNumbersApiForm

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
export const allNumbersApi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allNumbersApi.url(options),
    method: 'get',
})

allNumbersApi.definition = {
    methods: ["get","head"],
    url: '/numbers/api/all-numbers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbersApi.url = (options?: RouteQueryOptions) => {
    return allNumbersApi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbersApi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allNumbersApi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbersApi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allNumbersApi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
const allNumbersApiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allNumbersApi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbersApiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allNumbersApi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbersApi
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbersApiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allNumbersApi.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

allNumbersApi.form = allNumbersApiForm

const CustomerNumberController = { available, countries, myNumbers, myRequests, request, cancel, myNumbersApi, allNumbersApi }

export default CustomerNumberController
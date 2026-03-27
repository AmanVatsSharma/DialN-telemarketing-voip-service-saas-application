import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
export const myNumbers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myNumbers.url(options),
    method: 'get',
})

myNumbers.definition = {
    methods: ["get","head"],
    url: '/numbers/api/my-numbers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbers.url = (options?: RouteQueryOptions) => {
    return myNumbers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myNumbers.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
const myNumbersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
*/
myNumbersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::myNumbers
* @see app/Http/Controllers/CustomerNumberController.php:171
* @route '/numbers/api/my-numbers'
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
* @see \App\Http\Controllers\CustomerNumberController::allNumbers
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
export const allNumbers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allNumbers.url(options),
    method: 'get',
})

allNumbers.definition = {
    methods: ["get","head"],
    url: '/numbers/api/all-numbers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbers
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbers.url = (options?: RouteQueryOptions) => {
    return allNumbers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbers
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbers
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allNumbers.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbers
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
const allNumbersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbers
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allNumbers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CustomerNumberController::allNumbers
* @see app/Http/Controllers/CustomerNumberController.php:214
* @route '/numbers/api/all-numbers'
*/
allNumbersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allNumbers.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

allNumbers.form = allNumbersForm

const api = {
    myNumbers: Object.assign(myNumbers, myNumbers),
    allNumbers: Object.assign(allNumbers, allNumbers),
}

export default api
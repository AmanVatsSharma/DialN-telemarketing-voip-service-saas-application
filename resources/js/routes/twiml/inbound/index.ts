import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
export const call = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: call.url(options),
    method: 'get',
})

call.definition = {
    methods: ["get","post","head"],
    url: '/twiml/inbound-call',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
call.url = (options?: RouteQueryOptions) => {
    return call.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
call.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: call.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
call.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: call.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
call.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: call.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
const callForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: call.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
callForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: call.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
callForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: call.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
callForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: call.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

call.form = callForm

const inbound = {
    call: Object.assign(call, call),
}

export default inbound
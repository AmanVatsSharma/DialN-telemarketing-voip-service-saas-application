import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
export const call = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: call.url(options),
    method: 'get',
})

call.definition = {
    methods: ["get","post","head"],
    url: '/twiml/manual-call',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
call.url = (options?: RouteQueryOptions) => {
    return call.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
call.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: call.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
call.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: call.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
call.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: call.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
const callForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: call.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
callForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: call.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
callForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: call.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::call
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
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

const manual = {
    call: Object.assign(call, call),
}

export default manual
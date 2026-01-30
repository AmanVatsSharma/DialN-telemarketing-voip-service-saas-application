import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AiMessageController::generate
* @see app/Http/Controllers/Api/AiMessageController.php:21
* @route '/api/ai/message/generate'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/api/ai/message/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiMessageController::generate
* @see app/Http/Controllers/Api/AiMessageController.php:21
* @route '/api/ai/message/generate'
*/
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiMessageController::generate
* @see app/Http/Controllers/Api/AiMessageController.php:21
* @route '/api/ai/message/generate'
*/
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiMessageController::generate
* @see app/Http/Controllers/Api/AiMessageController.php:21
* @route '/api/ai/message/generate'
*/
const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiMessageController::generate
* @see app/Http/Controllers/Api/AiMessageController.php:21
* @route '/api/ai/message/generate'
*/
generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(options),
    method: 'post',
})

generate.form = generateForm

/**
* @see \App\Http\Controllers\Api\AiMessageController::enhance
* @see app/Http/Controllers/Api/AiMessageController.php:58
* @route '/api/ai/message/enhance'
*/
export const enhance = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enhance.url(options),
    method: 'post',
})

enhance.definition = {
    methods: ["post"],
    url: '/api/ai/message/enhance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiMessageController::enhance
* @see app/Http/Controllers/Api/AiMessageController.php:58
* @route '/api/ai/message/enhance'
*/
enhance.url = (options?: RouteQueryOptions) => {
    return enhance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiMessageController::enhance
* @see app/Http/Controllers/Api/AiMessageController.php:58
* @route '/api/ai/message/enhance'
*/
enhance.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enhance.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiMessageController::enhance
* @see app/Http/Controllers/Api/AiMessageController.php:58
* @route '/api/ai/message/enhance'
*/
const enhanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enhance.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiMessageController::enhance
* @see app/Http/Controllers/Api/AiMessageController.php:58
* @route '/api/ai/message/enhance'
*/
enhanceForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enhance.url(options),
    method: 'post',
})

enhance.form = enhanceForm

/**
* @see \App\Http\Controllers\Api\AiMessageController::status
* @see app/Http/Controllers/Api/AiMessageController.php:95
* @route '/api/ai/message/status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/api/ai/message/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiMessageController::status
* @see app/Http/Controllers/Api/AiMessageController.php:95
* @route '/api/ai/message/status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiMessageController::status
* @see app/Http/Controllers/Api/AiMessageController.php:95
* @route '/api/ai/message/status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiMessageController::status
* @see app/Http/Controllers/Api/AiMessageController.php:95
* @route '/api/ai/message/status'
*/
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiMessageController::status
* @see app/Http/Controllers/Api/AiMessageController.php:95
* @route '/api/ai/message/status'
*/
const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiMessageController::status
* @see app/Http/Controllers/Api/AiMessageController.php:95
* @route '/api/ai/message/status'
*/
statusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiMessageController::status
* @see app/Http/Controllers/Api/AiMessageController.php:95
* @route '/api/ai/message/status'
*/
statusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

status.form = statusForm

const AiMessageController = { generate, enhance, status }

export default AiMessageController
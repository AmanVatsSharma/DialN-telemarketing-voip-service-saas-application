import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AiAgentCallController::status
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/call/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::status
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::status
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
status.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::status
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::status
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
statusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(options),
    method: 'post',
})

status.form = statusForm

const call = {
    status: Object.assign(status, status),
}

export default call
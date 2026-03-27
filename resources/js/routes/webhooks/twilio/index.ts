import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import call from './call'
import aiAgent from './ai-agent'
/**
* @see \App\Http\Controllers\CallController::callStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
export const callStatus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callStatus.url(options),
    method: 'post',
})

callStatus.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/call-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::callStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
callStatus.url = (options?: RouteQueryOptions) => {
    return callStatus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::callStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
callStatus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callStatus.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::callStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
const callStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: callStatus.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::callStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
callStatusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: callStatus.url(options),
    method: 'post',
})

callStatus.form = callStatusForm

const twilio = {
    call: Object.assign(call, call),
    callStatus: Object.assign(callStatus, callStatus),
    aiAgent: Object.assign(aiAgent, aiAgent),
}

export default twilio
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DtmfWebhookController::dtmf
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
export const dtmf = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dtmf.url(options),
    method: 'post',
})

dtmf.definition = {
    methods: ["post"],
    url: '/twiml/dtmf',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DtmfWebhookController::dtmf
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
dtmf.url = (options?: RouteQueryOptions) => {
    return dtmf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DtmfWebhookController::dtmf
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
dtmf.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dtmf.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DtmfWebhookController::dtmf
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
const dtmfForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: dtmf.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DtmfWebhookController::dtmf
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
dtmfForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: dtmf.url(options),
    method: 'post',
})

dtmf.form = dtmfForm

/**
* @see \App\Http\Controllers\TwimlController::recording
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
export const recording = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recording.url(options),
    method: 'post',
})

recording.definition = {
    methods: ["post"],
    url: '/twiml/recording',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TwimlController::recording
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
recording.url = (options?: RouteQueryOptions) => {
    return recording.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::recording
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
recording.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recording.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::recording
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
const recordingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recording.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::recording
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
recordingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recording.url(options),
    method: 'post',
})

recording.form = recordingForm

const webhook = {
    dtmf: Object.assign(dtmf, dtmf),
    recording: Object.assign(recording, recording),
}

export default webhook
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
export const status = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/calls/{call_id}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
status.url = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            call_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call_id: args.call_id,
    }

    return status.definition.url
            .replace('{call_id}', parsedArgs.call_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
status.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
const statusForm = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
statusForm.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

status.form = statusForm

/**
* @see \App\Http\Controllers\CallController::recording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
export const recording = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recording.url(args, options),
    method: 'post',
})

recording.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/calls/{call_id}/recording',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::recording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
recording.url = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            call_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call_id: args.call_id,
    }

    return recording.definition.url
            .replace('{call_id}', parsedArgs.call_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::recording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
recording.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recording.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::recording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
const recordingForm = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recording.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::recording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
recordingForm.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recording.url(args, options),
    method: 'post',
})

recording.form = recordingForm

/**
* @see \App\Http\Controllers\CallController::transcription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
export const transcription = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transcription.url(args, options),
    method: 'post',
})

transcription.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/calls/{call_id}/transcription',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::transcription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
transcription.url = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            call_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call_id: args.call_id,
    }

    return transcription.definition.url
            .replace('{call_id}', parsedArgs.call_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::transcription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
transcription.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transcription.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::transcription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
const transcriptionForm = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: transcription.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::transcription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
transcriptionForm.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: transcription.url(args, options),
    method: 'post',
})

transcription.form = transcriptionForm

/**
* @see \App\Http\Controllers\CallController::dtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
export const dtmf = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dtmf.url(args, options),
    method: 'post',
})

dtmf.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/calls/{call_id}/dtmf',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::dtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
dtmf.url = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            call_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call_id: args.call_id,
    }

    return dtmf.definition.url
            .replace('{call_id}', parsedArgs.call_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::dtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
dtmf.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dtmf.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::dtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
const dtmfForm = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: dtmf.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::dtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
dtmfForm.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: dtmf.url(args, options),
    method: 'post',
})

dtmf.form = dtmfForm

const call = {
    status: Object.assign(status, status),
    recording: Object.assign(recording, recording),
    transcription: Object.assign(transcription, transcription),
    dtmf: Object.assign(dtmf, dtmf),
}

export default call
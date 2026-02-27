import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
export const inboundCall = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inboundCall.url(options),
    method: 'get',
})

inboundCall.definition = {
    methods: ["get","post","head"],
    url: '/twiml/inbound-call',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
inboundCall.url = (options?: RouteQueryOptions) => {
    return inboundCall.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
inboundCall.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inboundCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
inboundCall.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inboundCall.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
inboundCall.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inboundCall.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
const inboundCallForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: inboundCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
inboundCallForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: inboundCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
inboundCallForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: inboundCall.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::inboundCall
* @see app/Http/Controllers/TwimlController.php:373
* @route '/twiml/inbound-call'
*/
inboundCallForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: inboundCall.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

inboundCall.form = inboundCallForm

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
export const manualCall = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manualCall.url(options),
    method: 'get',
})

manualCall.definition = {
    methods: ["get","post","head"],
    url: '/twiml/manual-call',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
manualCall.url = (options?: RouteQueryOptions) => {
    return manualCall.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
manualCall.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manualCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
manualCall.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: manualCall.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
manualCall.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manualCall.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
const manualCallForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: manualCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
manualCallForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: manualCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
manualCallForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: manualCall.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::manualCall
* @see app/Http/Controllers/TwimlController.php:52
* @route '/twiml/manual-call'
*/
manualCallForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: manualCall.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

manualCall.form = manualCallForm

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
export const aiAgentCall = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aiAgentCall.url(options),
    method: 'get',
})

aiAgentCall.definition = {
    methods: ["get","post","head"],
    url: '/twiml/ai-agent-call',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
aiAgentCall.url = (options?: RouteQueryOptions) => {
    return aiAgentCall.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
aiAgentCall.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aiAgentCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
aiAgentCall.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: aiAgentCall.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
aiAgentCall.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: aiAgentCall.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
const aiAgentCallForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: aiAgentCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
aiAgentCallForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: aiAgentCall.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
aiAgentCallForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: aiAgentCall.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgentCall
* @see app/Http/Controllers/TwimlController.php:464
* @route '/twiml/ai-agent-call'
*/
aiAgentCallForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: aiAgentCall.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

aiAgentCall.form = aiAgentCallForm

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
export const campaignCallTts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaignCallTts.url(options),
    method: 'get',
})

campaignCallTts.definition = {
    methods: ["get","post","head"],
    url: '/twiml/campaign/tts',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
campaignCallTts.url = (options?: RouteQueryOptions) => {
    return campaignCallTts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
campaignCallTts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaignCallTts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
campaignCallTts.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: campaignCallTts.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
campaignCallTts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: campaignCallTts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
const campaignCallTtsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallTts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
campaignCallTtsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallTts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
campaignCallTtsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: campaignCallTts.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallTts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
campaignCallTtsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallTts.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

campaignCallTts.form = campaignCallTtsForm

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
export const campaignCallVoice = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaignCallVoice.url(options),
    method: 'get',
})

campaignCallVoice.definition = {
    methods: ["get","post","head"],
    url: '/twiml/campaign/voice',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
campaignCallVoice.url = (options?: RouteQueryOptions) => {
    return campaignCallVoice.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
campaignCallVoice.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaignCallVoice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
campaignCallVoice.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: campaignCallVoice.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
campaignCallVoice.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: campaignCallVoice.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
const campaignCallVoiceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallVoice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
campaignCallVoiceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallVoice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
campaignCallVoiceForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: campaignCallVoice.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallVoice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
campaignCallVoiceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallVoice.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

campaignCallVoice.form = campaignCallVoiceForm

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
export const campaignCallAiAgent = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaignCallAiAgent.url(options),
    method: 'get',
})

campaignCallAiAgent.definition = {
    methods: ["get","post","head"],
    url: '/twiml/campaign/ai-agent',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
campaignCallAiAgent.url = (options?: RouteQueryOptions) => {
    return campaignCallAiAgent.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
campaignCallAiAgent.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaignCallAiAgent.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
campaignCallAiAgent.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: campaignCallAiAgent.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
campaignCallAiAgent.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: campaignCallAiAgent.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
const campaignCallAiAgentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallAiAgent.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
campaignCallAiAgentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallAiAgent.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
campaignCallAiAgentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: campaignCallAiAgent.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::campaignCallAiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
campaignCallAiAgentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignCallAiAgent.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

campaignCallAiAgent.form = campaignCallAiAgentForm

/**
* @see \App\Http\Controllers\TwimlController::recordingCallback
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
export const recordingCallback = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordingCallback.url(options),
    method: 'post',
})

recordingCallback.definition = {
    methods: ["post"],
    url: '/twiml/recording',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TwimlController::recordingCallback
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
recordingCallback.url = (options?: RouteQueryOptions) => {
    return recordingCallback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::recordingCallback
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
recordingCallback.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordingCallback.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::recordingCallback
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
const recordingCallbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recordingCallback.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::recordingCallback
* @see app/Http/Controllers/TwimlController.php:0
* @route '/twiml/recording'
*/
recordingCallbackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recordingCallback.url(options),
    method: 'post',
})

recordingCallback.form = recordingCallbackForm

const TwimlController = { inboundCall, manualCall, aiAgentCall, campaignCallTts, campaignCallVoice, campaignCallAiAgent, recordingCallback }

export default TwimlController
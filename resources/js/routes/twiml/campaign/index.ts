import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
export const tts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tts.url(options),
    method: 'get',
})

tts.definition = {
    methods: ["get","post","head"],
    url: '/twiml/campaign/tts',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
tts.url = (options?: RouteQueryOptions) => {
    return tts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
tts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
tts.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tts.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
tts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
const ttsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
ttsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
ttsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: tts.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::tts
* @see app/Http/Controllers/TwimlController.php:215
* @route '/twiml/campaign/tts'
*/
ttsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tts.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

tts.form = ttsForm

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
export const voice = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: voice.url(options),
    method: 'get',
})

voice.definition = {
    methods: ["get","post","head"],
    url: '/twiml/campaign/voice',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
voice.url = (options?: RouteQueryOptions) => {
    return voice.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
voice.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: voice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
voice.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voice.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
voice.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: voice.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
const voiceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: voice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
voiceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: voice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
voiceForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voice.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::voice
* @see app/Http/Controllers/TwimlController.php:317
* @route '/twiml/campaign/voice'
*/
voiceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: voice.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

voice.form = voiceForm

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
export const aiAgent = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aiAgent.url(options),
    method: 'get',
})

aiAgent.definition = {
    methods: ["get","post","head"],
    url: '/twiml/campaign/ai-agent',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
aiAgent.url = (options?: RouteQueryOptions) => {
    return aiAgent.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
aiAgent.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aiAgent.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
aiAgent.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: aiAgent.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
aiAgent.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: aiAgent.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
const aiAgentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: aiAgent.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
aiAgentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: aiAgent.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
aiAgentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: aiAgent.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TwimlController::aiAgent
* @see app/Http/Controllers/TwimlController.php:601
* @route '/twiml/campaign/ai-agent'
*/
aiAgentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: aiAgent.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

aiAgent.form = aiAgentForm

const campaign = {
    tts: Object.assign(tts, tts),
    voice: Object.assign(voice, voice),
    aiAgent: Object.assign(aiAgent, aiAgent),
}

export default campaign
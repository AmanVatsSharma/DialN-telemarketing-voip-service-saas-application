import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AiAgentController::index
* @see app/Http/Controllers/Api/AiAgentController.php:16
* @route '/api/v1/ai-agents'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::index
* @see app/Http/Controllers/Api/AiAgentController.php:16
* @route '/api/v1/ai-agents'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::index
* @see app/Http/Controllers/Api/AiAgentController.php:16
* @route '/api/v1/ai-agents'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::index
* @see app/Http/Controllers/Api/AiAgentController.php:16
* @route '/api/v1/ai-agents'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::index
* @see app/Http/Controllers/Api/AiAgentController.php:16
* @route '/api/v1/ai-agents'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::index
* @see app/Http/Controllers/Api/AiAgentController.php:16
* @route '/api/v1/ai-agents'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::index
* @see app/Http/Controllers/Api/AiAgentController.php:16
* @route '/api/v1/ai-agents'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::store
* @see app/Http/Controllers/Api/AiAgentController.php:37
* @route '/api/v1/ai-agents'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::store
* @see app/Http/Controllers/Api/AiAgentController.php:37
* @route '/api/v1/ai-agents'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::store
* @see app/Http/Controllers/Api/AiAgentController.php:37
* @route '/api/v1/ai-agents'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::store
* @see app/Http/Controllers/Api/AiAgentController.php:37
* @route '/api/v1/ai-agents'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::store
* @see app/Http/Controllers/Api/AiAgentController.php:37
* @route '/api/v1/ai-agents'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableModels
* @see app/Http/Controllers/Api/AiAgentController.php:379
* @route '/api/v1/ai-agents/models'
*/
export const availableModels = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableModels.url(options),
    method: 'get',
})

availableModels.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents/models',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableModels
* @see app/Http/Controllers/Api/AiAgentController.php:379
* @route '/api/v1/ai-agents/models'
*/
availableModels.url = (options?: RouteQueryOptions) => {
    return availableModels.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableModels
* @see app/Http/Controllers/Api/AiAgentController.php:379
* @route '/api/v1/ai-agents/models'
*/
availableModels.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableModels.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableModels
* @see app/Http/Controllers/Api/AiAgentController.php:379
* @route '/api/v1/ai-agents/models'
*/
availableModels.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availableModels.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableModels
* @see app/Http/Controllers/Api/AiAgentController.php:379
* @route '/api/v1/ai-agents/models'
*/
const availableModelsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableModels.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableModels
* @see app/Http/Controllers/Api/AiAgentController.php:379
* @route '/api/v1/ai-agents/models'
*/
availableModelsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableModels.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableModels
* @see app/Http/Controllers/Api/AiAgentController.php:379
* @route '/api/v1/ai-agents/models'
*/
availableModelsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableModels.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

availableModels.form = availableModelsForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTtsModels
* @see app/Http/Controllers/Api/AiAgentController.php:486
* @route '/api/v1/ai-agents/tts-models'
*/
export const availableTtsModels = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableTtsModels.url(options),
    method: 'get',
})

availableTtsModels.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents/tts-models',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTtsModels
* @see app/Http/Controllers/Api/AiAgentController.php:486
* @route '/api/v1/ai-agents/tts-models'
*/
availableTtsModels.url = (options?: RouteQueryOptions) => {
    return availableTtsModels.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTtsModels
* @see app/Http/Controllers/Api/AiAgentController.php:486
* @route '/api/v1/ai-agents/tts-models'
*/
availableTtsModels.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableTtsModels.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTtsModels
* @see app/Http/Controllers/Api/AiAgentController.php:486
* @route '/api/v1/ai-agents/tts-models'
*/
availableTtsModels.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availableTtsModels.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTtsModels
* @see app/Http/Controllers/Api/AiAgentController.php:486
* @route '/api/v1/ai-agents/tts-models'
*/
const availableTtsModelsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableTtsModels.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTtsModels
* @see app/Http/Controllers/Api/AiAgentController.php:486
* @route '/api/v1/ai-agents/tts-models'
*/
availableTtsModelsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableTtsModels.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTtsModels
* @see app/Http/Controllers/Api/AiAgentController.php:486
* @route '/api/v1/ai-agents/tts-models'
*/
availableTtsModelsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableTtsModels.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

availableTtsModels.form = availableTtsModelsForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateOpenAiKey
* @see app/Http/Controllers/Api/AiAgentController.php:501
* @route '/api/v1/ai-agents/validate-openai-key'
*/
export const validateOpenAiKey = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateOpenAiKey.url(options),
    method: 'post',
})

validateOpenAiKey.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agents/validate-openai-key',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateOpenAiKey
* @see app/Http/Controllers/Api/AiAgentController.php:501
* @route '/api/v1/ai-agents/validate-openai-key'
*/
validateOpenAiKey.url = (options?: RouteQueryOptions) => {
    return validateOpenAiKey.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateOpenAiKey
* @see app/Http/Controllers/Api/AiAgentController.php:501
* @route '/api/v1/ai-agents/validate-openai-key'
*/
validateOpenAiKey.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateOpenAiKey.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateOpenAiKey
* @see app/Http/Controllers/Api/AiAgentController.php:501
* @route '/api/v1/ai-agents/validate-openai-key'
*/
const validateOpenAiKeyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateOpenAiKey.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateOpenAiKey
* @see app/Http/Controllers/Api/AiAgentController.php:501
* @route '/api/v1/ai-agents/validate-openai-key'
*/
validateOpenAiKeyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateOpenAiKey.url(options),
    method: 'post',
})

validateOpenAiKey.form = validateOpenAiKeyForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTextProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:393
* @route '/api/v1/ai-agents/validate-text-provider'
*/
export const validateTextProviderKey = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateTextProviderKey.url(options),
    method: 'post',
})

validateTextProviderKey.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agents/validate-text-provider',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTextProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:393
* @route '/api/v1/ai-agents/validate-text-provider'
*/
validateTextProviderKey.url = (options?: RouteQueryOptions) => {
    return validateTextProviderKey.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTextProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:393
* @route '/api/v1/ai-agents/validate-text-provider'
*/
validateTextProviderKey.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateTextProviderKey.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTextProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:393
* @route '/api/v1/ai-agents/validate-text-provider'
*/
const validateTextProviderKeyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateTextProviderKey.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTextProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:393
* @route '/api/v1/ai-agents/validate-text-provider'
*/
validateTextProviderKeyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateTextProviderKey.url(options),
    method: 'post',
})

validateTextProviderKey.form = validateTextProviderKeyForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTtsProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:442
* @route '/api/v1/ai-agents/validate-tts-provider'
*/
export const validateTtsProviderKey = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateTtsProviderKey.url(options),
    method: 'post',
})

validateTtsProviderKey.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agents/validate-tts-provider',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTtsProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:442
* @route '/api/v1/ai-agents/validate-tts-provider'
*/
validateTtsProviderKey.url = (options?: RouteQueryOptions) => {
    return validateTtsProviderKey.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTtsProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:442
* @route '/api/v1/ai-agents/validate-tts-provider'
*/
validateTtsProviderKey.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateTtsProviderKey.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTtsProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:442
* @route '/api/v1/ai-agents/validate-tts-provider'
*/
const validateTtsProviderKeyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateTtsProviderKey.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::validateTtsProviderKey
* @see app/Http/Controllers/Api/AiAgentController.php:442
* @route '/api/v1/ai-agents/validate-tts-provider'
*/
validateTtsProviderKeyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateTtsProviderKey.url(options),
    method: 'post',
})

validateTtsProviderKey.form = validateTtsProviderKeyForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableVoices
* @see app/Http/Controllers/Api/AiAgentController.php:506
* @route '/api/v1/ai-agents/voices'
*/
export const availableVoices = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableVoices.url(options),
    method: 'get',
})

availableVoices.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents/voices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableVoices
* @see app/Http/Controllers/Api/AiAgentController.php:506
* @route '/api/v1/ai-agents/voices'
*/
availableVoices.url = (options?: RouteQueryOptions) => {
    return availableVoices.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableVoices
* @see app/Http/Controllers/Api/AiAgentController.php:506
* @route '/api/v1/ai-agents/voices'
*/
availableVoices.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableVoices.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableVoices
* @see app/Http/Controllers/Api/AiAgentController.php:506
* @route '/api/v1/ai-agents/voices'
*/
availableVoices.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availableVoices.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableVoices
* @see app/Http/Controllers/Api/AiAgentController.php:506
* @route '/api/v1/ai-agents/voices'
*/
const availableVoicesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableVoices.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableVoices
* @see app/Http/Controllers/Api/AiAgentController.php:506
* @route '/api/v1/ai-agents/voices'
*/
availableVoicesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableVoices.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableVoices
* @see app/Http/Controllers/Api/AiAgentController.php:506
* @route '/api/v1/ai-agents/voices'
*/
availableVoicesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableVoices.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

availableVoices.form = availableVoicesForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTemplates
* @see app/Http/Controllers/Api/AiAgentController.php:511
* @route '/api/v1/ai-agents/templates'
*/
export const availableTemplates = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableTemplates.url(options),
    method: 'get',
})

availableTemplates.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents/templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTemplates
* @see app/Http/Controllers/Api/AiAgentController.php:511
* @route '/api/v1/ai-agents/templates'
*/
availableTemplates.url = (options?: RouteQueryOptions) => {
    return availableTemplates.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTemplates
* @see app/Http/Controllers/Api/AiAgentController.php:511
* @route '/api/v1/ai-agents/templates'
*/
availableTemplates.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableTemplates.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTemplates
* @see app/Http/Controllers/Api/AiAgentController.php:511
* @route '/api/v1/ai-agents/templates'
*/
availableTemplates.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availableTemplates.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTemplates
* @see app/Http/Controllers/Api/AiAgentController.php:511
* @route '/api/v1/ai-agents/templates'
*/
const availableTemplatesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableTemplates.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTemplates
* @see app/Http/Controllers/Api/AiAgentController.php:511
* @route '/api/v1/ai-agents/templates'
*/
availableTemplatesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableTemplates.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::availableTemplates
* @see app/Http/Controllers/Api/AiAgentController.php:511
* @route '/api/v1/ai-agents/templates'
*/
availableTemplatesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availableTemplates.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

availableTemplates.form = availableTemplatesForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::checkApiKeys
* @see app/Http/Controllers/Api/AiAgentController.php:301
* @route '/api/v1/ai-agents/check-api-keys'
*/
export const checkApiKeys = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkApiKeys.url(options),
    method: 'get',
})

checkApiKeys.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents/check-api-keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::checkApiKeys
* @see app/Http/Controllers/Api/AiAgentController.php:301
* @route '/api/v1/ai-agents/check-api-keys'
*/
checkApiKeys.url = (options?: RouteQueryOptions) => {
    return checkApiKeys.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::checkApiKeys
* @see app/Http/Controllers/Api/AiAgentController.php:301
* @route '/api/v1/ai-agents/check-api-keys'
*/
checkApiKeys.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkApiKeys.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::checkApiKeys
* @see app/Http/Controllers/Api/AiAgentController.php:301
* @route '/api/v1/ai-agents/check-api-keys'
*/
checkApiKeys.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkApiKeys.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::checkApiKeys
* @see app/Http/Controllers/Api/AiAgentController.php:301
* @route '/api/v1/ai-agents/check-api-keys'
*/
const checkApiKeysForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkApiKeys.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::checkApiKeys
* @see app/Http/Controllers/Api/AiAgentController.php:301
* @route '/api/v1/ai-agents/check-api-keys'
*/
checkApiKeysForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkApiKeys.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::checkApiKeys
* @see app/Http/Controllers/Api/AiAgentController.php:301
* @route '/api/v1/ai-agents/check-api-keys'
*/
checkApiKeysForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkApiKeys.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

checkApiKeys.form = checkApiKeysForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::show
* @see app/Http/Controllers/Api/AiAgentController.php:84
* @route '/api/v1/ai-agents/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::show
* @see app/Http/Controllers/Api/AiAgentController.php:84
* @route '/api/v1/ai-agents/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::show
* @see app/Http/Controllers/Api/AiAgentController.php:84
* @route '/api/v1/ai-agents/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::show
* @see app/Http/Controllers/Api/AiAgentController.php:84
* @route '/api/v1/ai-agents/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::show
* @see app/Http/Controllers/Api/AiAgentController.php:84
* @route '/api/v1/ai-agents/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::show
* @see app/Http/Controllers/Api/AiAgentController.php:84
* @route '/api/v1/ai-agents/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::show
* @see app/Http/Controllers/Api/AiAgentController.php:84
* @route '/api/v1/ai-agents/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::calls
* @see app/Http/Controllers/Api/AiAgentController.php:98
* @route '/api/v1/ai-agents/{id}/calls'
*/
export const calls = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(args, options),
    method: 'get',
})

calls.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents/{id}/calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::calls
* @see app/Http/Controllers/Api/AiAgentController.php:98
* @route '/api/v1/ai-agents/{id}/calls'
*/
calls.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return calls.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::calls
* @see app/Http/Controllers/Api/AiAgentController.php:98
* @route '/api/v1/ai-agents/{id}/calls'
*/
calls.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::calls
* @see app/Http/Controllers/Api/AiAgentController.php:98
* @route '/api/v1/ai-agents/{id}/calls'
*/
calls.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calls.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::calls
* @see app/Http/Controllers/Api/AiAgentController.php:98
* @route '/api/v1/ai-agents/{id}/calls'
*/
const callsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::calls
* @see app/Http/Controllers/Api/AiAgentController.php:98
* @route '/api/v1/ai-agents/{id}/calls'
*/
callsForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::calls
* @see app/Http/Controllers/Api/AiAgentController.php:98
* @route '/api/v1/ai-agents/{id}/calls'
*/
callsForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

calls.form = callsForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
const updated02e14c2af8e04f1291217c7d432a247 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated02e14c2af8e04f1291217c7d432a247.url(args, options),
    method: 'put',
})

updated02e14c2af8e04f1291217c7d432a247.definition = {
    methods: ["put"],
    url: '/api/v1/ai-agents/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
updated02e14c2af8e04f1291217c7d432a247.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return updated02e14c2af8e04f1291217c7d432a247.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
updated02e14c2af8e04f1291217c7d432a247.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated02e14c2af8e04f1291217c7d432a247.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
const updated02e14c2af8e04f1291217c7d432a247Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated02e14c2af8e04f1291217c7d432a247.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
updated02e14c2af8e04f1291217c7d432a247Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated02e14c2af8e04f1291217c7d432a247.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updated02e14c2af8e04f1291217c7d432a247.form = updated02e14c2af8e04f1291217c7d432a247Form
/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
const updated02e14c2af8e04f1291217c7d432a247 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated02e14c2af8e04f1291217c7d432a247.url(args, options),
    method: 'patch',
})

updated02e14c2af8e04f1291217c7d432a247.definition = {
    methods: ["patch"],
    url: '/api/v1/ai-agents/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
updated02e14c2af8e04f1291217c7d432a247.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return updated02e14c2af8e04f1291217c7d432a247.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
updated02e14c2af8e04f1291217c7d432a247.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated02e14c2af8e04f1291217c7d432a247.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
const updated02e14c2af8e04f1291217c7d432a247Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated02e14c2af8e04f1291217c7d432a247.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::update
* @see app/Http/Controllers/Api/AiAgentController.php:113
* @route '/api/v1/ai-agents/{id}'
*/
updated02e14c2af8e04f1291217c7d432a247Form.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated02e14c2af8e04f1291217c7d432a247.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updated02e14c2af8e04f1291217c7d432a247.form = updated02e14c2af8e04f1291217c7d432a247Form

export const update = {
    '/api/v1/ai-agents/{id}': updated02e14c2af8e04f1291217c7d432a247,
    '/api/v1/ai-agents/{id}': updated02e14c2af8e04f1291217c7d432a247,
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::destroy
* @see app/Http/Controllers/Api/AiAgentController.php:206
* @route '/api/v1/ai-agents/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/ai-agents/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::destroy
* @see app/Http/Controllers/Api/AiAgentController.php:206
* @route '/api/v1/ai-agents/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::destroy
* @see app/Http/Controllers/Api/AiAgentController.php:206
* @route '/api/v1/ai-agents/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::destroy
* @see app/Http/Controllers/Api/AiAgentController.php:206
* @route '/api/v1/ai-agents/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::destroy
* @see app/Http/Controllers/Api/AiAgentController.php:206
* @route '/api/v1/ai-agents/{id}'
*/
destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::archive
* @see app/Http/Controllers/Api/AiAgentController.php:248
* @route '/api/v1/ai-agents/{id}/archive'
*/
export const archive = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: archive.url(args, options),
    method: 'post',
})

archive.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agents/{id}/archive',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::archive
* @see app/Http/Controllers/Api/AiAgentController.php:248
* @route '/api/v1/ai-agents/{id}/archive'
*/
archive.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return archive.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::archive
* @see app/Http/Controllers/Api/AiAgentController.php:248
* @route '/api/v1/ai-agents/{id}/archive'
*/
archive.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: archive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::archive
* @see app/Http/Controllers/Api/AiAgentController.php:248
* @route '/api/v1/ai-agents/{id}/archive'
*/
const archiveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: archive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::archive
* @see app/Http/Controllers/Api/AiAgentController.php:248
* @route '/api/v1/ai-agents/{id}/archive'
*/
archiveForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: archive.url(args, options),
    method: 'post',
})

archive.form = archiveForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::restore
* @see app/Http/Controllers/Api/AiAgentController.php:280
* @route '/api/v1/ai-agents/{id}/restore'
*/
export const restore = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

restore.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agents/{id}/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::restore
* @see app/Http/Controllers/Api/AiAgentController.php:280
* @route '/api/v1/ai-agents/{id}/restore'
*/
restore.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return restore.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::restore
* @see app/Http/Controllers/Api/AiAgentController.php:280
* @route '/api/v1/ai-agents/{id}/restore'
*/
restore.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::restore
* @see app/Http/Controllers/Api/AiAgentController.php:280
* @route '/api/v1/ai-agents/{id}/restore'
*/
const restoreForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::restore
* @see app/Http/Controllers/Api/AiAgentController.php:280
* @route '/api/v1/ai-agents/{id}/restore'
*/
restoreForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, options),
    method: 'post',
})

restore.form = restoreForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::test
* @see app/Http/Controllers/Api/AiAgentController.php:321
* @route '/api/v1/ai-agents/{id}/test'
*/
export const test = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agents/{id}/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::test
* @see app/Http/Controllers/Api/AiAgentController.php:321
* @route '/api/v1/ai-agents/{id}/test'
*/
test.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return test.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::test
* @see app/Http/Controllers/Api/AiAgentController.php:321
* @route '/api/v1/ai-agents/{id}/test'
*/
test.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::test
* @see app/Http/Controllers/Api/AiAgentController.php:321
* @route '/api/v1/ai-agents/{id}/test'
*/
const testForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: test.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::test
* @see app/Http/Controllers/Api/AiAgentController.php:321
* @route '/api/v1/ai-agents/{id}/test'
*/
testForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: test.url(args, options),
    method: 'post',
})

test.form = testForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::configureWebhooks
* @see app/Http/Controllers/Api/AiAgentController.php:519
* @route '/api/v1/ai-agents/{id}/configure-webhooks'
*/
export const configureWebhooks = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configureWebhooks.url(args, options),
    method: 'post',
})

configureWebhooks.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agents/{id}/configure-webhooks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::configureWebhooks
* @see app/Http/Controllers/Api/AiAgentController.php:519
* @route '/api/v1/ai-agents/{id}/configure-webhooks'
*/
configureWebhooks.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return configureWebhooks.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::configureWebhooks
* @see app/Http/Controllers/Api/AiAgentController.php:519
* @route '/api/v1/ai-agents/{id}/configure-webhooks'
*/
configureWebhooks.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configureWebhooks.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::configureWebhooks
* @see app/Http/Controllers/Api/AiAgentController.php:519
* @route '/api/v1/ai-agents/{id}/configure-webhooks'
*/
const configureWebhooksForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: configureWebhooks.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::configureWebhooks
* @see app/Http/Controllers/Api/AiAgentController.php:519
* @route '/api/v1/ai-agents/{id}/configure-webhooks'
*/
configureWebhooksForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: configureWebhooks.url(args, options),
    method: 'post',
})

configureWebhooks.form = configureWebhooksForm

/**
* @see \App\Http\Controllers\Api\AiAgentController::testConfiguration
* @see app/Http/Controllers/Api/AiAgentController.php:610
* @route '/api/v1/ai-agents/{id}/test-configuration'
*/
export const testConfiguration = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: testConfiguration.url(args, options),
    method: 'get',
})

testConfiguration.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agents/{id}/test-configuration',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentController::testConfiguration
* @see app/Http/Controllers/Api/AiAgentController.php:610
* @route '/api/v1/ai-agents/{id}/test-configuration'
*/
testConfiguration.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return testConfiguration.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentController::testConfiguration
* @see app/Http/Controllers/Api/AiAgentController.php:610
* @route '/api/v1/ai-agents/{id}/test-configuration'
*/
testConfiguration.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: testConfiguration.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::testConfiguration
* @see app/Http/Controllers/Api/AiAgentController.php:610
* @route '/api/v1/ai-agents/{id}/test-configuration'
*/
testConfiguration.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: testConfiguration.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::testConfiguration
* @see app/Http/Controllers/Api/AiAgentController.php:610
* @route '/api/v1/ai-agents/{id}/test-configuration'
*/
const testConfigurationForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: testConfiguration.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::testConfiguration
* @see app/Http/Controllers/Api/AiAgentController.php:610
* @route '/api/v1/ai-agents/{id}/test-configuration'
*/
testConfigurationForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: testConfiguration.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentController::testConfiguration
* @see app/Http/Controllers/Api/AiAgentController.php:610
* @route '/api/v1/ai-agents/{id}/test-configuration'
*/
testConfigurationForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: testConfiguration.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

testConfiguration.form = testConfigurationForm

const AiAgentController = { index, store, availableModels, availableTtsModels, validateOpenAiKey, validateTextProviderKey, validateTtsProviderKey, availableVoices, availableTemplates, checkApiKeys, show, calls, update, destroy, archive, restore, test, configureWebhooks, testConfiguration }

export default AiAgentController
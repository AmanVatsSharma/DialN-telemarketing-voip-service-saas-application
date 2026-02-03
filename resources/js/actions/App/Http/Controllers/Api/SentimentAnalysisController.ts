import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCall
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:25
* @route '/api/v1/calls/{call}/analyze-sentiment'
*/
export const analyzeCall = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeCall.url(args, options),
    method: 'post',
})

analyzeCall.definition = {
    methods: ["post"],
    url: '/api/v1/calls/{call}/analyze-sentiment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCall
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:25
* @route '/api/v1/calls/{call}/analyze-sentiment'
*/
analyzeCall.url = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { call: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            call: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call: typeof args.call === 'object'
        ? args.call.id
        : args.call,
    }

    return analyzeCall.definition.url
            .replace('{call}', parsedArgs.call.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCall
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:25
* @route '/api/v1/calls/{call}/analyze-sentiment'
*/
analyzeCall.post = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCall
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:25
* @route '/api/v1/calls/{call}/analyze-sentiment'
*/
const analyzeCallForm = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyzeCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCall
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:25
* @route '/api/v1/calls/{call}/analyze-sentiment'
*/
analyzeCallForm.post = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyzeCall.url(args, options),
    method: 'post',
})

analyzeCall.form = analyzeCallForm

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getAllHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:177
* @route '/api/v1/hot-leads'
*/
export const getAllHotLeads = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAllHotLeads.url(options),
    method: 'get',
})

getAllHotLeads.definition = {
    methods: ["get","head"],
    url: '/api/v1/hot-leads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getAllHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:177
* @route '/api/v1/hot-leads'
*/
getAllHotLeads.url = (options?: RouteQueryOptions) => {
    return getAllHotLeads.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getAllHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:177
* @route '/api/v1/hot-leads'
*/
getAllHotLeads.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAllHotLeads.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getAllHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:177
* @route '/api/v1/hot-leads'
*/
getAllHotLeads.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAllHotLeads.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getAllHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:177
* @route '/api/v1/hot-leads'
*/
const getAllHotLeadsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAllHotLeads.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getAllHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:177
* @route '/api/v1/hot-leads'
*/
getAllHotLeadsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAllHotLeads.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getAllHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:177
* @route '/api/v1/hot-leads'
*/
getAllHotLeadsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAllHotLeads.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getAllHotLeads.form = getAllHotLeadsForm

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCampaign
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:60
* @route '/api/v1/campaigns/{campaign}/analyze-sentiment'
*/
export const analyzeCampaign = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeCampaign.url(args, options),
    method: 'post',
})

analyzeCampaign.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/analyze-sentiment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCampaign
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:60
* @route '/api/v1/campaigns/{campaign}/analyze-sentiment'
*/
analyzeCampaign.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { campaign: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { campaign: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
    }

    return analyzeCampaign.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCampaign
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:60
* @route '/api/v1/campaigns/{campaign}/analyze-sentiment'
*/
analyzeCampaign.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeCampaign.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCampaign
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:60
* @route '/api/v1/campaigns/{campaign}/analyze-sentiment'
*/
const analyzeCampaignForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyzeCampaign.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::analyzeCampaign
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:60
* @route '/api/v1/campaigns/{campaign}/analyze-sentiment'
*/
analyzeCampaignForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyzeCampaign.url(args, options),
    method: 'post',
})

analyzeCampaign.form = analyzeCampaignForm

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:118
* @route '/api/v1/campaigns/{campaign}/hot-leads'
*/
export const getHotLeads = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHotLeads.url(args, options),
    method: 'get',
})

getHotLeads.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/hot-leads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:118
* @route '/api/v1/campaigns/{campaign}/hot-leads'
*/
getHotLeads.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { campaign: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { campaign: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
    }

    return getHotLeads.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:118
* @route '/api/v1/campaigns/{campaign}/hot-leads'
*/
getHotLeads.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHotLeads.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:118
* @route '/api/v1/campaigns/{campaign}/hot-leads'
*/
getHotLeads.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHotLeads.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:118
* @route '/api/v1/campaigns/{campaign}/hot-leads'
*/
const getHotLeadsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getHotLeads.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:118
* @route '/api/v1/campaigns/{campaign}/hot-leads'
*/
getHotLeadsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getHotLeads.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getHotLeads
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:118
* @route '/api/v1/campaigns/{campaign}/hot-leads'
*/
getHotLeadsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getHotLeads.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getHotLeads.form = getHotLeadsForm

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentStats
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:143
* @route '/api/v1/campaigns/{campaign}/sentiment-stats'
*/
export const getSentimentStats = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSentimentStats.url(args, options),
    method: 'get',
})

getSentimentStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/sentiment-stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentStats
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:143
* @route '/api/v1/campaigns/{campaign}/sentiment-stats'
*/
getSentimentStats.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { campaign: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { campaign: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
    }

    return getSentimentStats.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentStats
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:143
* @route '/api/v1/campaigns/{campaign}/sentiment-stats'
*/
getSentimentStats.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSentimentStats.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentStats
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:143
* @route '/api/v1/campaigns/{campaign}/sentiment-stats'
*/
getSentimentStats.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSentimentStats.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentStats
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:143
* @route '/api/v1/campaigns/{campaign}/sentiment-stats'
*/
const getSentimentStatsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSentimentStats.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentStats
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:143
* @route '/api/v1/campaigns/{campaign}/sentiment-stats'
*/
getSentimentStatsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSentimentStats.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentStats
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:143
* @route '/api/v1/campaigns/{campaign}/sentiment-stats'
*/
getSentimentStatsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSentimentStats.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getSentimentStats.form = getSentimentStatsForm

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getIntentAnalysis
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:159
* @route '/api/v1/campaigns/{campaign}/intent-analysis'
*/
export const getIntentAnalysis = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getIntentAnalysis.url(args, options),
    method: 'get',
})

getIntentAnalysis.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/intent-analysis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getIntentAnalysis
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:159
* @route '/api/v1/campaigns/{campaign}/intent-analysis'
*/
getIntentAnalysis.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { campaign: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { campaign: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
    }

    return getIntentAnalysis.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getIntentAnalysis
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:159
* @route '/api/v1/campaigns/{campaign}/intent-analysis'
*/
getIntentAnalysis.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getIntentAnalysis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getIntentAnalysis
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:159
* @route '/api/v1/campaigns/{campaign}/intent-analysis'
*/
getIntentAnalysis.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getIntentAnalysis.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getIntentAnalysis
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:159
* @route '/api/v1/campaigns/{campaign}/intent-analysis'
*/
const getIntentAnalysisForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getIntentAnalysis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getIntentAnalysis
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:159
* @route '/api/v1/campaigns/{campaign}/intent-analysis'
*/
getIntentAnalysisForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getIntentAnalysis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getIntentAnalysis
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:159
* @route '/api/v1/campaigns/{campaign}/intent-analysis'
*/
getIntentAnalysisForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getIntentAnalysis.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getIntentAnalysis.form = getIntentAnalysisForm

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentTrends
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:228
* @route '/api/v1/campaigns/{campaign}/sentiment-trends'
*/
export const getSentimentTrends = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSentimentTrends.url(args, options),
    method: 'get',
})

getSentimentTrends.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/sentiment-trends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentTrends
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:228
* @route '/api/v1/campaigns/{campaign}/sentiment-trends'
*/
getSentimentTrends.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { campaign: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { campaign: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
    }

    return getSentimentTrends.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentTrends
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:228
* @route '/api/v1/campaigns/{campaign}/sentiment-trends'
*/
getSentimentTrends.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSentimentTrends.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentTrends
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:228
* @route '/api/v1/campaigns/{campaign}/sentiment-trends'
*/
getSentimentTrends.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSentimentTrends.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentTrends
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:228
* @route '/api/v1/campaigns/{campaign}/sentiment-trends'
*/
const getSentimentTrendsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSentimentTrends.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentTrends
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:228
* @route '/api/v1/campaigns/{campaign}/sentiment-trends'
*/
getSentimentTrendsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSentimentTrends.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SentimentAnalysisController::getSentimentTrends
* @see app/Http/Controllers/Api/SentimentAnalysisController.php:228
* @route '/api/v1/campaigns/{campaign}/sentiment-trends'
*/
getSentimentTrendsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSentimentTrends.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getSentimentTrends.form = getSentimentTrendsForm

const SentimentAnalysisController = { analyzeCall, getAllHotLeads, analyzeCampaign, getHotLeads, getSentimentStats, getIntentAnalysis, getSentimentTrends }

export default SentimentAnalysisController
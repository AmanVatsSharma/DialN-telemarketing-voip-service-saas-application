import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CampaignAnalyticsController::summary
* @see app/Http/Controllers/CampaignAnalyticsController.php:288
* @route '/campaigns/analytics/summary'
*/
export const summary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: summary.url(options),
    method: 'get',
})

summary.definition = {
    methods: ["get","head"],
    url: '/campaigns/analytics/summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::summary
* @see app/Http/Controllers/CampaignAnalyticsController.php:288
* @route '/campaigns/analytics/summary'
*/
summary.url = (options?: RouteQueryOptions) => {
    return summary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::summary
* @see app/Http/Controllers/CampaignAnalyticsController.php:288
* @route '/campaigns/analytics/summary'
*/
summary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: summary.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::summary
* @see app/Http/Controllers/CampaignAnalyticsController.php:288
* @route '/campaigns/analytics/summary'
*/
summary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: summary.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::summary
* @see app/Http/Controllers/CampaignAnalyticsController.php:288
* @route '/campaigns/analytics/summary'
*/
const summaryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: summary.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::summary
* @see app/Http/Controllers/CampaignAnalyticsController.php:288
* @route '/campaigns/analytics/summary'
*/
summaryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: summary.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::summary
* @see app/Http/Controllers/CampaignAnalyticsController.php:288
* @route '/campaigns/analytics/summary'
*/
summaryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: summary.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

summary.form = summaryForm

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::show
* @see app/Http/Controllers/CampaignAnalyticsController.php:19
* @route '/campaigns/{campaign}/analytics'
*/
export const show = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/campaigns/{campaign}/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::show
* @see app/Http/Controllers/CampaignAnalyticsController.php:19
* @route '/campaigns/{campaign}/analytics'
*/
show.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::show
* @see app/Http/Controllers/CampaignAnalyticsController.php:19
* @route '/campaigns/{campaign}/analytics'
*/
show.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::show
* @see app/Http/Controllers/CampaignAnalyticsController.php:19
* @route '/campaigns/{campaign}/analytics'
*/
show.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::show
* @see app/Http/Controllers/CampaignAnalyticsController.php:19
* @route '/campaigns/{campaign}/analytics'
*/
const showForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::show
* @see app/Http/Controllers/CampaignAnalyticsController.php:19
* @route '/campaigns/{campaign}/analytics'
*/
showForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::show
* @see app/Http/Controllers/CampaignAnalyticsController.php:19
* @route '/campaigns/{campaign}/analytics'
*/
showForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CampaignAnalyticsController::exportMethod
* @see app/Http/Controllers/CampaignAnalyticsController.php:329
* @route '/campaigns/{campaign}/export'
*/
export const exportMethod = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/campaigns/{campaign}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::exportMethod
* @see app/Http/Controllers/CampaignAnalyticsController.php:329
* @route '/campaigns/{campaign}/export'
*/
exportMethod.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportMethod.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::exportMethod
* @see app/Http/Controllers/CampaignAnalyticsController.php:329
* @route '/campaigns/{campaign}/export'
*/
exportMethod.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::exportMethod
* @see app/Http/Controllers/CampaignAnalyticsController.php:329
* @route '/campaigns/{campaign}/export'
*/
exportMethod.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::exportMethod
* @see app/Http/Controllers/CampaignAnalyticsController.php:329
* @route '/campaigns/{campaign}/export'
*/
const exportMethodForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::exportMethod
* @see app/Http/Controllers/CampaignAnalyticsController.php:329
* @route '/campaigns/{campaign}/export'
*/
exportMethodForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignAnalyticsController::exportMethod
* @see app/Http/Controllers/CampaignAnalyticsController.php:329
* @route '/campaigns/{campaign}/export'
*/
exportMethodForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

const analytics = {
    summary: Object.assign(summary, summary),
    show: Object.assign(show, show),
    export: Object.assign(exportMethod, exportMethod),
}

export default analytics
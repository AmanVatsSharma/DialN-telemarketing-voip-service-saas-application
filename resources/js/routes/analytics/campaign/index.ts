import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import exportMethod from './export'
/**
* @see \App\Http\Controllers\AnalyticsController::data
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
export const data = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(args, options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/analytics/campaigns/{campaign}/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::data
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
data.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return data.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::data
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
data.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::data
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
data.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::data
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
const dataForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: data.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::data
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
dataForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: data.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::data
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
dataForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: data.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

data.form = dataForm

const campaign = {
    data: Object.assign(data, data),
    export: Object.assign(exportMethod, exportMethod),
}

export default campaign
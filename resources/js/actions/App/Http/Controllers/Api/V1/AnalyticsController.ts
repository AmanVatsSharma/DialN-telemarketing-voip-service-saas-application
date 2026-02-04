import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::overview
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:30
* @route '/api/v1/analytics/overview'
*/
export const overview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

overview.definition = {
    methods: ["get","head"],
    url: '/api/v1/analytics/overview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::overview
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:30
* @route '/api/v1/analytics/overview'
*/
overview.url = (options?: RouteQueryOptions) => {
    return overview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::overview
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:30
* @route '/api/v1/analytics/overview'
*/
overview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::overview
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:30
* @route '/api/v1/analytics/overview'
*/
overview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overview.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::overview
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:30
* @route '/api/v1/analytics/overview'
*/
const overviewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::overview
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:30
* @route '/api/v1/analytics/overview'
*/
overviewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::overview
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:30
* @route '/api/v1/analytics/overview'
*/
overviewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

overview.form = overviewForm

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::campaigns
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:82
* @route '/api/v1/analytics/campaigns'
*/
export const campaigns = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaigns.url(options),
    method: 'get',
})

campaigns.definition = {
    methods: ["get","head"],
    url: '/api/v1/analytics/campaigns',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::campaigns
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:82
* @route '/api/v1/analytics/campaigns'
*/
campaigns.url = (options?: RouteQueryOptions) => {
    return campaigns.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::campaigns
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:82
* @route '/api/v1/analytics/campaigns'
*/
campaigns.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaigns.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::campaigns
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:82
* @route '/api/v1/analytics/campaigns'
*/
campaigns.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: campaigns.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::campaigns
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:82
* @route '/api/v1/analytics/campaigns'
*/
const campaignsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaigns.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::campaigns
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:82
* @route '/api/v1/analytics/campaigns'
*/
campaignsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaigns.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::campaigns
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:82
* @route '/api/v1/analytics/campaigns'
*/
campaignsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaigns.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

campaigns.form = campaignsForm

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::calls
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:116
* @route '/api/v1/analytics/calls'
*/
export const calls = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(options),
    method: 'get',
})

calls.definition = {
    methods: ["get","head"],
    url: '/api/v1/analytics/calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::calls
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:116
* @route '/api/v1/analytics/calls'
*/
calls.url = (options?: RouteQueryOptions) => {
    return calls.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::calls
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:116
* @route '/api/v1/analytics/calls'
*/
calls.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::calls
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:116
* @route '/api/v1/analytics/calls'
*/
calls.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calls.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::calls
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:116
* @route '/api/v1/analytics/calls'
*/
const callsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::calls
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:116
* @route '/api/v1/analytics/calls'
*/
callsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AnalyticsController::calls
* @see app/Http/Controllers/Api/V1/AnalyticsController.php:116
* @route '/api/v1/analytics/calls'
*/
callsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

calls.form = callsForm

const AnalyticsController = { overview, campaigns, calls }

export default AnalyticsController
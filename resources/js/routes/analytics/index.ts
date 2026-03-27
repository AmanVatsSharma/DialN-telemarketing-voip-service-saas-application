import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import campaignEf897c from './campaign'
/**
* @see \App\Http\Controllers\AnalyticsController::dashboard
* @see app/Http/Controllers/AnalyticsController.php:50
* @route '/analytics/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/analytics/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::dashboard
* @see app/Http/Controllers/AnalyticsController.php:50
* @route '/analytics/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::dashboard
* @see app/Http/Controllers/AnalyticsController.php:50
* @route '/analytics/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::dashboard
* @see app/Http/Controllers/AnalyticsController.php:50
* @route '/analytics/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::dashboard
* @see app/Http/Controllers/AnalyticsController.php:50
* @route '/analytics/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::dashboard
* @see app/Http/Controllers/AnalyticsController.php:50
* @route '/analytics/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::dashboard
* @see app/Http/Controllers/AnalyticsController.php:50
* @route '/analytics/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see routes/web.php:171
* @route '/analytics/hot-leads'
*/
export const hotLeads = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hotLeads.url(options),
    method: 'get',
})

hotLeads.definition = {
    methods: ["get","head"],
    url: '/analytics/hot-leads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:171
* @route '/analytics/hot-leads'
*/
hotLeads.url = (options?: RouteQueryOptions) => {
    return hotLeads.definition.url + queryParams(options)
}

/**
* @see routes/web.php:171
* @route '/analytics/hot-leads'
*/
hotLeads.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hotLeads.url(options),
    method: 'get',
})

/**
* @see routes/web.php:171
* @route '/analytics/hot-leads'
*/
hotLeads.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: hotLeads.url(options),
    method: 'head',
})

/**
* @see routes/web.php:171
* @route '/analytics/hot-leads'
*/
const hotLeadsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: hotLeads.url(options),
    method: 'get',
})

/**
* @see routes/web.php:171
* @route '/analytics/hot-leads'
*/
hotLeadsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: hotLeads.url(options),
    method: 'get',
})

/**
* @see routes/web.php:171
* @route '/analytics/hot-leads'
*/
hotLeadsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: hotLeads.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

hotLeads.form = hotLeadsForm

/**
* @see routes/web.php:174
* @route '/analytics/smart-scheduling'
*/
export const smartScheduling = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: smartScheduling.url(options),
    method: 'get',
})

smartScheduling.definition = {
    methods: ["get","head"],
    url: '/analytics/smart-scheduling',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:174
* @route '/analytics/smart-scheduling'
*/
smartScheduling.url = (options?: RouteQueryOptions) => {
    return smartScheduling.definition.url + queryParams(options)
}

/**
* @see routes/web.php:174
* @route '/analytics/smart-scheduling'
*/
smartScheduling.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: smartScheduling.url(options),
    method: 'get',
})

/**
* @see routes/web.php:174
* @route '/analytics/smart-scheduling'
*/
smartScheduling.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: smartScheduling.url(options),
    method: 'head',
})

/**
* @see routes/web.php:174
* @route '/analytics/smart-scheduling'
*/
const smartSchedulingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: smartScheduling.url(options),
    method: 'get',
})

/**
* @see routes/web.php:174
* @route '/analytics/smart-scheduling'
*/
smartSchedulingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: smartScheduling.url(options),
    method: 'get',
})

/**
* @see routes/web.php:174
* @route '/analytics/smart-scheduling'
*/
smartSchedulingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: smartScheduling.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

smartScheduling.form = smartSchedulingForm

/**
* @see \App\Http\Controllers\AnalyticsController::campaign
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
export const campaign = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaign.url(args, options),
    method: 'get',
})

campaign.definition = {
    methods: ["get","head"],
    url: '/analytics/campaigns/{campaign}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::campaign
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaign.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return campaign.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::campaign
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaign.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaign.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::campaign
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaign.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: campaign.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::campaign
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
const campaignForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaign.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::campaign
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaignForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaign.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::campaign
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaignForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaign.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

campaign.form = campaignForm

const analytics = {
    dashboard: Object.assign(dashboard, dashboard),
    hotLeads: Object.assign(hotLeads, hotLeads),
    smartScheduling: Object.assign(smartScheduling, smartScheduling),
    campaign: Object.assign(campaign, campaignEf897c),
}

export default analytics
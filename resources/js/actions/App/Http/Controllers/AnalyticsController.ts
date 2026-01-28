import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\AnalyticsController::campaignAnalytics
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
export const campaignAnalytics = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaignAnalytics.url(args, options),
    method: 'get',
})

campaignAnalytics.definition = {
    methods: ["get","head"],
    url: '/analytics/campaigns/{campaign}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::campaignAnalytics
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaignAnalytics.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return campaignAnalytics.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::campaignAnalytics
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaignAnalytics.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: campaignAnalytics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::campaignAnalytics
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaignAnalytics.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: campaignAnalytics.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::campaignAnalytics
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
const campaignAnalyticsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignAnalytics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::campaignAnalytics
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaignAnalyticsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignAnalytics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::campaignAnalytics
* @see app/Http/Controllers/AnalyticsController.php:21
* @route '/analytics/campaigns/{campaign}'
*/
campaignAnalyticsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: campaignAnalytics.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

campaignAnalytics.form = campaignAnalyticsForm

/**
* @see \App\Http\Controllers\AnalyticsController::getCampaignAnalyticsData
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
export const getCampaignAnalyticsData = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCampaignAnalyticsData.url(args, options),
    method: 'get',
})

getCampaignAnalyticsData.definition = {
    methods: ["get","head"],
    url: '/analytics/campaigns/{campaign}/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::getCampaignAnalyticsData
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
getCampaignAnalyticsData.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getCampaignAnalyticsData.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::getCampaignAnalyticsData
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
getCampaignAnalyticsData.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCampaignAnalyticsData.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::getCampaignAnalyticsData
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
getCampaignAnalyticsData.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCampaignAnalyticsData.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::getCampaignAnalyticsData
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
const getCampaignAnalyticsDataForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCampaignAnalyticsData.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::getCampaignAnalyticsData
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
getCampaignAnalyticsDataForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCampaignAnalyticsData.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::getCampaignAnalyticsData
* @see app/Http/Controllers/AnalyticsController.php:38
* @route '/analytics/campaigns/{campaign}/data'
*/
getCampaignAnalyticsDataForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCampaignAnalyticsData.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getCampaignAnalyticsData.form = getCampaignAnalyticsDataForm

/**
* @see \App\Http\Controllers\AnalyticsController::exportCalls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
export const exportCalls = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCalls.url(args, options),
    method: 'get',
})

exportCalls.definition = {
    methods: ["get","head"],
    url: '/analytics/campaigns/{campaign}/export/calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::exportCalls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
exportCalls.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportCalls.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::exportCalls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
exportCalls.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCalls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::exportCalls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
exportCalls.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCalls.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::exportCalls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
const exportCallsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCalls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::exportCalls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
exportCallsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCalls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::exportCalls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
exportCallsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCalls.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportCalls.form = exportCallsForm

/**
* @see \App\Http\Controllers\AnalyticsController::exportContacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
export const exportContacts = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportContacts.url(args, options),
    method: 'get',
})

exportContacts.definition = {
    methods: ["get","head"],
    url: '/analytics/campaigns/{campaign}/export/contacts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::exportContacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
exportContacts.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportContacts.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::exportContacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
exportContacts.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportContacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::exportContacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
exportContacts.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportContacts.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::exportContacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
const exportContactsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportContacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::exportContacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
exportContactsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportContacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::exportContacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
exportContactsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportContacts.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportContacts.form = exportContactsForm

const AnalyticsController = { dashboard, campaignAnalytics, getCampaignAnalyticsData, exportCalls, exportContacts }

export default AnalyticsController
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AnalyticsController::calls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
export const calls = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(args, options),
    method: 'get',
})

calls.definition = {
    methods: ["get","head"],
    url: '/analytics/campaigns/{campaign}/export/calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::calls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
calls.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return calls.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::calls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
calls.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::calls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
calls.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calls.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::calls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
const callsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::calls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
callsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::calls
* @see app/Http/Controllers/AnalyticsController.php:69
* @route '/analytics/campaigns/{campaign}/export/calls'
*/
callsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AnalyticsController::contacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
export const contacts = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contacts.url(args, options),
    method: 'get',
})

contacts.definition = {
    methods: ["get","head"],
    url: '/analytics/campaigns/{campaign}/export/contacts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::contacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
contacts.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return contacts.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::contacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
contacts.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::contacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
contacts.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contacts.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnalyticsController::contacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
const contactsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::contacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
contactsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnalyticsController::contacts
* @see app/Http/Controllers/AnalyticsController.php:92
* @route '/analytics/campaigns/{campaign}/export/contacts'
*/
contactsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contacts.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

contacts.form = contactsForm

const exportMethod = {
    calls: Object.assign(calls, calls),
    contacts: Object.assign(contacts, contacts),
}

export default exportMethod
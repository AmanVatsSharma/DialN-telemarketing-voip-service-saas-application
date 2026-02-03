import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getCampaignOptimalTimes
* @see app/Http/Controllers/Api/SmartSchedulingController.php:68
* @route '/api/v1/campaigns/{campaign}/optimal-times'
*/
export const getCampaignOptimalTimes = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCampaignOptimalTimes.url(args, options),
    method: 'get',
})

getCampaignOptimalTimes.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/optimal-times',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getCampaignOptimalTimes
* @see app/Http/Controllers/Api/SmartSchedulingController.php:68
* @route '/api/v1/campaigns/{campaign}/optimal-times'
*/
getCampaignOptimalTimes.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getCampaignOptimalTimes.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getCampaignOptimalTimes
* @see app/Http/Controllers/Api/SmartSchedulingController.php:68
* @route '/api/v1/campaigns/{campaign}/optimal-times'
*/
getCampaignOptimalTimes.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCampaignOptimalTimes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getCampaignOptimalTimes
* @see app/Http/Controllers/Api/SmartSchedulingController.php:68
* @route '/api/v1/campaigns/{campaign}/optimal-times'
*/
getCampaignOptimalTimes.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCampaignOptimalTimes.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getCampaignOptimalTimes
* @see app/Http/Controllers/Api/SmartSchedulingController.php:68
* @route '/api/v1/campaigns/{campaign}/optimal-times'
*/
const getCampaignOptimalTimesForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCampaignOptimalTimes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getCampaignOptimalTimes
* @see app/Http/Controllers/Api/SmartSchedulingController.php:68
* @route '/api/v1/campaigns/{campaign}/optimal-times'
*/
getCampaignOptimalTimesForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCampaignOptimalTimes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getCampaignOptimalTimes
* @see app/Http/Controllers/Api/SmartSchedulingController.php:68
* @route '/api/v1/campaigns/{campaign}/optimal-times'
*/
getCampaignOptimalTimesForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCampaignOptimalTimes.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getCampaignOptimalTimes.form = getCampaignOptimalTimesForm

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::optimizeCampaignSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:97
* @route '/api/v1/campaigns/{campaign}/optimize-schedule'
*/
export const optimizeCampaignSchedule = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: optimizeCampaignSchedule.url(args, options),
    method: 'post',
})

optimizeCampaignSchedule.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/optimize-schedule',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::optimizeCampaignSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:97
* @route '/api/v1/campaigns/{campaign}/optimize-schedule'
*/
optimizeCampaignSchedule.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return optimizeCampaignSchedule.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::optimizeCampaignSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:97
* @route '/api/v1/campaigns/{campaign}/optimize-schedule'
*/
optimizeCampaignSchedule.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: optimizeCampaignSchedule.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::optimizeCampaignSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:97
* @route '/api/v1/campaigns/{campaign}/optimize-schedule'
*/
const optimizeCampaignScheduleForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: optimizeCampaignSchedule.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::optimizeCampaignSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:97
* @route '/api/v1/campaigns/{campaign}/optimize-schedule'
*/
optimizeCampaignScheduleForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: optimizeCampaignSchedule.url(args, options),
    method: 'post',
})

optimizeCampaignSchedule.form = optimizeCampaignScheduleForm

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getTimezoneSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:164
* @route '/api/v1/campaigns/{campaign}/timezone-schedule'
*/
export const getTimezoneSchedule = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTimezoneSchedule.url(args, options),
    method: 'get',
})

getTimezoneSchedule.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/timezone-schedule',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getTimezoneSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:164
* @route '/api/v1/campaigns/{campaign}/timezone-schedule'
*/
getTimezoneSchedule.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getTimezoneSchedule.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getTimezoneSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:164
* @route '/api/v1/campaigns/{campaign}/timezone-schedule'
*/
getTimezoneSchedule.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTimezoneSchedule.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getTimezoneSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:164
* @route '/api/v1/campaigns/{campaign}/timezone-schedule'
*/
getTimezoneSchedule.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTimezoneSchedule.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getTimezoneSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:164
* @route '/api/v1/campaigns/{campaign}/timezone-schedule'
*/
const getTimezoneScheduleForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getTimezoneSchedule.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getTimezoneSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:164
* @route '/api/v1/campaigns/{campaign}/timezone-schedule'
*/
getTimezoneScheduleForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getTimezoneSchedule.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getTimezoneSchedule
* @see app/Http/Controllers/Api/SmartSchedulingController.php:164
* @route '/api/v1/campaigns/{campaign}/timezone-schedule'
*/
getTimezoneScheduleForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getTimezoneSchedule.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getTimezoneSchedule.form = getTimezoneScheduleForm

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::enableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:288
* @route '/api/v1/campaigns/{campaign}/enable-smart-scheduling'
*/
export const enableSmartScheduling = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enableSmartScheduling.url(args, options),
    method: 'post',
})

enableSmartScheduling.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/enable-smart-scheduling',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::enableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:288
* @route '/api/v1/campaigns/{campaign}/enable-smart-scheduling'
*/
enableSmartScheduling.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return enableSmartScheduling.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::enableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:288
* @route '/api/v1/campaigns/{campaign}/enable-smart-scheduling'
*/
enableSmartScheduling.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enableSmartScheduling.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::enableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:288
* @route '/api/v1/campaigns/{campaign}/enable-smart-scheduling'
*/
const enableSmartSchedulingForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enableSmartScheduling.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::enableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:288
* @route '/api/v1/campaigns/{campaign}/enable-smart-scheduling'
*/
enableSmartSchedulingForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enableSmartScheduling.url(args, options),
    method: 'post',
})

enableSmartScheduling.form = enableSmartSchedulingForm

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::disableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:317
* @route '/api/v1/campaigns/{campaign}/disable-smart-scheduling'
*/
export const disableSmartScheduling = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disableSmartScheduling.url(args, options),
    method: 'post',
})

disableSmartScheduling.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/disable-smart-scheduling',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::disableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:317
* @route '/api/v1/campaigns/{campaign}/disable-smart-scheduling'
*/
disableSmartScheduling.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return disableSmartScheduling.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::disableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:317
* @route '/api/v1/campaigns/{campaign}/disable-smart-scheduling'
*/
disableSmartScheduling.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disableSmartScheduling.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::disableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:317
* @route '/api/v1/campaigns/{campaign}/disable-smart-scheduling'
*/
const disableSmartSchedulingForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disableSmartScheduling.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::disableSmartScheduling
* @see app/Http/Controllers/Api/SmartSchedulingController.php:317
* @route '/api/v1/campaigns/{campaign}/disable-smart-scheduling'
*/
disableSmartSchedulingForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disableSmartScheduling.url(args, options),
    method: 'post',
})

disableSmartScheduling.form = disableSmartSchedulingForm

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getContactOptimalTime
* @see app/Http/Controllers/Api/SmartSchedulingController.php:32
* @route '/api/v1/contacts/{contact}/optimal-time'
*/
export const getContactOptimalTime = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getContactOptimalTime.url(args, options),
    method: 'get',
})

getContactOptimalTime.definition = {
    methods: ["get","head"],
    url: '/api/v1/contacts/{contact}/optimal-time',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getContactOptimalTime
* @see app/Http/Controllers/Api/SmartSchedulingController.php:32
* @route '/api/v1/contacts/{contact}/optimal-time'
*/
getContactOptimalTime.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return getContactOptimalTime.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getContactOptimalTime
* @see app/Http/Controllers/Api/SmartSchedulingController.php:32
* @route '/api/v1/contacts/{contact}/optimal-time'
*/
getContactOptimalTime.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getContactOptimalTime.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getContactOptimalTime
* @see app/Http/Controllers/Api/SmartSchedulingController.php:32
* @route '/api/v1/contacts/{contact}/optimal-time'
*/
getContactOptimalTime.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getContactOptimalTime.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getContactOptimalTime
* @see app/Http/Controllers/Api/SmartSchedulingController.php:32
* @route '/api/v1/contacts/{contact}/optimal-time'
*/
const getContactOptimalTimeForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getContactOptimalTime.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getContactOptimalTime
* @see app/Http/Controllers/Api/SmartSchedulingController.php:32
* @route '/api/v1/contacts/{contact}/optimal-time'
*/
getContactOptimalTimeForm.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getContactOptimalTime.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getContactOptimalTime
* @see app/Http/Controllers/Api/SmartSchedulingController.php:32
* @route '/api/v1/contacts/{contact}/optimal-time'
*/
getContactOptimalTimeForm.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getContactOptimalTime.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getContactOptimalTime.form = getContactOptimalTimeForm

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::batchOptimizeContacts
* @see app/Http/Controllers/Api/SmartSchedulingController.php:193
* @route '/api/v1/contacts/batch-optimize'
*/
export const batchOptimizeContacts = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchOptimizeContacts.url(options),
    method: 'post',
})

batchOptimizeContacts.definition = {
    methods: ["post"],
    url: '/api/v1/contacts/batch-optimize',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::batchOptimizeContacts
* @see app/Http/Controllers/Api/SmartSchedulingController.php:193
* @route '/api/v1/contacts/batch-optimize'
*/
batchOptimizeContacts.url = (options?: RouteQueryOptions) => {
    return batchOptimizeContacts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::batchOptimizeContacts
* @see app/Http/Controllers/Api/SmartSchedulingController.php:193
* @route '/api/v1/contacts/batch-optimize'
*/
batchOptimizeContacts.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchOptimizeContacts.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::batchOptimizeContacts
* @see app/Http/Controllers/Api/SmartSchedulingController.php:193
* @route '/api/v1/contacts/batch-optimize'
*/
const batchOptimizeContactsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: batchOptimizeContacts.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::batchOptimizeContacts
* @see app/Http/Controllers/Api/SmartSchedulingController.php:193
* @route '/api/v1/contacts/batch-optimize'
*/
batchOptimizeContactsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: batchOptimizeContacts.url(options),
    method: 'post',
})

batchOptimizeContacts.form = batchOptimizeContactsForm

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getAnswerRatePatterns
* @see app/Http/Controllers/Api/SmartSchedulingController.php:240
* @route '/api/v1/analytics/answer-rate-patterns'
*/
export const getAnswerRatePatterns = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAnswerRatePatterns.url(options),
    method: 'get',
})

getAnswerRatePatterns.definition = {
    methods: ["get","head"],
    url: '/api/v1/analytics/answer-rate-patterns',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getAnswerRatePatterns
* @see app/Http/Controllers/Api/SmartSchedulingController.php:240
* @route '/api/v1/analytics/answer-rate-patterns'
*/
getAnswerRatePatterns.url = (options?: RouteQueryOptions) => {
    return getAnswerRatePatterns.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getAnswerRatePatterns
* @see app/Http/Controllers/Api/SmartSchedulingController.php:240
* @route '/api/v1/analytics/answer-rate-patterns'
*/
getAnswerRatePatterns.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAnswerRatePatterns.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getAnswerRatePatterns
* @see app/Http/Controllers/Api/SmartSchedulingController.php:240
* @route '/api/v1/analytics/answer-rate-patterns'
*/
getAnswerRatePatterns.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAnswerRatePatterns.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getAnswerRatePatterns
* @see app/Http/Controllers/Api/SmartSchedulingController.php:240
* @route '/api/v1/analytics/answer-rate-patterns'
*/
const getAnswerRatePatternsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAnswerRatePatterns.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getAnswerRatePatterns
* @see app/Http/Controllers/Api/SmartSchedulingController.php:240
* @route '/api/v1/analytics/answer-rate-patterns'
*/
getAnswerRatePatternsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAnswerRatePatterns.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SmartSchedulingController::getAnswerRatePatterns
* @see app/Http/Controllers/Api/SmartSchedulingController.php:240
* @route '/api/v1/analytics/answer-rate-patterns'
*/
getAnswerRatePatternsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAnswerRatePatterns.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getAnswerRatePatterns.form = getAnswerRatePatternsForm

const SmartSchedulingController = { getCampaignOptimalTimes, optimizeCampaignSchedule, getTimezoneSchedule, enableSmartScheduling, disableSmartScheduling, getContactOptimalTime, batchOptimizeContacts, getAnswerRatePatterns }

export default SmartSchedulingController
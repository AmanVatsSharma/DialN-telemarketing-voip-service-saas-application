import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CampaignContactController::store
* @see app/Http/Controllers/CampaignContactController.php:20
* @route '/campaigns/{campaign}/contacts'
*/
export const store = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/campaigns/{campaign}/contacts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignContactController::store
* @see app/Http/Controllers/CampaignContactController.php:20
* @route '/campaigns/{campaign}/contacts'
*/
store.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignContactController::store
* @see app/Http/Controllers/CampaignContactController.php:20
* @route '/campaigns/{campaign}/contacts'
*/
store.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignContactController::store
* @see app/Http/Controllers/CampaignContactController.php:20
* @route '/campaigns/{campaign}/contacts'
*/
const storeForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignContactController::store
* @see app/Http/Controllers/CampaignContactController.php:20
* @route '/campaigns/{campaign}/contacts'
*/
storeForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CampaignContactController::update
* @see app/Http/Controllers/CampaignContactController.php:70
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
export const update = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/campaigns/{campaign}/contacts/{contact}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CampaignContactController::update
* @see app/Http/Controllers/CampaignContactController.php:70
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
update.url = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
            contact: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return update.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignContactController::update
* @see app/Http/Controllers/CampaignContactController.php:70
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
update.put = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CampaignContactController::update
* @see app/Http/Controllers/CampaignContactController.php:70
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
const updateForm = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignContactController::update
* @see app/Http/Controllers/CampaignContactController.php:70
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
updateForm.put = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\CampaignContactController::destroy
* @see app/Http/Controllers/CampaignContactController.php:120
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
export const destroy = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/campaigns/{campaign}/contacts/{contact}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CampaignContactController::destroy
* @see app/Http/Controllers/CampaignContactController.php:120
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
destroy.url = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
            contact: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return destroy.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignContactController::destroy
* @see app/Http/Controllers/CampaignContactController.php:120
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
destroy.delete = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CampaignContactController::destroy
* @see app/Http/Controllers/CampaignContactController.php:120
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
const destroyForm = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignContactController::destroy
* @see app/Http/Controllers/CampaignContactController.php:120
* @route '/campaigns/{campaign}/contacts/{contact}'
*/
destroyForm.delete = (args: { campaign: number | { id: number }, contact: number | { id: number } } | [campaign: number | { id: number }, contact: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CampaignContactController::getVariableKeys
* @see app/Http/Controllers/CampaignContactController.php:142
* @route '/campaigns/{campaign}/variables'
*/
export const getVariableKeys = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVariableKeys.url(args, options),
    method: 'get',
})

getVariableKeys.definition = {
    methods: ["get","head"],
    url: '/campaigns/{campaign}/variables',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignContactController::getVariableKeys
* @see app/Http/Controllers/CampaignContactController.php:142
* @route '/campaigns/{campaign}/variables'
*/
getVariableKeys.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getVariableKeys.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignContactController::getVariableKeys
* @see app/Http/Controllers/CampaignContactController.php:142
* @route '/campaigns/{campaign}/variables'
*/
getVariableKeys.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVariableKeys.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignContactController::getVariableKeys
* @see app/Http/Controllers/CampaignContactController.php:142
* @route '/campaigns/{campaign}/variables'
*/
getVariableKeys.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVariableKeys.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignContactController::getVariableKeys
* @see app/Http/Controllers/CampaignContactController.php:142
* @route '/campaigns/{campaign}/variables'
*/
const getVariableKeysForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVariableKeys.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignContactController::getVariableKeys
* @see app/Http/Controllers/CampaignContactController.php:142
* @route '/campaigns/{campaign}/variables'
*/
getVariableKeysForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVariableKeys.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignContactController::getVariableKeys
* @see app/Http/Controllers/CampaignContactController.php:142
* @route '/campaigns/{campaign}/variables'
*/
getVariableKeysForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVariableKeys.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getVariableKeys.form = getVariableKeysForm

const CampaignContactController = { store, update, destroy, getVariableKeys }

export default CampaignContactController
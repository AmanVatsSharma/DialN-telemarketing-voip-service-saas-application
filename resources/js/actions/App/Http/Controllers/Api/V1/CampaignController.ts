import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\CampaignController::index
* @see app/Http/Controllers/Api/V1/CampaignController.php:36
* @route '/api/v1/campaigns'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::index
* @see app/Http/Controllers/Api/V1/CampaignController.php:36
* @route '/api/v1/campaigns'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::index
* @see app/Http/Controllers/Api/V1/CampaignController.php:36
* @route '/api/v1/campaigns'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::index
* @see app/Http/Controllers/Api/V1/CampaignController.php:36
* @route '/api/v1/campaigns'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::index
* @see app/Http/Controllers/Api/V1/CampaignController.php:36
* @route '/api/v1/campaigns'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::index
* @see app/Http/Controllers/Api/V1/CampaignController.php:36
* @route '/api/v1/campaigns'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::index
* @see app/Http/Controllers/Api/V1/CampaignController.php:36
* @route '/api/v1/campaigns'
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
* @see \App\Http\Controllers\Api\V1\CampaignController::store
* @see app/Http/Controllers/Api/V1/CampaignController.php:89
* @route '/api/v1/campaigns'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::store
* @see app/Http/Controllers/Api/V1/CampaignController.php:89
* @route '/api/v1/campaigns'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::store
* @see app/Http/Controllers/Api/V1/CampaignController.php:89
* @route '/api/v1/campaigns'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::store
* @see app/Http/Controllers/Api/V1/CampaignController.php:89
* @route '/api/v1/campaigns'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::store
* @see app/Http/Controllers/Api/V1/CampaignController.php:89
* @route '/api/v1/campaigns'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::show
* @see app/Http/Controllers/Api/V1/CampaignController.php:130
* @route '/api/v1/campaigns/{campaign}'
*/
export const show = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::show
* @see app/Http/Controllers/Api/V1/CampaignController.php:130
* @route '/api/v1/campaigns/{campaign}'
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
* @see \App\Http\Controllers\Api\V1\CampaignController::show
* @see app/Http/Controllers/Api/V1/CampaignController.php:130
* @route '/api/v1/campaigns/{campaign}'
*/
show.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::show
* @see app/Http/Controllers/Api/V1/CampaignController.php:130
* @route '/api/v1/campaigns/{campaign}'
*/
show.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::show
* @see app/Http/Controllers/Api/V1/CampaignController.php:130
* @route '/api/v1/campaigns/{campaign}'
*/
const showForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::show
* @see app/Http/Controllers/Api/V1/CampaignController.php:130
* @route '/api/v1/campaigns/{campaign}'
*/
showForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::show
* @see app/Http/Controllers/Api/V1/CampaignController.php:130
* @route '/api/v1/campaigns/{campaign}'
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
* @see \App\Http\Controllers\Api\V1\CampaignController::update
* @see app/Http/Controllers/Api/V1/CampaignController.php:167
* @route '/api/v1/campaigns/{campaign}'
*/
export const update = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/campaigns/{campaign}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::update
* @see app/Http/Controllers/Api/V1/CampaignController.php:167
* @route '/api/v1/campaigns/{campaign}'
*/
update.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::update
* @see app/Http/Controllers/Api/V1/CampaignController.php:167
* @route '/api/v1/campaigns/{campaign}'
*/
update.put = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::update
* @see app/Http/Controllers/Api/V1/CampaignController.php:167
* @route '/api/v1/campaigns/{campaign}'
*/
const updateForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::update
* @see app/Http/Controllers/Api/V1/CampaignController.php:167
* @route '/api/v1/campaigns/{campaign}'
*/
updateForm.put = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\V1\CampaignController::destroy
* @see app/Http/Controllers/Api/V1/CampaignController.php:209
* @route '/api/v1/campaigns/{campaign}'
*/
export const destroy = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/campaigns/{campaign}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::destroy
* @see app/Http/Controllers/Api/V1/CampaignController.php:209
* @route '/api/v1/campaigns/{campaign}'
*/
destroy.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::destroy
* @see app/Http/Controllers/Api/V1/CampaignController.php:209
* @route '/api/v1/campaigns/{campaign}'
*/
destroy.delete = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::destroy
* @see app/Http/Controllers/Api/V1/CampaignController.php:209
* @route '/api/v1/campaigns/{campaign}'
*/
const destroyForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::destroy
* @see app/Http/Controllers/Api/V1/CampaignController.php:209
* @route '/api/v1/campaigns/{campaign}'
*/
destroyForm.delete = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\V1\CampaignController::start
* @see app/Http/Controllers/Api/V1/CampaignController.php:236
* @route '/api/v1/campaigns/{campaign}/start'
*/
export const start = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::start
* @see app/Http/Controllers/Api/V1/CampaignController.php:236
* @route '/api/v1/campaigns/{campaign}/start'
*/
start.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return start.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::start
* @see app/Http/Controllers/Api/V1/CampaignController.php:236
* @route '/api/v1/campaigns/{campaign}/start'
*/
start.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::start
* @see app/Http/Controllers/Api/V1/CampaignController.php:236
* @route '/api/v1/campaigns/{campaign}/start'
*/
const startForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: start.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::start
* @see app/Http/Controllers/Api/V1/CampaignController.php:236
* @route '/api/v1/campaigns/{campaign}/start'
*/
startForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: start.url(args, options),
    method: 'post',
})

start.form = startForm

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::pause
* @see app/Http/Controllers/Api/V1/CampaignController.php:270
* @route '/api/v1/campaigns/{campaign}/pause'
*/
export const pause = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pause.url(args, options),
    method: 'post',
})

pause.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/pause',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::pause
* @see app/Http/Controllers/Api/V1/CampaignController.php:270
* @route '/api/v1/campaigns/{campaign}/pause'
*/
pause.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return pause.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::pause
* @see app/Http/Controllers/Api/V1/CampaignController.php:270
* @route '/api/v1/campaigns/{campaign}/pause'
*/
pause.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pause.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::pause
* @see app/Http/Controllers/Api/V1/CampaignController.php:270
* @route '/api/v1/campaigns/{campaign}/pause'
*/
const pauseForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pause.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::pause
* @see app/Http/Controllers/Api/V1/CampaignController.php:270
* @route '/api/v1/campaigns/{campaign}/pause'
*/
pauseForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pause.url(args, options),
    method: 'post',
})

pause.form = pauseForm

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::resume
* @see app/Http/Controllers/Api/V1/CampaignController.php:300
* @route '/api/v1/campaigns/{campaign}/resume'
*/
export const resume = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(args, options),
    method: 'post',
})

resume.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/resume',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::resume
* @see app/Http/Controllers/Api/V1/CampaignController.php:300
* @route '/api/v1/campaigns/{campaign}/resume'
*/
resume.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return resume.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::resume
* @see app/Http/Controllers/Api/V1/CampaignController.php:300
* @route '/api/v1/campaigns/{campaign}/resume'
*/
resume.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::resume
* @see app/Http/Controllers/Api/V1/CampaignController.php:300
* @route '/api/v1/campaigns/{campaign}/resume'
*/
const resumeForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resume.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::resume
* @see app/Http/Controllers/Api/V1/CampaignController.php:300
* @route '/api/v1/campaigns/{campaign}/resume'
*/
resumeForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resume.url(args, options),
    method: 'post',
})

resume.form = resumeForm

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stop
* @see app/Http/Controllers/Api/V1/CampaignController.php:330
* @route '/api/v1/campaigns/{campaign}/stop'
*/
export const stop = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(args, options),
    method: 'post',
})

stop.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stop
* @see app/Http/Controllers/Api/V1/CampaignController.php:330
* @route '/api/v1/campaigns/{campaign}/stop'
*/
stop.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return stop.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stop
* @see app/Http/Controllers/Api/V1/CampaignController.php:330
* @route '/api/v1/campaigns/{campaign}/stop'
*/
stop.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stop
* @see app/Http/Controllers/Api/V1/CampaignController.php:330
* @route '/api/v1/campaigns/{campaign}/stop'
*/
const stopForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stop.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stop
* @see app/Http/Controllers/Api/V1/CampaignController.php:330
* @route '/api/v1/campaigns/{campaign}/stop'
*/
stopForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stop.url(args, options),
    method: 'post',
})

stop.form = stopForm

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stats
* @see app/Http/Controllers/Api/V1/CampaignController.php:356
* @route '/api/v1/campaigns/{campaign}/stats'
*/
export const stats = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(args, options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stats
* @see app/Http/Controllers/Api/V1/CampaignController.php:356
* @route '/api/v1/campaigns/{campaign}/stats'
*/
stats.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return stats.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stats
* @see app/Http/Controllers/Api/V1/CampaignController.php:356
* @route '/api/v1/campaigns/{campaign}/stats'
*/
stats.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stats
* @see app/Http/Controllers/Api/V1/CampaignController.php:356
* @route '/api/v1/campaigns/{campaign}/stats'
*/
stats.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stats
* @see app/Http/Controllers/Api/V1/CampaignController.php:356
* @route '/api/v1/campaigns/{campaign}/stats'
*/
const statsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stats
* @see app/Http/Controllers/Api/V1/CampaignController.php:356
* @route '/api/v1/campaigns/{campaign}/stats'
*/
statsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::stats
* @see app/Http/Controllers/Api/V1/CampaignController.php:356
* @route '/api/v1/campaigns/{campaign}/stats'
*/
statsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stats.form = statsForm

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::contacts
* @see app/Http/Controllers/Api/V1/CampaignController.php:415
* @route '/api/v1/campaigns/{campaign}/contacts'
*/
export const contacts = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contacts.url(args, options),
    method: 'get',
})

contacts.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/contacts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::contacts
* @see app/Http/Controllers/Api/V1/CampaignController.php:415
* @route '/api/v1/campaigns/{campaign}/contacts'
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
* @see \App\Http\Controllers\Api\V1\CampaignController::contacts
* @see app/Http/Controllers/Api/V1/CampaignController.php:415
* @route '/api/v1/campaigns/{campaign}/contacts'
*/
contacts.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::contacts
* @see app/Http/Controllers/Api/V1/CampaignController.php:415
* @route '/api/v1/campaigns/{campaign}/contacts'
*/
contacts.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contacts.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::contacts
* @see app/Http/Controllers/Api/V1/CampaignController.php:415
* @route '/api/v1/campaigns/{campaign}/contacts'
*/
const contactsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::contacts
* @see app/Http/Controllers/Api/V1/CampaignController.php:415
* @route '/api/v1/campaigns/{campaign}/contacts'
*/
contactsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contacts.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::contacts
* @see app/Http/Controllers/Api/V1/CampaignController.php:415
* @route '/api/v1/campaigns/{campaign}/contacts'
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

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::calls
* @see app/Http/Controllers/Api/V1/CampaignController.php:390
* @route '/api/v1/campaigns/{campaign}/calls'
*/
export const calls = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(args, options),
    method: 'get',
})

calls.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::calls
* @see app/Http/Controllers/Api/V1/CampaignController.php:390
* @route '/api/v1/campaigns/{campaign}/calls'
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
* @see \App\Http\Controllers\Api\V1\CampaignController::calls
* @see app/Http/Controllers/Api/V1/CampaignController.php:390
* @route '/api/v1/campaigns/{campaign}/calls'
*/
calls.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::calls
* @see app/Http/Controllers/Api/V1/CampaignController.php:390
* @route '/api/v1/campaigns/{campaign}/calls'
*/
calls.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calls.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::calls
* @see app/Http/Controllers/Api/V1/CampaignController.php:390
* @route '/api/v1/campaigns/{campaign}/calls'
*/
const callsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::calls
* @see app/Http/Controllers/Api/V1/CampaignController.php:390
* @route '/api/v1/campaigns/{campaign}/calls'
*/
callsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CampaignController::calls
* @see app/Http/Controllers/Api/V1/CampaignController.php:390
* @route '/api/v1/campaigns/{campaign}/calls'
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

const CampaignController = { index, store, show, update, destroy, start, pause, resume, stop, stats, contacts, calls }

export default CampaignController
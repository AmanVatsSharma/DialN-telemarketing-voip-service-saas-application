import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CampaignController::index
* @see app/Http/Controllers/CampaignController.php:27
* @route '/campaigns'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/campaigns',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignController::index
* @see app/Http/Controllers/CampaignController.php:27
* @route '/campaigns'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignController::index
* @see app/Http/Controllers/CampaignController.php:27
* @route '/campaigns'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::index
* @see app/Http/Controllers/CampaignController.php:27
* @route '/campaigns'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignController::index
* @see app/Http/Controllers/CampaignController.php:27
* @route '/campaigns'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::index
* @see app/Http/Controllers/CampaignController.php:27
* @route '/campaigns'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::index
* @see app/Http/Controllers/CampaignController.php:27
* @route '/campaigns'
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
* @see \App\Http\Controllers\CampaignController::create
* @see app/Http/Controllers/CampaignController.php:62
* @route '/campaigns/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/campaigns/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignController::create
* @see app/Http/Controllers/CampaignController.php:62
* @route '/campaigns/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignController::create
* @see app/Http/Controllers/CampaignController.php:62
* @route '/campaigns/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::create
* @see app/Http/Controllers/CampaignController.php:62
* @route '/campaigns/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignController::create
* @see app/Http/Controllers/CampaignController.php:62
* @route '/campaigns/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::create
* @see app/Http/Controllers/CampaignController.php:62
* @route '/campaigns/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::create
* @see app/Http/Controllers/CampaignController.php:62
* @route '/campaigns/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\CampaignController::store
* @see app/Http/Controllers/CampaignController.php:131
* @route '/campaigns'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/campaigns',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignController::store
* @see app/Http/Controllers/CampaignController.php:131
* @route '/campaigns'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignController::store
* @see app/Http/Controllers/CampaignController.php:131
* @route '/campaigns'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::store
* @see app/Http/Controllers/CampaignController.php:131
* @route '/campaigns'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::store
* @see app/Http/Controllers/CampaignController.php:131
* @route '/campaigns'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CampaignController::show
* @see app/Http/Controllers/CampaignController.php:246
* @route '/campaigns/{campaign}'
*/
export const show = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/campaigns/{campaign}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignController::show
* @see app/Http/Controllers/CampaignController.php:246
* @route '/campaigns/{campaign}'
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
* @see \App\Http\Controllers\CampaignController::show
* @see app/Http/Controllers/CampaignController.php:246
* @route '/campaigns/{campaign}'
*/
show.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::show
* @see app/Http/Controllers/CampaignController.php:246
* @route '/campaigns/{campaign}'
*/
show.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignController::show
* @see app/Http/Controllers/CampaignController.php:246
* @route '/campaigns/{campaign}'
*/
const showForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::show
* @see app/Http/Controllers/CampaignController.php:246
* @route '/campaigns/{campaign}'
*/
showForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::show
* @see app/Http/Controllers/CampaignController.php:246
* @route '/campaigns/{campaign}'
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
* @see \App\Http\Controllers\CampaignController::edit
* @see app/Http/Controllers/CampaignController.php:325
* @route '/campaigns/{campaign}/edit'
*/
export const edit = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/campaigns/{campaign}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignController::edit
* @see app/Http/Controllers/CampaignController.php:325
* @route '/campaigns/{campaign}/edit'
*/
edit.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignController::edit
* @see app/Http/Controllers/CampaignController.php:325
* @route '/campaigns/{campaign}/edit'
*/
edit.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::edit
* @see app/Http/Controllers/CampaignController.php:325
* @route '/campaigns/{campaign}/edit'
*/
edit.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignController::edit
* @see app/Http/Controllers/CampaignController.php:325
* @route '/campaigns/{campaign}/edit'
*/
const editForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::edit
* @see app/Http/Controllers/CampaignController.php:325
* @route '/campaigns/{campaign}/edit'
*/
editForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignController::edit
* @see app/Http/Controllers/CampaignController.php:325
* @route '/campaigns/{campaign}/edit'
*/
editForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\CampaignController::update
* @see app/Http/Controllers/CampaignController.php:366
* @route '/campaigns/{campaign}'
*/
export const update = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/campaigns/{campaign}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CampaignController::update
* @see app/Http/Controllers/CampaignController.php:366
* @route '/campaigns/{campaign}'
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
* @see \App\Http\Controllers\CampaignController::update
* @see app/Http/Controllers/CampaignController.php:366
* @route '/campaigns/{campaign}'
*/
update.put = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CampaignController::update
* @see app/Http/Controllers/CampaignController.php:366
* @route '/campaigns/{campaign}'
*/
update.patch = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CampaignController::update
* @see app/Http/Controllers/CampaignController.php:366
* @route '/campaigns/{campaign}'
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
* @see \App\Http\Controllers\CampaignController::update
* @see app/Http/Controllers/CampaignController.php:366
* @route '/campaigns/{campaign}'
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

/**
* @see \App\Http\Controllers\CampaignController::update
* @see app/Http/Controllers/CampaignController.php:366
* @route '/campaigns/{campaign}'
*/
updateForm.patch = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\CampaignController::destroy
* @see app/Http/Controllers/CampaignController.php:426
* @route '/campaigns/{campaign}'
*/
export const destroy = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/campaigns/{campaign}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CampaignController::destroy
* @see app/Http/Controllers/CampaignController.php:426
* @route '/campaigns/{campaign}'
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
* @see \App\Http\Controllers\CampaignController::destroy
* @see app/Http/Controllers/CampaignController.php:426
* @route '/campaigns/{campaign}'
*/
destroy.delete = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CampaignController::destroy
* @see app/Http/Controllers/CampaignController.php:426
* @route '/campaigns/{campaign}'
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
* @see \App\Http\Controllers\CampaignController::destroy
* @see app/Http/Controllers/CampaignController.php:426
* @route '/campaigns/{campaign}'
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
* @see \App\Http\Controllers\CampaignController::launch
* @see app/Http/Controllers/CampaignController.php:446
* @route '/campaigns/{campaign}/launch'
*/
export const launch = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: launch.url(args, options),
    method: 'post',
})

launch.definition = {
    methods: ["post"],
    url: '/campaigns/{campaign}/launch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignController::launch
* @see app/Http/Controllers/CampaignController.php:446
* @route '/campaigns/{campaign}/launch'
*/
launch.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return launch.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignController::launch
* @see app/Http/Controllers/CampaignController.php:446
* @route '/campaigns/{campaign}/launch'
*/
launch.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: launch.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::launch
* @see app/Http/Controllers/CampaignController.php:446
* @route '/campaigns/{campaign}/launch'
*/
const launchForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: launch.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::launch
* @see app/Http/Controllers/CampaignController.php:446
* @route '/campaigns/{campaign}/launch'
*/
launchForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: launch.url(args, options),
    method: 'post',
})

launch.form = launchForm

/**
* @see \App\Http\Controllers\CampaignController::pause
* @see app/Http/Controllers/CampaignController.php:465
* @route '/campaigns/{campaign}/pause'
*/
export const pause = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pause.url(args, options),
    method: 'post',
})

pause.definition = {
    methods: ["post"],
    url: '/campaigns/{campaign}/pause',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignController::pause
* @see app/Http/Controllers/CampaignController.php:465
* @route '/campaigns/{campaign}/pause'
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
* @see \App\Http\Controllers\CampaignController::pause
* @see app/Http/Controllers/CampaignController.php:465
* @route '/campaigns/{campaign}/pause'
*/
pause.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pause.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::pause
* @see app/Http/Controllers/CampaignController.php:465
* @route '/campaigns/{campaign}/pause'
*/
const pauseForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pause.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::pause
* @see app/Http/Controllers/CampaignController.php:465
* @route '/campaigns/{campaign}/pause'
*/
pauseForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pause.url(args, options),
    method: 'post',
})

pause.form = pauseForm

/**
* @see \App\Http\Controllers\CampaignController::resume
* @see app/Http/Controllers/CampaignController.php:484
* @route '/campaigns/{campaign}/resume'
*/
export const resume = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(args, options),
    method: 'post',
})

resume.definition = {
    methods: ["post"],
    url: '/campaigns/{campaign}/resume',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignController::resume
* @see app/Http/Controllers/CampaignController.php:484
* @route '/campaigns/{campaign}/resume'
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
* @see \App\Http\Controllers\CampaignController::resume
* @see app/Http/Controllers/CampaignController.php:484
* @route '/campaigns/{campaign}/resume'
*/
resume.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::resume
* @see app/Http/Controllers/CampaignController.php:484
* @route '/campaigns/{campaign}/resume'
*/
const resumeForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resume.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::resume
* @see app/Http/Controllers/CampaignController.php:484
* @route '/campaigns/{campaign}/resume'
*/
resumeForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resume.url(args, options),
    method: 'post',
})

resume.form = resumeForm

/**
* @see \App\Http\Controllers\CampaignController::makeOnDemandCall
* @see app/Http/Controllers/CampaignController.php:535
* @route '/campaigns/{campaign}/on-demand-call'
*/
export const makeOnDemandCall = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: makeOnDemandCall.url(args, options),
    method: 'post',
})

makeOnDemandCall.definition = {
    methods: ["post"],
    url: '/campaigns/{campaign}/on-demand-call',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignController::makeOnDemandCall
* @see app/Http/Controllers/CampaignController.php:535
* @route '/campaigns/{campaign}/on-demand-call'
*/
makeOnDemandCall.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return makeOnDemandCall.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignController::makeOnDemandCall
* @see app/Http/Controllers/CampaignController.php:535
* @route '/campaigns/{campaign}/on-demand-call'
*/
makeOnDemandCall.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: makeOnDemandCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::makeOnDemandCall
* @see app/Http/Controllers/CampaignController.php:535
* @route '/campaigns/{campaign}/on-demand-call'
*/
const makeOnDemandCallForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: makeOnDemandCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::makeOnDemandCall
* @see app/Http/Controllers/CampaignController.php:535
* @route '/campaigns/{campaign}/on-demand-call'
*/
makeOnDemandCallForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: makeOnDemandCall.url(args, options),
    method: 'post',
})

makeOnDemandCall.form = makeOnDemandCallForm

/**
* @see \App\Http\Controllers\CampaignController::uploadContacts
* @see app/Http/Controllers/CampaignController.php:503
* @route '/campaigns/{campaign}/contacts/upload'
*/
export const uploadContacts = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadContacts.url(args, options),
    method: 'post',
})

uploadContacts.definition = {
    methods: ["post"],
    url: '/campaigns/{campaign}/contacts/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignController::uploadContacts
* @see app/Http/Controllers/CampaignController.php:503
* @route '/campaigns/{campaign}/contacts/upload'
*/
uploadContacts.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return uploadContacts.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignController::uploadContacts
* @see app/Http/Controllers/CampaignController.php:503
* @route '/campaigns/{campaign}/contacts/upload'
*/
uploadContacts.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadContacts.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::uploadContacts
* @see app/Http/Controllers/CampaignController.php:503
* @route '/campaigns/{campaign}/contacts/upload'
*/
const uploadContactsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadContacts.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignController::uploadContacts
* @see app/Http/Controllers/CampaignController.php:503
* @route '/campaigns/{campaign}/contacts/upload'
*/
uploadContactsForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadContacts.url(args, options),
    method: 'post',
})

uploadContacts.form = uploadContactsForm

const CampaignController = { index, create, store, show, edit, update, destroy, launch, pause, resume, makeOnDemandCall, uploadContacts }

export default CampaignController
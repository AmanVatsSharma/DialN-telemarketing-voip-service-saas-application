import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CampaignTemplateController::index
* @see app/Http/Controllers/CampaignTemplateController.php:19
* @route '/campaign-templates'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/campaign-templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignTemplateController::index
* @see app/Http/Controllers/CampaignTemplateController.php:19
* @route '/campaign-templates'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignTemplateController::index
* @see app/Http/Controllers/CampaignTemplateController.php:19
* @route '/campaign-templates'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::index
* @see app/Http/Controllers/CampaignTemplateController.php:19
* @route '/campaign-templates'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::index
* @see app/Http/Controllers/CampaignTemplateController.php:19
* @route '/campaign-templates'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::index
* @see app/Http/Controllers/CampaignTemplateController.php:19
* @route '/campaign-templates'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::index
* @see app/Http/Controllers/CampaignTemplateController.php:19
* @route '/campaign-templates'
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
* @see \App\Http\Controllers\CampaignTemplateController::create
* @see app/Http/Controllers/CampaignTemplateController.php:56
* @route '/campaign-templates/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/campaign-templates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignTemplateController::create
* @see app/Http/Controllers/CampaignTemplateController.php:56
* @route '/campaign-templates/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignTemplateController::create
* @see app/Http/Controllers/CampaignTemplateController.php:56
* @route '/campaign-templates/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::create
* @see app/Http/Controllers/CampaignTemplateController.php:56
* @route '/campaign-templates/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::create
* @see app/Http/Controllers/CampaignTemplateController.php:56
* @route '/campaign-templates/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::create
* @see app/Http/Controllers/CampaignTemplateController.php:56
* @route '/campaign-templates/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::create
* @see app/Http/Controllers/CampaignTemplateController.php:56
* @route '/campaign-templates/create'
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
* @see \App\Http\Controllers\CampaignTemplateController::show
* @see app/Http/Controllers/CampaignTemplateController.php:46
* @route '/campaign-templates/{template}'
*/
export const show = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/campaign-templates/{template}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CampaignTemplateController::show
* @see app/Http/Controllers/CampaignTemplateController.php:46
* @route '/campaign-templates/{template}'
*/
show.url = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        template: typeof args.template === 'object'
        ? args.template.id
        : args.template,
    }

    return show.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignTemplateController::show
* @see app/Http/Controllers/CampaignTemplateController.php:46
* @route '/campaign-templates/{template}'
*/
show.get = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::show
* @see app/Http/Controllers/CampaignTemplateController.php:46
* @route '/campaign-templates/{template}'
*/
show.head = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::show
* @see app/Http/Controllers/CampaignTemplateController.php:46
* @route '/campaign-templates/{template}'
*/
const showForm = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::show
* @see app/Http/Controllers/CampaignTemplateController.php:46
* @route '/campaign-templates/{template}'
*/
showForm.get = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::show
* @see app/Http/Controllers/CampaignTemplateController.php:46
* @route '/campaign-templates/{template}'
*/
showForm.head = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CampaignTemplateController::store
* @see app/Http/Controllers/CampaignTemplateController.php:72
* @route '/campaign-templates'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/campaign-templates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignTemplateController::store
* @see app/Http/Controllers/CampaignTemplateController.php:72
* @route '/campaign-templates'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignTemplateController::store
* @see app/Http/Controllers/CampaignTemplateController.php:72
* @route '/campaign-templates'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::store
* @see app/Http/Controllers/CampaignTemplateController.php:72
* @route '/campaign-templates'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::store
* @see app/Http/Controllers/CampaignTemplateController.php:72
* @route '/campaign-templates'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CampaignTemplateController::update
* @see app/Http/Controllers/CampaignTemplateController.php:101
* @route '/campaign-templates/{template}'
*/
export const update = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/campaign-templates/{template}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CampaignTemplateController::update
* @see app/Http/Controllers/CampaignTemplateController.php:101
* @route '/campaign-templates/{template}'
*/
update.url = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        template: typeof args.template === 'object'
        ? args.template.id
        : args.template,
    }

    return update.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignTemplateController::update
* @see app/Http/Controllers/CampaignTemplateController.php:101
* @route '/campaign-templates/{template}'
*/
update.put = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::update
* @see app/Http/Controllers/CampaignTemplateController.php:101
* @route '/campaign-templates/{template}'
*/
const updateForm = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::update
* @see app/Http/Controllers/CampaignTemplateController.php:101
* @route '/campaign-templates/{template}'
*/
updateForm.put = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CampaignTemplateController::destroy
* @see app/Http/Controllers/CampaignTemplateController.php:130
* @route '/campaign-templates/{template}'
*/
export const destroy = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/campaign-templates/{template}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CampaignTemplateController::destroy
* @see app/Http/Controllers/CampaignTemplateController.php:130
* @route '/campaign-templates/{template}'
*/
destroy.url = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        template: typeof args.template === 'object'
        ? args.template.id
        : args.template,
    }

    return destroy.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignTemplateController::destroy
* @see app/Http/Controllers/CampaignTemplateController.php:130
* @route '/campaign-templates/{template}'
*/
destroy.delete = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::destroy
* @see app/Http/Controllers/CampaignTemplateController.php:130
* @route '/campaign-templates/{template}'
*/
const destroyForm = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::destroy
* @see app/Http/Controllers/CampaignTemplateController.php:130
* @route '/campaign-templates/{template}'
*/
destroyForm.delete = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CampaignTemplateController::use
* @see app/Http/Controllers/CampaignTemplateController.php:145
* @route '/campaign-templates/{template}/use'
*/
export const use = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: use.url(args, options),
    method: 'post',
})

use.definition = {
    methods: ["post"],
    url: '/campaign-templates/{template}/use',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignTemplateController::use
* @see app/Http/Controllers/CampaignTemplateController.php:145
* @route '/campaign-templates/{template}/use'
*/
use.url = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        template: typeof args.template === 'object'
        ? args.template.id
        : args.template,
    }

    return use.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignTemplateController::use
* @see app/Http/Controllers/CampaignTemplateController.php:145
* @route '/campaign-templates/{template}/use'
*/
use.post = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: use.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::use
* @see app/Http/Controllers/CampaignTemplateController.php:145
* @route '/campaign-templates/{template}/use'
*/
const useForm = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: use.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::use
* @see app/Http/Controllers/CampaignTemplateController.php:145
* @route '/campaign-templates/{template}/use'
*/
useForm.post = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: use.url(args, options),
    method: 'post',
})

use.form = useForm

/**
* @see \App\Http\Controllers\CampaignTemplateController::fromCampaign
* @see app/Http/Controllers/CampaignTemplateController.php:157
* @route '/campaign-templates/from-campaign'
*/
export const fromCampaign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fromCampaign.url(options),
    method: 'post',
})

fromCampaign.definition = {
    methods: ["post"],
    url: '/campaign-templates/from-campaign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CampaignTemplateController::fromCampaign
* @see app/Http/Controllers/CampaignTemplateController.php:157
* @route '/campaign-templates/from-campaign'
*/
fromCampaign.url = (options?: RouteQueryOptions) => {
    return fromCampaign.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CampaignTemplateController::fromCampaign
* @see app/Http/Controllers/CampaignTemplateController.php:157
* @route '/campaign-templates/from-campaign'
*/
fromCampaign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fromCampaign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::fromCampaign
* @see app/Http/Controllers/CampaignTemplateController.php:157
* @route '/campaign-templates/from-campaign'
*/
const fromCampaignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: fromCampaign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CampaignTemplateController::fromCampaign
* @see app/Http/Controllers/CampaignTemplateController.php:157
* @route '/campaign-templates/from-campaign'
*/
fromCampaignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: fromCampaign.url(options),
    method: 'post',
})

fromCampaign.form = fromCampaignForm

const campaignTemplates = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    show: Object.assign(show, show),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    use: Object.assign(use, use),
    fromCampaign: Object.assign(fromCampaign, fromCampaign),
}

export default campaignTemplates
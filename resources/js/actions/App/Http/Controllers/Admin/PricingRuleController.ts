import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PricingRuleController::index
* @see app/Http/Controllers/Admin/PricingRuleController.php:22
* @route '/admin/pricing'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pricing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::index
* @see app/Http/Controllers/Admin/PricingRuleController.php:22
* @route '/admin/pricing'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::index
* @see app/Http/Controllers/Admin/PricingRuleController.php:22
* @route '/admin/pricing'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::index
* @see app/Http/Controllers/Admin/PricingRuleController.php:22
* @route '/admin/pricing'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::index
* @see app/Http/Controllers/Admin/PricingRuleController.php:22
* @route '/admin/pricing'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::index
* @see app/Http/Controllers/Admin/PricingRuleController.php:22
* @route '/admin/pricing'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::index
* @see app/Http/Controllers/Admin/PricingRuleController.php:22
* @route '/admin/pricing'
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
* @see \App\Http\Controllers\Admin\PricingRuleController::create
* @see app/Http/Controllers/Admin/PricingRuleController.php:137
* @route '/admin/pricing/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/pricing/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::create
* @see app/Http/Controllers/Admin/PricingRuleController.php:137
* @route '/admin/pricing/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::create
* @see app/Http/Controllers/Admin/PricingRuleController.php:137
* @route '/admin/pricing/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::create
* @see app/Http/Controllers/Admin/PricingRuleController.php:137
* @route '/admin/pricing/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::create
* @see app/Http/Controllers/Admin/PricingRuleController.php:137
* @route '/admin/pricing/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::create
* @see app/Http/Controllers/Admin/PricingRuleController.php:137
* @route '/admin/pricing/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::create
* @see app/Http/Controllers/Admin/PricingRuleController.php:137
* @route '/admin/pricing/create'
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
* @see \App\Http\Controllers\Admin\PricingRuleController::store
* @see app/Http/Controllers/Admin/PricingRuleController.php:145
* @route '/admin/pricing'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/pricing',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::store
* @see app/Http/Controllers/Admin/PricingRuleController.php:145
* @route '/admin/pricing'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::store
* @see app/Http/Controllers/Admin/PricingRuleController.php:145
* @route '/admin/pricing'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::store
* @see app/Http/Controllers/Admin/PricingRuleController.php:145
* @route '/admin/pricing'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::store
* @see app/Http/Controllers/Admin/PricingRuleController.php:145
* @route '/admin/pricing'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::show
* @see app/Http/Controllers/Admin/PricingRuleController.php:175
* @route '/admin/pricing/{pricingRule}'
*/
export const show = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/pricing/{pricingRule}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::show
* @see app/Http/Controllers/Admin/PricingRuleController.php:175
* @route '/admin/pricing/{pricingRule}'
*/
show.url = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricingRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pricingRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pricingRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pricingRule: typeof args.pricingRule === 'object'
        ? args.pricingRule.id
        : args.pricingRule,
    }

    return show.definition.url
            .replace('{pricingRule}', parsedArgs.pricingRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::show
* @see app/Http/Controllers/Admin/PricingRuleController.php:175
* @route '/admin/pricing/{pricingRule}'
*/
show.get = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::show
* @see app/Http/Controllers/Admin/PricingRuleController.php:175
* @route '/admin/pricing/{pricingRule}'
*/
show.head = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::show
* @see app/Http/Controllers/Admin/PricingRuleController.php:175
* @route '/admin/pricing/{pricingRule}'
*/
const showForm = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::show
* @see app/Http/Controllers/Admin/PricingRuleController.php:175
* @route '/admin/pricing/{pricingRule}'
*/
showForm.get = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::show
* @see app/Http/Controllers/Admin/PricingRuleController.php:175
* @route '/admin/pricing/{pricingRule}'
*/
showForm.head = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PricingRuleController::edit
* @see app/Http/Controllers/Admin/PricingRuleController.php:211
* @route '/admin/pricing/{pricingRule}/edit'
*/
export const edit = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/pricing/{pricingRule}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::edit
* @see app/Http/Controllers/Admin/PricingRuleController.php:211
* @route '/admin/pricing/{pricingRule}/edit'
*/
edit.url = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricingRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pricingRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pricingRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pricingRule: typeof args.pricingRule === 'object'
        ? args.pricingRule.id
        : args.pricingRule,
    }

    return edit.definition.url
            .replace('{pricingRule}', parsedArgs.pricingRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::edit
* @see app/Http/Controllers/Admin/PricingRuleController.php:211
* @route '/admin/pricing/{pricingRule}/edit'
*/
edit.get = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::edit
* @see app/Http/Controllers/Admin/PricingRuleController.php:211
* @route '/admin/pricing/{pricingRule}/edit'
*/
edit.head = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::edit
* @see app/Http/Controllers/Admin/PricingRuleController.php:211
* @route '/admin/pricing/{pricingRule}/edit'
*/
const editForm = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::edit
* @see app/Http/Controllers/Admin/PricingRuleController.php:211
* @route '/admin/pricing/{pricingRule}/edit'
*/
editForm.get = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::edit
* @see app/Http/Controllers/Admin/PricingRuleController.php:211
* @route '/admin/pricing/{pricingRule}/edit'
*/
editForm.head = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PricingRuleController::update
* @see app/Http/Controllers/Admin/PricingRuleController.php:238
* @route '/admin/pricing/{pricingRule}'
*/
export const update = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/pricing/{pricingRule}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::update
* @see app/Http/Controllers/Admin/PricingRuleController.php:238
* @route '/admin/pricing/{pricingRule}'
*/
update.url = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricingRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pricingRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pricingRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pricingRule: typeof args.pricingRule === 'object'
        ? args.pricingRule.id
        : args.pricingRule,
    }

    return update.definition.url
            .replace('{pricingRule}', parsedArgs.pricingRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::update
* @see app/Http/Controllers/Admin/PricingRuleController.php:238
* @route '/admin/pricing/{pricingRule}'
*/
update.put = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::update
* @see app/Http/Controllers/Admin/PricingRuleController.php:238
* @route '/admin/pricing/{pricingRule}'
*/
const updateForm = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::update
* @see app/Http/Controllers/Admin/PricingRuleController.php:238
* @route '/admin/pricing/{pricingRule}'
*/
updateForm.put = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\PricingRuleController::destroy
* @see app/Http/Controllers/Admin/PricingRuleController.php:291
* @route '/admin/pricing/{pricingRule}'
*/
export const destroy = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pricing/{pricingRule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::destroy
* @see app/Http/Controllers/Admin/PricingRuleController.php:291
* @route '/admin/pricing/{pricingRule}'
*/
destroy.url = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricingRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pricingRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pricingRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pricingRule: typeof args.pricingRule === 'object'
        ? args.pricingRule.id
        : args.pricingRule,
    }

    return destroy.definition.url
            .replace('{pricingRule}', parsedArgs.pricingRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::destroy
* @see app/Http/Controllers/Admin/PricingRuleController.php:291
* @route '/admin/pricing/{pricingRule}'
*/
destroy.delete = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::destroy
* @see app/Http/Controllers/Admin/PricingRuleController.php:291
* @route '/admin/pricing/{pricingRule}'
*/
const destroyForm = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::destroy
* @see app/Http/Controllers/Admin/PricingRuleController.php:291
* @route '/admin/pricing/{pricingRule}'
*/
destroyForm.delete = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\PricingRuleController::toggleActive
* @see app/Http/Controllers/Admin/PricingRuleController.php:323
* @route '/admin/pricing/{pricingRule}/toggle'
*/
export const toggleActive = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/pricing/{pricingRule}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::toggleActive
* @see app/Http/Controllers/Admin/PricingRuleController.php:323
* @route '/admin/pricing/{pricingRule}/toggle'
*/
toggleActive.url = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricingRule: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pricingRule: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pricingRule: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pricingRule: typeof args.pricingRule === 'object'
        ? args.pricingRule.id
        : args.pricingRule,
    }

    return toggleActive.definition.url
            .replace('{pricingRule}', parsedArgs.pricingRule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::toggleActive
* @see app/Http/Controllers/Admin/PricingRuleController.php:323
* @route '/admin/pricing/{pricingRule}/toggle'
*/
toggleActive.post = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::toggleActive
* @see app/Http/Controllers/Admin/PricingRuleController.php:323
* @route '/admin/pricing/{pricingRule}/toggle'
*/
const toggleActiveForm = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::toggleActive
* @see app/Http/Controllers/Admin/PricingRuleController.php:323
* @route '/admin/pricing/{pricingRule}/toggle'
*/
toggleActiveForm.post = (args: { pricingRule: number | { id: number } } | [pricingRule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkImport
* @see app/Http/Controllers/Admin/PricingRuleController.php:336
* @route '/admin/pricing/bulk-import'
*/
export const bulkImport = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkImport.url(options),
    method: 'post',
})

bulkImport.definition = {
    methods: ["post"],
    url: '/admin/pricing/bulk-import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkImport
* @see app/Http/Controllers/Admin/PricingRuleController.php:336
* @route '/admin/pricing/bulk-import'
*/
bulkImport.url = (options?: RouteQueryOptions) => {
    return bulkImport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkImport
* @see app/Http/Controllers/Admin/PricingRuleController.php:336
* @route '/admin/pricing/bulk-import'
*/
bulkImport.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkImport.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkImport
* @see app/Http/Controllers/Admin/PricingRuleController.php:336
* @route '/admin/pricing/bulk-import'
*/
const bulkImportForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkImport.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkImport
* @see app/Http/Controllers/Admin/PricingRuleController.php:336
* @route '/admin/pricing/bulk-import'
*/
bulkImportForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkImport.url(options),
    method: 'post',
})

bulkImport.form = bulkImportForm

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkUpdateMarkup
* @see app/Http/Controllers/Admin/PricingRuleController.php:369
* @route '/admin/pricing/bulk-update-markup'
*/
export const bulkUpdateMarkup = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdateMarkup.url(options),
    method: 'post',
})

bulkUpdateMarkup.definition = {
    methods: ["post"],
    url: '/admin/pricing/bulk-update-markup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkUpdateMarkup
* @see app/Http/Controllers/Admin/PricingRuleController.php:369
* @route '/admin/pricing/bulk-update-markup'
*/
bulkUpdateMarkup.url = (options?: RouteQueryOptions) => {
    return bulkUpdateMarkup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkUpdateMarkup
* @see app/Http/Controllers/Admin/PricingRuleController.php:369
* @route '/admin/pricing/bulk-update-markup'
*/
bulkUpdateMarkup.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdateMarkup.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkUpdateMarkup
* @see app/Http/Controllers/Admin/PricingRuleController.php:369
* @route '/admin/pricing/bulk-update-markup'
*/
const bulkUpdateMarkupForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkUpdateMarkup.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkUpdateMarkup
* @see app/Http/Controllers/Admin/PricingRuleController.php:369
* @route '/admin/pricing/bulk-update-markup'
*/
bulkUpdateMarkupForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkUpdateMarkup.url(options),
    method: 'post',
})

bulkUpdateMarkup.form = bulkUpdateMarkupForm

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkDelete
* @see app/Http/Controllers/Admin/PricingRuleController.php:305
* @route '/admin/pricing/bulk-delete'
*/
export const bulkDelete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkDelete.url(options),
    method: 'post',
})

bulkDelete.definition = {
    methods: ["post"],
    url: '/admin/pricing/bulk-delete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkDelete
* @see app/Http/Controllers/Admin/PricingRuleController.php:305
* @route '/admin/pricing/bulk-delete'
*/
bulkDelete.url = (options?: RouteQueryOptions) => {
    return bulkDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkDelete
* @see app/Http/Controllers/Admin/PricingRuleController.php:305
* @route '/admin/pricing/bulk-delete'
*/
bulkDelete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkDelete.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkDelete
* @see app/Http/Controllers/Admin/PricingRuleController.php:305
* @route '/admin/pricing/bulk-delete'
*/
const bulkDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDelete.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::bulkDelete
* @see app/Http/Controllers/Admin/PricingRuleController.php:305
* @route '/admin/pricing/bulk-delete'
*/
bulkDeleteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDelete.url(options),
    method: 'post',
})

bulkDelete.form = bulkDeleteForm

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::togglePin
* @see app/Http/Controllers/Admin/PricingRuleController.php:431
* @route '/admin/pricing/toggle-pin'
*/
export const togglePin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePin.url(options),
    method: 'post',
})

togglePin.definition = {
    methods: ["post"],
    url: '/admin/pricing/toggle-pin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::togglePin
* @see app/Http/Controllers/Admin/PricingRuleController.php:431
* @route '/admin/pricing/toggle-pin'
*/
togglePin.url = (options?: RouteQueryOptions) => {
    return togglePin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::togglePin
* @see app/Http/Controllers/Admin/PricingRuleController.php:431
* @route '/admin/pricing/toggle-pin'
*/
togglePin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePin.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::togglePin
* @see app/Http/Controllers/Admin/PricingRuleController.php:431
* @route '/admin/pricing/toggle-pin'
*/
const togglePinForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePin.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::togglePin
* @see app/Http/Controllers/Admin/PricingRuleController.php:431
* @route '/admin/pricing/toggle-pin'
*/
togglePinForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePin.url(options),
    method: 'post',
})

togglePin.form = togglePinForm

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::fetchTwilioPricing
* @see app/Http/Controllers/Admin/PricingRuleController.php:0
* @route '/admin/pricing/fetch-twilio'
*/
export const fetchTwilioPricing = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fetchTwilioPricing.url(options),
    method: 'post',
})

fetchTwilioPricing.definition = {
    methods: ["post"],
    url: '/admin/pricing/fetch-twilio',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::fetchTwilioPricing
* @see app/Http/Controllers/Admin/PricingRuleController.php:0
* @route '/admin/pricing/fetch-twilio'
*/
fetchTwilioPricing.url = (options?: RouteQueryOptions) => {
    return fetchTwilioPricing.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::fetchTwilioPricing
* @see app/Http/Controllers/Admin/PricingRuleController.php:0
* @route '/admin/pricing/fetch-twilio'
*/
fetchTwilioPricing.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fetchTwilioPricing.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::fetchTwilioPricing
* @see app/Http/Controllers/Admin/PricingRuleController.php:0
* @route '/admin/pricing/fetch-twilio'
*/
const fetchTwilioPricingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: fetchTwilioPricing.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PricingRuleController::fetchTwilioPricing
* @see app/Http/Controllers/Admin/PricingRuleController.php:0
* @route '/admin/pricing/fetch-twilio'
*/
fetchTwilioPricingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: fetchTwilioPricing.url(options),
    method: 'post',
})

fetchTwilioPricing.form = fetchTwilioPricingForm

const PricingRuleController = { index, create, store, show, edit, update, destroy, toggleActive, bulkImport, bulkUpdateMarkup, bulkDelete, togglePin, fetchTwilioPricing }

export default PricingRuleController
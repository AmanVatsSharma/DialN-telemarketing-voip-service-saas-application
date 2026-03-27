import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ContactTagController::index
* @see app/Http/Controllers/ContactTagController.php:19
* @route '/contact-tags'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/contact-tags',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactTagController::index
* @see app/Http/Controllers/ContactTagController.php:19
* @route '/contact-tags'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactTagController::index
* @see app/Http/Controllers/ContactTagController.php:19
* @route '/contact-tags'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactTagController::index
* @see app/Http/Controllers/ContactTagController.php:19
* @route '/contact-tags'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactTagController::index
* @see app/Http/Controllers/ContactTagController.php:19
* @route '/contact-tags'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactTagController::index
* @see app/Http/Controllers/ContactTagController.php:19
* @route '/contact-tags'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactTagController::index
* @see app/Http/Controllers/ContactTagController.php:19
* @route '/contact-tags'
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
* @see \App\Http\Controllers\ContactTagController::store
* @see app/Http/Controllers/ContactTagController.php:34
* @route '/contact-tags'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/contact-tags',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactTagController::store
* @see app/Http/Controllers/ContactTagController.php:34
* @route '/contact-tags'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactTagController::store
* @see app/Http/Controllers/ContactTagController.php:34
* @route '/contact-tags'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactTagController::store
* @see app/Http/Controllers/ContactTagController.php:34
* @route '/contact-tags'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactTagController::store
* @see app/Http/Controllers/ContactTagController.php:34
* @route '/contact-tags'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ContactTagController::update
* @see app/Http/Controllers/ContactTagController.php:64
* @route '/contact-tags/{contact_tag}'
*/
export const update = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/contact-tags/{contact_tag}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ContactTagController::update
* @see app/Http/Controllers/ContactTagController.php:64
* @route '/contact-tags/{contact_tag}'
*/
update.url = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact_tag: args }
    }

    if (Array.isArray(args)) {
        args = {
            contact_tag: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact_tag: args.contact_tag,
    }

    return update.definition.url
            .replace('{contact_tag}', parsedArgs.contact_tag.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactTagController::update
* @see app/Http/Controllers/ContactTagController.php:64
* @route '/contact-tags/{contact_tag}'
*/
update.put = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ContactTagController::update
* @see app/Http/Controllers/ContactTagController.php:64
* @route '/contact-tags/{contact_tag}'
*/
update.patch = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ContactTagController::update
* @see app/Http/Controllers/ContactTagController.php:64
* @route '/contact-tags/{contact_tag}'
*/
const updateForm = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactTagController::update
* @see app/Http/Controllers/ContactTagController.php:64
* @route '/contact-tags/{contact_tag}'
*/
updateForm.put = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactTagController::update
* @see app/Http/Controllers/ContactTagController.php:64
* @route '/contact-tags/{contact_tag}'
*/
updateForm.patch = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ContactTagController::destroy
* @see app/Http/Controllers/ContactTagController.php:93
* @route '/contact-tags/{contact_tag}'
*/
export const destroy = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/contact-tags/{contact_tag}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ContactTagController::destroy
* @see app/Http/Controllers/ContactTagController.php:93
* @route '/contact-tags/{contact_tag}'
*/
destroy.url = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact_tag: args }
    }

    if (Array.isArray(args)) {
        args = {
            contact_tag: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact_tag: args.contact_tag,
    }

    return destroy.definition.url
            .replace('{contact_tag}', parsedArgs.contact_tag.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactTagController::destroy
* @see app/Http/Controllers/ContactTagController.php:93
* @route '/contact-tags/{contact_tag}'
*/
destroy.delete = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ContactTagController::destroy
* @see app/Http/Controllers/ContactTagController.php:93
* @route '/contact-tags/{contact_tag}'
*/
const destroyForm = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactTagController::destroy
* @see app/Http/Controllers/ContactTagController.php:93
* @route '/contact-tags/{contact_tag}'
*/
destroyForm.delete = (args: { contact_tag: string | number } | [contact_tag: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const contactTags = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default contactTags
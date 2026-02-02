import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::index
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:19
* @route '/api/v1/knowledge-bases'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/knowledge-bases',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::index
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:19
* @route '/api/v1/knowledge-bases'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::index
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:19
* @route '/api/v1/knowledge-bases'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::index
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:19
* @route '/api/v1/knowledge-bases'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::index
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:19
* @route '/api/v1/knowledge-bases'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::index
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:19
* @route '/api/v1/knowledge-bases'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::index
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:19
* @route '/api/v1/knowledge-bases'
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
* @see \App\Http\Controllers\Api\KnowledgeBaseController::store
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:83
* @route '/api/v1/knowledge-bases'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/knowledge-bases',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::store
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:83
* @route '/api/v1/knowledge-bases'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::store
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:83
* @route '/api/v1/knowledge-bases'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::store
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:83
* @route '/api/v1/knowledge-bases'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::store
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:83
* @route '/api/v1/knowledge-bases'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::fetchUrl
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:29
* @route '/api/v1/knowledge-bases/fetch-url'
*/
export const fetchUrl = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fetchUrl.url(options),
    method: 'post',
})

fetchUrl.definition = {
    methods: ["post"],
    url: '/api/v1/knowledge-bases/fetch-url',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::fetchUrl
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:29
* @route '/api/v1/knowledge-bases/fetch-url'
*/
fetchUrl.url = (options?: RouteQueryOptions) => {
    return fetchUrl.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::fetchUrl
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:29
* @route '/api/v1/knowledge-bases/fetch-url'
*/
fetchUrl.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fetchUrl.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::fetchUrl
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:29
* @route '/api/v1/knowledge-bases/fetch-url'
*/
const fetchUrlForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: fetchUrl.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::fetchUrl
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:29
* @route '/api/v1/knowledge-bases/fetch-url'
*/
fetchUrlForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: fetchUrl.url(options),
    method: 'post',
})

fetchUrl.form = fetchUrlForm

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::show
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:121
* @route '/api/v1/knowledge-bases/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/knowledge-bases/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::show
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:121
* @route '/api/v1/knowledge-bases/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::show
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:121
* @route '/api/v1/knowledge-bases/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::show
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:121
* @route '/api/v1/knowledge-bases/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::show
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:121
* @route '/api/v1/knowledge-bases/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::show
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:121
* @route '/api/v1/knowledge-bases/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::show
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:121
* @route '/api/v1/knowledge-bases/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
const updateffef00ee5ac026ec9ae92c4d077c09e9 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateffef00ee5ac026ec9ae92c4d077c09e9.url(args, options),
    method: 'put',
})

updateffef00ee5ac026ec9ae92c4d077c09e9.definition = {
    methods: ["put"],
    url: '/api/v1/knowledge-bases/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
updateffef00ee5ac026ec9ae92c4d077c09e9.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return updateffef00ee5ac026ec9ae92c4d077c09e9.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
updateffef00ee5ac026ec9ae92c4d077c09e9.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateffef00ee5ac026ec9ae92c4d077c09e9.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
const updateffef00ee5ac026ec9ae92c4d077c09e9Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateffef00ee5ac026ec9ae92c4d077c09e9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
updateffef00ee5ac026ec9ae92c4d077c09e9Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateffef00ee5ac026ec9ae92c4d077c09e9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateffef00ee5ac026ec9ae92c4d077c09e9.form = updateffef00ee5ac026ec9ae92c4d077c09e9Form
/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
const updateffef00ee5ac026ec9ae92c4d077c09e9 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateffef00ee5ac026ec9ae92c4d077c09e9.url(args, options),
    method: 'patch',
})

updateffef00ee5ac026ec9ae92c4d077c09e9.definition = {
    methods: ["patch"],
    url: '/api/v1/knowledge-bases/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
updateffef00ee5ac026ec9ae92c4d077c09e9.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return updateffef00ee5ac026ec9ae92c4d077c09e9.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
updateffef00ee5ac026ec9ae92c4d077c09e9.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateffef00ee5ac026ec9ae92c4d077c09e9.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
const updateffef00ee5ac026ec9ae92c4d077c09e9Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateffef00ee5ac026ec9ae92c4d077c09e9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::update
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:128
* @route '/api/v1/knowledge-bases/{id}'
*/
updateffef00ee5ac026ec9ae92c4d077c09e9Form.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateffef00ee5ac026ec9ae92c4d077c09e9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateffef00ee5ac026ec9ae92c4d077c09e9.form = updateffef00ee5ac026ec9ae92c4d077c09e9Form

export const update = {
    '/api/v1/knowledge-bases/{id}': updateffef00ee5ac026ec9ae92c4d077c09e9,
    '/api/v1/knowledge-bases/{id}': updateffef00ee5ac026ec9ae92c4d077c09e9,
}

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::destroy
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:167
* @route '/api/v1/knowledge-bases/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/knowledge-bases/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::destroy
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:167
* @route '/api/v1/knowledge-bases/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::destroy
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:167
* @route '/api/v1/knowledge-bases/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::destroy
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:167
* @route '/api/v1/knowledge-bases/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\KnowledgeBaseController::destroy
* @see app/Http/Controllers/Api/KnowledgeBaseController.php:167
* @route '/api/v1/knowledge-bases/{id}'
*/
destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const KnowledgeBaseController = { index, store, fetchUrl, show, update, destroy }

export default KnowledgeBaseController
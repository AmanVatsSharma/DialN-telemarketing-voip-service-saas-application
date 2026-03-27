import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\KnowledgeBaseController::index
* @see app/Http/Controllers/KnowledgeBaseController.php:11
* @route '/knowledge-bases'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/knowledge-bases',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KnowledgeBaseController::index
* @see app/Http/Controllers/KnowledgeBaseController.php:11
* @route '/knowledge-bases'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KnowledgeBaseController::index
* @see app/Http/Controllers/KnowledgeBaseController.php:11
* @route '/knowledge-bases'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::index
* @see app/Http/Controllers/KnowledgeBaseController.php:11
* @route '/knowledge-bases'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::index
* @see app/Http/Controllers/KnowledgeBaseController.php:11
* @route '/knowledge-bases'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::index
* @see app/Http/Controllers/KnowledgeBaseController.php:11
* @route '/knowledge-bases'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::index
* @see app/Http/Controllers/KnowledgeBaseController.php:11
* @route '/knowledge-bases'
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
* @see \App\Http\Controllers\KnowledgeBaseController::create
* @see app/Http/Controllers/KnowledgeBaseController.php:16
* @route '/knowledge-bases/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/knowledge-bases/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KnowledgeBaseController::create
* @see app/Http/Controllers/KnowledgeBaseController.php:16
* @route '/knowledge-bases/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KnowledgeBaseController::create
* @see app/Http/Controllers/KnowledgeBaseController.php:16
* @route '/knowledge-bases/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::create
* @see app/Http/Controllers/KnowledgeBaseController.php:16
* @route '/knowledge-bases/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::create
* @see app/Http/Controllers/KnowledgeBaseController.php:16
* @route '/knowledge-bases/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::create
* @see app/Http/Controllers/KnowledgeBaseController.php:16
* @route '/knowledge-bases/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::create
* @see app/Http/Controllers/KnowledgeBaseController.php:16
* @route '/knowledge-bases/create'
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
* @see \App\Http\Controllers\KnowledgeBaseController::edit
* @see app/Http/Controllers/KnowledgeBaseController.php:21
* @route '/knowledge-bases/{id}/edit'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/knowledge-bases/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KnowledgeBaseController::edit
* @see app/Http/Controllers/KnowledgeBaseController.php:21
* @route '/knowledge-bases/{id}/edit'
*/
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KnowledgeBaseController::edit
* @see app/Http/Controllers/KnowledgeBaseController.php:21
* @route '/knowledge-bases/{id}/edit'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::edit
* @see app/Http/Controllers/KnowledgeBaseController.php:21
* @route '/knowledge-bases/{id}/edit'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::edit
* @see app/Http/Controllers/KnowledgeBaseController.php:21
* @route '/knowledge-bases/{id}/edit'
*/
const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::edit
* @see app/Http/Controllers/KnowledgeBaseController.php:21
* @route '/knowledge-bases/{id}/edit'
*/
editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KnowledgeBaseController::edit
* @see app/Http/Controllers/KnowledgeBaseController.php:21
* @route '/knowledge-bases/{id}/edit'
*/
editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

const knowledgeBases = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    edit: Object.assign(edit, edit),
}

export default knowledgeBases
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ContactController::preview
* @see app/Http/Controllers/ContactController.php:378
* @route '/contacts/import/preview'
*/
export const preview = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

preview.definition = {
    methods: ["post"],
    url: '/contacts/import/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::preview
* @see app/Http/Controllers/ContactController.php:378
* @route '/contacts/import/preview'
*/
preview.url = (options?: RouteQueryOptions) => {
    return preview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::preview
* @see app/Http/Controllers/ContactController.php:378
* @route '/contacts/import/preview'
*/
preview.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::preview
* @see app/Http/Controllers/ContactController.php:378
* @route '/contacts/import/preview'
*/
const previewForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: preview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::preview
* @see app/Http/Controllers/ContactController.php:378
* @route '/contacts/import/preview'
*/
previewForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: preview.url(options),
    method: 'post',
})

preview.form = previewForm

/**
* @see \App\Http\Controllers\ContactController::process
* @see app/Http/Controllers/ContactController.php:452
* @route '/contacts-import'
*/
export const process = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: process.url(options),
    method: 'post',
})

process.definition = {
    methods: ["post"],
    url: '/contacts-import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::process
* @see app/Http/Controllers/ContactController.php:452
* @route '/contacts-import'
*/
process.url = (options?: RouteQueryOptions) => {
    return process.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::process
* @see app/Http/Controllers/ContactController.php:452
* @route '/contacts-import'
*/
process.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: process.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::process
* @see app/Http/Controllers/ContactController.php:452
* @route '/contacts-import'
*/
const processForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: process.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::process
* @see app/Http/Controllers/ContactController.php:452
* @route '/contacts-import'
*/
processForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: process.url(options),
    method: 'post',
})

process.form = processForm

/**
* @see \App\Http\Controllers\ContactController::status
* @see app/Http/Controllers/ContactController.php:597
* @route '/contacts/import/{id}/status'
*/
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/contacts/import/{id}/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::status
* @see app/Http/Controllers/ContactController.php:597
* @route '/contacts/import/{id}/status'
*/
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::status
* @see app/Http/Controllers/ContactController.php:597
* @route '/contacts/import/{id}/status'
*/
status.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::status
* @see app/Http/Controllers/ContactController.php:597
* @route '/contacts/import/{id}/status'
*/
status.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::status
* @see app/Http/Controllers/ContactController.php:597
* @route '/contacts/import/{id}/status'
*/
const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::status
* @see app/Http/Controllers/ContactController.php:597
* @route '/contacts/import/{id}/status'
*/
statusForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::status
* @see app/Http/Controllers/ContactController.php:597
* @route '/contacts/import/{id}/status'
*/
statusForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

status.form = statusForm

const importMethod = {
    preview: Object.assign(preview, preview),
    process: Object.assign(process, process),
    status: Object.assign(status, status),
}

export default importMethod
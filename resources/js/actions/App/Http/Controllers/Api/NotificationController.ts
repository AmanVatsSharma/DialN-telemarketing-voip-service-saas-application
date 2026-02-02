import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\NotificationController::index
* @see app/Http/Controllers/Api/NotificationController.php:13
* @route '/api/notifications'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\NotificationController::index
* @see app/Http/Controllers/Api/NotificationController.php:13
* @route '/api/notifications'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\NotificationController::index
* @see app/Http/Controllers/Api/NotificationController.php:13
* @route '/api/notifications'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\NotificationController::index
* @see app/Http/Controllers/Api/NotificationController.php:13
* @route '/api/notifications'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\NotificationController::index
* @see app/Http/Controllers/Api/NotificationController.php:13
* @route '/api/notifications'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\NotificationController::index
* @see app/Http/Controllers/Api/NotificationController.php:13
* @route '/api/notifications'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\NotificationController::index
* @see app/Http/Controllers/Api/NotificationController.php:13
* @route '/api/notifications'
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
* @see \App\Http\Controllers\Api\NotificationController::markAsRead
* @see app/Http/Controllers/Api/NotificationController.php:76
* @route '/api/notifications/{id}/read'
*/
export const markAsRead = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

markAsRead.definition = {
    methods: ["post"],
    url: '/api/notifications/{id}/read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\NotificationController::markAsRead
* @see app/Http/Controllers/Api/NotificationController.php:76
* @route '/api/notifications/{id}/read'
*/
markAsRead.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return markAsRead.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\NotificationController::markAsRead
* @see app/Http/Controllers/Api/NotificationController.php:76
* @route '/api/notifications/{id}/read'
*/
markAsRead.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\NotificationController::markAsRead
* @see app/Http/Controllers/Api/NotificationController.php:76
* @route '/api/notifications/{id}/read'
*/
const markAsReadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\NotificationController::markAsRead
* @see app/Http/Controllers/Api/NotificationController.php:76
* @route '/api/notifications/{id}/read'
*/
markAsReadForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsRead.url(args, options),
    method: 'post',
})

markAsRead.form = markAsReadForm

/**
* @see \App\Http\Controllers\Api\NotificationController::markAllAsRead
* @see app/Http/Controllers/Api/NotificationController.php:102
* @route '/api/notifications/read-all'
*/
export const markAllAsRead = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAllAsRead.url(options),
    method: 'post',
})

markAllAsRead.definition = {
    methods: ["post"],
    url: '/api/notifications/read-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\NotificationController::markAllAsRead
* @see app/Http/Controllers/Api/NotificationController.php:102
* @route '/api/notifications/read-all'
*/
markAllAsRead.url = (options?: RouteQueryOptions) => {
    return markAllAsRead.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\NotificationController::markAllAsRead
* @see app/Http/Controllers/Api/NotificationController.php:102
* @route '/api/notifications/read-all'
*/
markAllAsRead.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAllAsRead.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\NotificationController::markAllAsRead
* @see app/Http/Controllers/Api/NotificationController.php:102
* @route '/api/notifications/read-all'
*/
const markAllAsReadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAllAsRead.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\NotificationController::markAllAsRead
* @see app/Http/Controllers/Api/NotificationController.php:102
* @route '/api/notifications/read-all'
*/
markAllAsReadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAllAsRead.url(options),
    method: 'post',
})

markAllAsRead.form = markAllAsReadForm

const NotificationController = { index, markAsRead, markAllAsRead }

export default NotificationController
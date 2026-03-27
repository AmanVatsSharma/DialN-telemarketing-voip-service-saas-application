import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import requirementsEf77c0 from './requirements'
import database547c02 from './database'
import admin3611e4 from './admin'
/**
* @see \App\Http\Controllers\InstallController::index
* @see app/Http/Controllers/InstallController.php:20
* @route '/install'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/install',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstallController::index
* @see app/Http/Controllers/InstallController.php:20
* @route '/install'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::index
* @see app/Http/Controllers/InstallController.php:20
* @route '/install'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::index
* @see app/Http/Controllers/InstallController.php:20
* @route '/install'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InstallController::index
* @see app/Http/Controllers/InstallController.php:20
* @route '/install'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::index
* @see app/Http/Controllers/InstallController.php:20
* @route '/install'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::index
* @see app/Http/Controllers/InstallController.php:20
* @route '/install'
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
* @see \App\Http\Controllers\InstallController::requirements
* @see app/Http/Controllers/InstallController.php:28
* @route '/install/requirements'
*/
export const requirements = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requirements.url(options),
    method: 'get',
})

requirements.definition = {
    methods: ["get","head"],
    url: '/install/requirements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstallController::requirements
* @see app/Http/Controllers/InstallController.php:28
* @route '/install/requirements'
*/
requirements.url = (options?: RouteQueryOptions) => {
    return requirements.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::requirements
* @see app/Http/Controllers/InstallController.php:28
* @route '/install/requirements'
*/
requirements.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requirements.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::requirements
* @see app/Http/Controllers/InstallController.php:28
* @route '/install/requirements'
*/
requirements.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: requirements.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InstallController::requirements
* @see app/Http/Controllers/InstallController.php:28
* @route '/install/requirements'
*/
const requirementsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: requirements.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::requirements
* @see app/Http/Controllers/InstallController.php:28
* @route '/install/requirements'
*/
requirementsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: requirements.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::requirements
* @see app/Http/Controllers/InstallController.php:28
* @route '/install/requirements'
*/
requirementsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: requirements.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

requirements.form = requirementsForm

/**
* @see \App\Http\Controllers\InstallController::database
* @see app/Http/Controllers/InstallController.php:58
* @route '/install/database'
*/
export const database = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: database.url(options),
    method: 'get',
})

database.definition = {
    methods: ["get","head"],
    url: '/install/database',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstallController::database
* @see app/Http/Controllers/InstallController.php:58
* @route '/install/database'
*/
database.url = (options?: RouteQueryOptions) => {
    return database.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::database
* @see app/Http/Controllers/InstallController.php:58
* @route '/install/database'
*/
database.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: database.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::database
* @see app/Http/Controllers/InstallController.php:58
* @route '/install/database'
*/
database.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: database.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InstallController::database
* @see app/Http/Controllers/InstallController.php:58
* @route '/install/database'
*/
const databaseForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: database.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::database
* @see app/Http/Controllers/InstallController.php:58
* @route '/install/database'
*/
databaseForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: database.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::database
* @see app/Http/Controllers/InstallController.php:58
* @route '/install/database'
*/
databaseForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: database.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

database.form = databaseForm

/**
* @see \App\Http\Controllers\InstallController::admin
* @see app/Http/Controllers/InstallController.php:203
* @route '/install/admin'
*/
export const admin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

admin.definition = {
    methods: ["get","head"],
    url: '/install/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstallController::admin
* @see app/Http/Controllers/InstallController.php:203
* @route '/install/admin'
*/
admin.url = (options?: RouteQueryOptions) => {
    return admin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::admin
* @see app/Http/Controllers/InstallController.php:203
* @route '/install/admin'
*/
admin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::admin
* @see app/Http/Controllers/InstallController.php:203
* @route '/install/admin'
*/
admin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: admin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InstallController::admin
* @see app/Http/Controllers/InstallController.php:203
* @route '/install/admin'
*/
const adminForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::admin
* @see app/Http/Controllers/InstallController.php:203
* @route '/install/admin'
*/
adminForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::admin
* @see app/Http/Controllers/InstallController.php:203
* @route '/install/admin'
*/
adminForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: admin.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

admin.form = adminForm

/**
* @see \App\Http\Controllers\InstallController::complete
* @see app/Http/Controllers/InstallController.php:244
* @route '/install/complete'
*/
export const complete = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: complete.url(options),
    method: 'get',
})

complete.definition = {
    methods: ["get","head"],
    url: '/install/complete',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstallController::complete
* @see app/Http/Controllers/InstallController.php:244
* @route '/install/complete'
*/
complete.url = (options?: RouteQueryOptions) => {
    return complete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::complete
* @see app/Http/Controllers/InstallController.php:244
* @route '/install/complete'
*/
complete.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: complete.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::complete
* @see app/Http/Controllers/InstallController.php:244
* @route '/install/complete'
*/
complete.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: complete.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InstallController::complete
* @see app/Http/Controllers/InstallController.php:244
* @route '/install/complete'
*/
const completeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: complete.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::complete
* @see app/Http/Controllers/InstallController.php:244
* @route '/install/complete'
*/
completeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: complete.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InstallController::complete
* @see app/Http/Controllers/InstallController.php:244
* @route '/install/complete'
*/
completeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: complete.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

complete.form = completeForm

const install = {
    index: Object.assign(index, index),
    requirements: Object.assign(requirements, requirementsEf77c0),
    database: Object.assign(database, database547c02),
    admin: Object.assign(admin, admin3611e4),
    complete: Object.assign(complete, complete),
}

export default install
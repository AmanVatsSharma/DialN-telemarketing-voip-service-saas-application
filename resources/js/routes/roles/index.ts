import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RoleController::index
* @see app/Http/Controllers/RoleController.php:18
* @route '/roles'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RoleController::index
* @see app/Http/Controllers/RoleController.php:18
* @route '/roles'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::index
* @see app/Http/Controllers/RoleController.php:18
* @route '/roles'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::index
* @see app/Http/Controllers/RoleController.php:18
* @route '/roles'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RoleController::index
* @see app/Http/Controllers/RoleController.php:18
* @route '/roles'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::index
* @see app/Http/Controllers/RoleController.php:18
* @route '/roles'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::index
* @see app/Http/Controllers/RoleController.php:18
* @route '/roles'
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
* @see \App\Http\Controllers\RoleController::permissions
* @see app/Http/Controllers/RoleController.php:30
* @route '/roles/permissions'
*/
export const permissions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permissions.url(options),
    method: 'get',
})

permissions.definition = {
    methods: ["get","head"],
    url: '/roles/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RoleController::permissions
* @see app/Http/Controllers/RoleController.php:30
* @route '/roles/permissions'
*/
permissions.url = (options?: RouteQueryOptions) => {
    return permissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::permissions
* @see app/Http/Controllers/RoleController.php:30
* @route '/roles/permissions'
*/
permissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permissions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::permissions
* @see app/Http/Controllers/RoleController.php:30
* @route '/roles/permissions'
*/
permissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: permissions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RoleController::permissions
* @see app/Http/Controllers/RoleController.php:30
* @route '/roles/permissions'
*/
const permissionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: permissions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::permissions
* @see app/Http/Controllers/RoleController.php:30
* @route '/roles/permissions'
*/
permissionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: permissions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::permissions
* @see app/Http/Controllers/RoleController.php:30
* @route '/roles/permissions'
*/
permissionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: permissions.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

permissions.form = permissionsForm

/**
* @see \App\Http\Controllers\RoleController::show
* @see app/Http/Controllers/RoleController.php:42
* @route '/roles/{role}'
*/
export const show = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/roles/{role}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RoleController::show
* @see app/Http/Controllers/RoleController.php:42
* @route '/roles/{role}'
*/
show.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return show.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::show
* @see app/Http/Controllers/RoleController.php:42
* @route '/roles/{role}'
*/
show.get = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::show
* @see app/Http/Controllers/RoleController.php:42
* @route '/roles/{role}'
*/
show.head = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RoleController::show
* @see app/Http/Controllers/RoleController.php:42
* @route '/roles/{role}'
*/
const showForm = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::show
* @see app/Http/Controllers/RoleController.php:42
* @route '/roles/{role}'
*/
showForm.get = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::show
* @see app/Http/Controllers/RoleController.php:42
* @route '/roles/{role}'
*/
showForm.head = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RoleController::availablePermissions
* @see app/Http/Controllers/RoleController.php:82
* @route '/roles/{role}/available-permissions'
*/
export const availablePermissions = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availablePermissions.url(args, options),
    method: 'get',
})

availablePermissions.definition = {
    methods: ["get","head"],
    url: '/roles/{role}/available-permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RoleController::availablePermissions
* @see app/Http/Controllers/RoleController.php:82
* @route '/roles/{role}/available-permissions'
*/
availablePermissions.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return availablePermissions.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::availablePermissions
* @see app/Http/Controllers/RoleController.php:82
* @route '/roles/{role}/available-permissions'
*/
availablePermissions.get = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availablePermissions.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::availablePermissions
* @see app/Http/Controllers/RoleController.php:82
* @route '/roles/{role}/available-permissions'
*/
availablePermissions.head = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availablePermissions.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RoleController::availablePermissions
* @see app/Http/Controllers/RoleController.php:82
* @route '/roles/{role}/available-permissions'
*/
const availablePermissionsForm = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availablePermissions.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::availablePermissions
* @see app/Http/Controllers/RoleController.php:82
* @route '/roles/{role}/available-permissions'
*/
availablePermissionsForm.get = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availablePermissions.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RoleController::availablePermissions
* @see app/Http/Controllers/RoleController.php:82
* @route '/roles/{role}/available-permissions'
*/
availablePermissionsForm.head = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: availablePermissions.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

availablePermissions.form = availablePermissionsForm

/**
* @see \App\Http\Controllers\RoleController::updatePermissions
* @see app/Http/Controllers/RoleController.php:58
* @route '/roles/{role}/permissions'
*/
export const updatePermissions = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePermissions.url(args, options),
    method: 'put',
})

updatePermissions.definition = {
    methods: ["put"],
    url: '/roles/{role}/permissions',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RoleController::updatePermissions
* @see app/Http/Controllers/RoleController.php:58
* @route '/roles/{role}/permissions'
*/
updatePermissions.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return updatePermissions.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoleController::updatePermissions
* @see app/Http/Controllers/RoleController.php:58
* @route '/roles/{role}/permissions'
*/
updatePermissions.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePermissions.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RoleController::updatePermissions
* @see app/Http/Controllers/RoleController.php:58
* @route '/roles/{role}/permissions'
*/
const updatePermissionsForm = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePermissions.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RoleController::updatePermissions
* @see app/Http/Controllers/RoleController.php:58
* @route '/roles/{role}/permissions'
*/
updatePermissionsForm.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePermissions.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePermissions.form = updatePermissionsForm

const roles = {
    index: Object.assign(index, index),
    permissions: Object.assign(permissions, permissions),
    show: Object.assign(show, show),
    availablePermissions: Object.assign(availablePermissions, availablePermissions),
    updatePermissions: Object.assign(updatePermissions, updatePermissions),
}

export default roles
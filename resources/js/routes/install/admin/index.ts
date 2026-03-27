import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\InstallController::create
* @see app/Http/Controllers/InstallController.php:211
* @route '/install/admin/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/install/admin/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstallController::create
* @see app/Http/Controllers/InstallController.php:211
* @route '/install/admin/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::create
* @see app/Http/Controllers/InstallController.php:211
* @route '/install/admin/create'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InstallController::create
* @see app/Http/Controllers/InstallController.php:211
* @route '/install/admin/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InstallController::create
* @see app/Http/Controllers/InstallController.php:211
* @route '/install/admin/create'
*/
createForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: create.url(options),
    method: 'post',
})

create.form = createForm

const admin = {
    create: Object.assign(create, create),
}

export default admin
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SystemConfigController::index
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/system-config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::index
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::index
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::index
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::index
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::index
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::index
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
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
* @see \App\Http\Controllers\Admin\SystemConfigController::update
* @see app/Http/Controllers/Admin/SystemConfigController.php:23
* @route '/admin/system-config'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/system-config',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::update
* @see app/Http/Controllers/Admin/SystemConfigController.php:23
* @route '/admin/system-config'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::update
* @see app/Http/Controllers/Admin/SystemConfigController.php:23
* @route '/admin/system-config'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::update
* @see app/Http/Controllers/Admin/SystemConfigController.php:23
* @route '/admin/system-config'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::update
* @see app/Http/Controllers/Admin/SystemConfigController.php:23
* @route '/admin/system-config'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::testMail
* @see app/Http/Controllers/Admin/SystemConfigController.php:269
* @route '/admin/system-config/test-mail'
*/
export const testMail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testMail.url(options),
    method: 'post',
})

testMail.definition = {
    methods: ["post"],
    url: '/admin/system-config/test-mail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::testMail
* @see app/Http/Controllers/Admin/SystemConfigController.php:269
* @route '/admin/system-config/test-mail'
*/
testMail.url = (options?: RouteQueryOptions) => {
    return testMail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::testMail
* @see app/Http/Controllers/Admin/SystemConfigController.php:269
* @route '/admin/system-config/test-mail'
*/
testMail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testMail.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::testMail
* @see app/Http/Controllers/Admin/SystemConfigController.php:269
* @route '/admin/system-config/test-mail'
*/
const testMailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: testMail.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::testMail
* @see app/Http/Controllers/Admin/SystemConfigController.php:269
* @route '/admin/system-config/test-mail'
*/
testMailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: testMail.url(options),
    method: 'post',
})

testMail.form = testMailForm

const SystemConfigController = { index, update, testMail }

export default SystemConfigController
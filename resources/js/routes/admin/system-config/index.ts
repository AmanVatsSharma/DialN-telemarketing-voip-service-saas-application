import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

const systemConfig = {
    update: Object.assign(update, update),
    testMail: Object.assign(testMail, testMail),
}

export default systemConfig
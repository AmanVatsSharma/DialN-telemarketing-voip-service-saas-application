import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\InstallController::test
* @see app/Http/Controllers/InstallController.php:73
* @route '/install/database/test'
*/
export const test = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/install/database/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstallController::test
* @see app/Http/Controllers/InstallController.php:73
* @route '/install/database/test'
*/
test.url = (options?: RouteQueryOptions) => {
    return test.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::test
* @see app/Http/Controllers/InstallController.php:73
* @route '/install/database/test'
*/
test.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InstallController::test
* @see app/Http/Controllers/InstallController.php:73
* @route '/install/database/test'
*/
const testForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: test.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InstallController::test
* @see app/Http/Controllers/InstallController.php:73
* @route '/install/database/test'
*/
testForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: test.url(options),
    method: 'post',
})

test.form = testForm

/**
* @see \App\Http\Controllers\InstallController::migrate
* @see app/Http/Controllers/InstallController.php:116
* @route '/install/database/migrate'
*/
export const migrate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: migrate.url(options),
    method: 'post',
})

migrate.definition = {
    methods: ["post"],
    url: '/install/database/migrate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstallController::migrate
* @see app/Http/Controllers/InstallController.php:116
* @route '/install/database/migrate'
*/
migrate.url = (options?: RouteQueryOptions) => {
    return migrate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::migrate
* @see app/Http/Controllers/InstallController.php:116
* @route '/install/database/migrate'
*/
migrate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: migrate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InstallController::migrate
* @see app/Http/Controllers/InstallController.php:116
* @route '/install/database/migrate'
*/
const migrateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: migrate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InstallController::migrate
* @see app/Http/Controllers/InstallController.php:116
* @route '/install/database/migrate'
*/
migrateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: migrate.url(options),
    method: 'post',
})

migrate.form = migrateForm

const database = {
    test: Object.assign(test, test),
    migrate: Object.assign(migrate, migrate),
}

export default database
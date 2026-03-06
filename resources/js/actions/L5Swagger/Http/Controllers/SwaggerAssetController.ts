import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \L5Swagger\Http\Controllers\SwaggerAssetController::index
* @see vendor/darkaonline/l5-swagger/src/Http/Controllers/SwaggerAssetController.php:26
* @route '/docs/asset/{asset}'
*/
export const index = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/docs/asset/{asset}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \L5Swagger\Http\Controllers\SwaggerAssetController::index
* @see vendor/darkaonline/l5-swagger/src/Http/Controllers/SwaggerAssetController.php:26
* @route '/docs/asset/{asset}'
*/
index.url = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset: args }
    }

    if (Array.isArray(args)) {
        args = {
            asset: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        asset: args.asset,
    }

    return index.definition.url
            .replace('{asset}', parsedArgs.asset.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \L5Swagger\Http\Controllers\SwaggerAssetController::index
* @see vendor/darkaonline/l5-swagger/src/Http/Controllers/SwaggerAssetController.php:26
* @route '/docs/asset/{asset}'
*/
index.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \L5Swagger\Http\Controllers\SwaggerAssetController::index
* @see vendor/darkaonline/l5-swagger/src/Http/Controllers/SwaggerAssetController.php:26
* @route '/docs/asset/{asset}'
*/
index.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \L5Swagger\Http\Controllers\SwaggerAssetController::index
* @see vendor/darkaonline/l5-swagger/src/Http/Controllers/SwaggerAssetController.php:26
* @route '/docs/asset/{asset}'
*/
const indexForm = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \L5Swagger\Http\Controllers\SwaggerAssetController::index
* @see vendor/darkaonline/l5-swagger/src/Http/Controllers/SwaggerAssetController.php:26
* @route '/docs/asset/{asset}'
*/
indexForm.get = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \L5Swagger\Http\Controllers\SwaggerAssetController::index
* @see vendor/darkaonline/l5-swagger/src/Http/Controllers/SwaggerAssetController.php:26
* @route '/docs/asset/{asset}'
*/
indexForm.head = (args: { asset: string | number } | [asset: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const SwaggerAssetController = { index }

export default SwaggerAssetController
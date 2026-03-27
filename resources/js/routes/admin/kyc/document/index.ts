import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\KycReviewController::status
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
export const status = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/admin/kyc/{kyc}/document/{type}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\KycReviewController::status
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
status.url = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kyc: args[0],
            type: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kyc: typeof args.kyc === 'object'
        ? args.kyc.id
        : args.kyc,
        type: args.type,
    }

    return status.definition.url
            .replace('{kyc}', parsedArgs.kyc.toString())
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KycReviewController::status
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
status.patch = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::status
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
const statusForm = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::status
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
statusForm.patch = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

status.form = statusForm

const document = {
    status: Object.assign(status, status),
}

export default document
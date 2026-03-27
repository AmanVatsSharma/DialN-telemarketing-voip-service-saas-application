import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CallController::single
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
export const single = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: single.url(args, options),
    method: 'post',
})

single.definition = {
    methods: ["post"],
    url: '/calls/{call}/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::single
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
single.url = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { call: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            call: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call: typeof args.call === 'object'
        ? args.call.id
        : args.call,
    }

    return single.definition.url
            .replace('{call}', parsedArgs.call.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::single
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
single.post = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: single.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::single
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
const singleForm = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: single.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::single
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
singleForm.post = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: single.url(args, options),
    method: 'post',
})

single.form = singleForm

const sync = {
    single: Object.assign(single, single),
}

export default sync
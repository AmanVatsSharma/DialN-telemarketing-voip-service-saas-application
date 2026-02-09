import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AudioFileController::index
* @see app/Http/Controllers/AudioFileController.php:22
* @route '/audio-files'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/audio-files',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AudioFileController::index
* @see app/Http/Controllers/AudioFileController.php:22
* @route '/audio-files'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AudioFileController::index
* @see app/Http/Controllers/AudioFileController.php:22
* @route '/audio-files'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AudioFileController::index
* @see app/Http/Controllers/AudioFileController.php:22
* @route '/audio-files'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AudioFileController::index
* @see app/Http/Controllers/AudioFileController.php:22
* @route '/audio-files'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AudioFileController::index
* @see app/Http/Controllers/AudioFileController.php:22
* @route '/audio-files'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AudioFileController::index
* @see app/Http/Controllers/AudioFileController.php:22
* @route '/audio-files'
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
* @see \App\Http\Controllers\AudioFileController::store
* @see app/Http/Controllers/AudioFileController.php:37
* @route '/audio-files'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/audio-files',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AudioFileController::store
* @see app/Http/Controllers/AudioFileController.php:37
* @route '/audio-files'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AudioFileController::store
* @see app/Http/Controllers/AudioFileController.php:37
* @route '/audio-files'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AudioFileController::store
* @see app/Http/Controllers/AudioFileController.php:37
* @route '/audio-files'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AudioFileController::store
* @see app/Http/Controllers/AudioFileController.php:37
* @route '/audio-files'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\AudioFileController::destroy
* @see app/Http/Controllers/AudioFileController.php:62
* @route '/audio-files/{audioFile}'
*/
export const destroy = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/audio-files/{audioFile}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AudioFileController::destroy
* @see app/Http/Controllers/AudioFileController.php:62
* @route '/audio-files/{audioFile}'
*/
destroy.url = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { audioFile: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { audioFile: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            audioFile: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        audioFile: typeof args.audioFile === 'object'
        ? args.audioFile.id
        : args.audioFile,
    }

    return destroy.definition.url
            .replace('{audioFile}', parsedArgs.audioFile.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AudioFileController::destroy
* @see app/Http/Controllers/AudioFileController.php:62
* @route '/audio-files/{audioFile}'
*/
destroy.delete = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\AudioFileController::destroy
* @see app/Http/Controllers/AudioFileController.php:62
* @route '/audio-files/{audioFile}'
*/
const destroyForm = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AudioFileController::destroy
* @see app/Http/Controllers/AudioFileController.php:62
* @route '/audio-files/{audioFile}'
*/
destroyForm.delete = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\AudioFileController::stream
* @see app/Http/Controllers/AudioFileController.php:91
* @route '/audio-files/{audioFile}/stream'
*/
export const stream = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stream.url(args, options),
    method: 'get',
})

stream.definition = {
    methods: ["get","head"],
    url: '/audio-files/{audioFile}/stream',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AudioFileController::stream
* @see app/Http/Controllers/AudioFileController.php:91
* @route '/audio-files/{audioFile}/stream'
*/
stream.url = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { audioFile: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { audioFile: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            audioFile: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        audioFile: typeof args.audioFile === 'object'
        ? args.audioFile.id
        : args.audioFile,
    }

    return stream.definition.url
            .replace('{audioFile}', parsedArgs.audioFile.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AudioFileController::stream
* @see app/Http/Controllers/AudioFileController.php:91
* @route '/audio-files/{audioFile}/stream'
*/
stream.get = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stream.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AudioFileController::stream
* @see app/Http/Controllers/AudioFileController.php:91
* @route '/audio-files/{audioFile}/stream'
*/
stream.head = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stream.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AudioFileController::stream
* @see app/Http/Controllers/AudioFileController.php:91
* @route '/audio-files/{audioFile}/stream'
*/
const streamForm = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stream.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AudioFileController::stream
* @see app/Http/Controllers/AudioFileController.php:91
* @route '/audio-files/{audioFile}/stream'
*/
streamForm.get = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stream.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AudioFileController::stream
* @see app/Http/Controllers/AudioFileController.php:91
* @route '/audio-files/{audioFile}/stream'
*/
streamForm.head = (args: { audioFile: number | { id: number } } | [audioFile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stream.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stream.form = streamForm

const AudioFileController = { index, store, destroy, stream }

export default AudioFileController
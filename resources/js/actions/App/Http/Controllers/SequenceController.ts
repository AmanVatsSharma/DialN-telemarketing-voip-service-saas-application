import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SequenceController::index
* @see app/Http/Controllers/SequenceController.php:15
* @route '/sequences'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sequences',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SequenceController::index
* @see app/Http/Controllers/SequenceController.php:15
* @route '/sequences'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SequenceController::index
* @see app/Http/Controllers/SequenceController.php:15
* @route '/sequences'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::index
* @see app/Http/Controllers/SequenceController.php:15
* @route '/sequences'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SequenceController::index
* @see app/Http/Controllers/SequenceController.php:15
* @route '/sequences'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::index
* @see app/Http/Controllers/SequenceController.php:15
* @route '/sequences'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::index
* @see app/Http/Controllers/SequenceController.php:15
* @route '/sequences'
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
* @see \App\Http\Controllers\SequenceController::create
* @see app/Http/Controllers/SequenceController.php:91
* @route '/sequences/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sequences/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SequenceController::create
* @see app/Http/Controllers/SequenceController.php:91
* @route '/sequences/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SequenceController::create
* @see app/Http/Controllers/SequenceController.php:91
* @route '/sequences/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::create
* @see app/Http/Controllers/SequenceController.php:91
* @route '/sequences/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SequenceController::create
* @see app/Http/Controllers/SequenceController.php:91
* @route '/sequences/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::create
* @see app/Http/Controllers/SequenceController.php:91
* @route '/sequences/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::create
* @see app/Http/Controllers/SequenceController.php:91
* @route '/sequences/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\SequenceController::show
* @see app/Http/Controllers/SequenceController.php:99
* @route '/sequences/{sequence}'
*/
export const show = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sequences/{sequence}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SequenceController::show
* @see app/Http/Controllers/SequenceController.php:99
* @route '/sequences/{sequence}'
*/
show.url = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sequence: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { sequence: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            sequence: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sequence: typeof args.sequence === 'object'
        ? args.sequence.id
        : args.sequence,
    }

    return show.definition.url
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SequenceController::show
* @see app/Http/Controllers/SequenceController.php:99
* @route '/sequences/{sequence}'
*/
show.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::show
* @see app/Http/Controllers/SequenceController.php:99
* @route '/sequences/{sequence}'
*/
show.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SequenceController::show
* @see app/Http/Controllers/SequenceController.php:99
* @route '/sequences/{sequence}'
*/
const showForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::show
* @see app/Http/Controllers/SequenceController.php:99
* @route '/sequences/{sequence}'
*/
showForm.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::show
* @see app/Http/Controllers/SequenceController.php:99
* @route '/sequences/{sequence}'
*/
showForm.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\SequenceController::edit
* @see app/Http/Controllers/SequenceController.php:187
* @route '/sequences/{sequence}/edit'
*/
export const edit = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sequences/{sequence}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SequenceController::edit
* @see app/Http/Controllers/SequenceController.php:187
* @route '/sequences/{sequence}/edit'
*/
edit.url = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sequence: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { sequence: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            sequence: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sequence: typeof args.sequence === 'object'
        ? args.sequence.id
        : args.sequence,
    }

    return edit.definition.url
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SequenceController::edit
* @see app/Http/Controllers/SequenceController.php:187
* @route '/sequences/{sequence}/edit'
*/
edit.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::edit
* @see app/Http/Controllers/SequenceController.php:187
* @route '/sequences/{sequence}/edit'
*/
edit.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SequenceController::edit
* @see app/Http/Controllers/SequenceController.php:187
* @route '/sequences/{sequence}/edit'
*/
const editForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::edit
* @see app/Http/Controllers/SequenceController.php:187
* @route '/sequences/{sequence}/edit'
*/
editForm.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SequenceController::edit
* @see app/Http/Controllers/SequenceController.php:187
* @route '/sequences/{sequence}/edit'
*/
editForm.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

const SequenceController = { index, create, show, edit }

export default SequenceController
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SequenceController::index
* @see app/Http/Controllers/Api/SequenceController.php:23
* @route '/api/v1/sequences'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/sequences',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::index
* @see app/Http/Controllers/Api/SequenceController.php:23
* @route '/api/v1/sequences'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::index
* @see app/Http/Controllers/Api/SequenceController.php:23
* @route '/api/v1/sequences'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::index
* @see app/Http/Controllers/Api/SequenceController.php:23
* @route '/api/v1/sequences'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::index
* @see app/Http/Controllers/Api/SequenceController.php:23
* @route '/api/v1/sequences'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::index
* @see app/Http/Controllers/Api/SequenceController.php:23
* @route '/api/v1/sequences'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::index
* @see app/Http/Controllers/Api/SequenceController.php:23
* @route '/api/v1/sequences'
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
* @see \App\Http\Controllers\Api\SequenceController::store
* @see app/Http/Controllers/Api/SequenceController.php:54
* @route '/api/v1/sequences'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/sequences',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::store
* @see app/Http/Controllers/Api/SequenceController.php:54
* @route '/api/v1/sequences'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::store
* @see app/Http/Controllers/Api/SequenceController.php:54
* @route '/api/v1/sequences'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::store
* @see app/Http/Controllers/Api/SequenceController.php:54
* @route '/api/v1/sequences'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::store
* @see app/Http/Controllers/Api/SequenceController.php:54
* @route '/api/v1/sequences'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\SequenceController::show
* @see app/Http/Controllers/Api/SequenceController.php:40
* @route '/api/v1/sequences/{sequence}'
*/
export const show = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/sequences/{sequence}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::show
* @see app/Http/Controllers/Api/SequenceController.php:40
* @route '/api/v1/sequences/{sequence}'
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
* @see \App\Http\Controllers\Api\SequenceController::show
* @see app/Http/Controllers/Api/SequenceController.php:40
* @route '/api/v1/sequences/{sequence}'
*/
show.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::show
* @see app/Http/Controllers/Api/SequenceController.php:40
* @route '/api/v1/sequences/{sequence}'
*/
show.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::show
* @see app/Http/Controllers/Api/SequenceController.php:40
* @route '/api/v1/sequences/{sequence}'
*/
const showForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::show
* @see app/Http/Controllers/Api/SequenceController.php:40
* @route '/api/v1/sequences/{sequence}'
*/
showForm.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::show
* @see app/Http/Controllers/Api/SequenceController.php:40
* @route '/api/v1/sequences/{sequence}'
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
* @see \App\Http\Controllers\Api\SequenceController::update
* @see app/Http/Controllers/Api/SequenceController.php:125
* @route '/api/v1/sequences/{sequence}'
*/
export const update = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/sequences/{sequence}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::update
* @see app/Http/Controllers/Api/SequenceController.php:125
* @route '/api/v1/sequences/{sequence}'
*/
update.url = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::update
* @see app/Http/Controllers/Api/SequenceController.php:125
* @route '/api/v1/sequences/{sequence}'
*/
update.put = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::update
* @see app/Http/Controllers/Api/SequenceController.php:125
* @route '/api/v1/sequences/{sequence}'
*/
const updateForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::update
* @see app/Http/Controllers/Api/SequenceController.php:125
* @route '/api/v1/sequences/{sequence}'
*/
updateForm.put = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\SequenceController::destroy
* @see app/Http/Controllers/Api/SequenceController.php:202
* @route '/api/v1/sequences/{sequence}'
*/
export const destroy = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/sequences/{sequence}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::destroy
* @see app/Http/Controllers/Api/SequenceController.php:202
* @route '/api/v1/sequences/{sequence}'
*/
destroy.url = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::destroy
* @see app/Http/Controllers/Api/SequenceController.php:202
* @route '/api/v1/sequences/{sequence}'
*/
destroy.delete = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::destroy
* @see app/Http/Controllers/Api/SequenceController.php:202
* @route '/api/v1/sequences/{sequence}'
*/
const destroyForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::destroy
* @see app/Http/Controllers/Api/SequenceController.php:202
* @route '/api/v1/sequences/{sequence}'
*/
destroyForm.delete = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\SequenceController::activate
* @see app/Http/Controllers/Api/SequenceController.php:227
* @route '/api/v1/sequences/{sequence}/activate'
*/
export const activate = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

activate.definition = {
    methods: ["post"],
    url: '/api/v1/sequences/{sequence}/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::activate
* @see app/Http/Controllers/Api/SequenceController.php:227
* @route '/api/v1/sequences/{sequence}/activate'
*/
activate.url = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return activate.definition.url
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::activate
* @see app/Http/Controllers/Api/SequenceController.php:227
* @route '/api/v1/sequences/{sequence}/activate'
*/
activate.post = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::activate
* @see app/Http/Controllers/Api/SequenceController.php:227
* @route '/api/v1/sequences/{sequence}/activate'
*/
const activateForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: activate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::activate
* @see app/Http/Controllers/Api/SequenceController.php:227
* @route '/api/v1/sequences/{sequence}/activate'
*/
activateForm.post = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: activate.url(args, options),
    method: 'post',
})

activate.form = activateForm

/**
* @see \App\Http\Controllers\Api\SequenceController::deactivate
* @see app/Http/Controllers/Api/SequenceController.php:242
* @route '/api/v1/sequences/{sequence}/deactivate'
*/
export const deactivate = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deactivate.url(args, options),
    method: 'post',
})

deactivate.definition = {
    methods: ["post"],
    url: '/api/v1/sequences/{sequence}/deactivate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::deactivate
* @see app/Http/Controllers/Api/SequenceController.php:242
* @route '/api/v1/sequences/{sequence}/deactivate'
*/
deactivate.url = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return deactivate.definition.url
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::deactivate
* @see app/Http/Controllers/Api/SequenceController.php:242
* @route '/api/v1/sequences/{sequence}/deactivate'
*/
deactivate.post = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deactivate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::deactivate
* @see app/Http/Controllers/Api/SequenceController.php:242
* @route '/api/v1/sequences/{sequence}/deactivate'
*/
const deactivateForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deactivate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::deactivate
* @see app/Http/Controllers/Api/SequenceController.php:242
* @route '/api/v1/sequences/{sequence}/deactivate'
*/
deactivateForm.post = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deactivate.url(args, options),
    method: 'post',
})

deactivate.form = deactivateForm

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollments
* @see app/Http/Controllers/Api/SequenceController.php:257
* @route '/api/v1/sequences/{sequence}/enrollments'
*/
export const enrollments = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: enrollments.url(args, options),
    method: 'get',
})

enrollments.definition = {
    methods: ["get","head"],
    url: '/api/v1/sequences/{sequence}/enrollments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollments
* @see app/Http/Controllers/Api/SequenceController.php:257
* @route '/api/v1/sequences/{sequence}/enrollments'
*/
enrollments.url = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return enrollments.definition.url
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollments
* @see app/Http/Controllers/Api/SequenceController.php:257
* @route '/api/v1/sequences/{sequence}/enrollments'
*/
enrollments.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: enrollments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollments
* @see app/Http/Controllers/Api/SequenceController.php:257
* @route '/api/v1/sequences/{sequence}/enrollments'
*/
enrollments.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: enrollments.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollments
* @see app/Http/Controllers/Api/SequenceController.php:257
* @route '/api/v1/sequences/{sequence}/enrollments'
*/
const enrollmentsForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: enrollments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollments
* @see app/Http/Controllers/Api/SequenceController.php:257
* @route '/api/v1/sequences/{sequence}/enrollments'
*/
enrollmentsForm.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: enrollments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollments
* @see app/Http/Controllers/Api/SequenceController.php:257
* @route '/api/v1/sequences/{sequence}/enrollments'
*/
enrollmentsForm.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: enrollments.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

enrollments.form = enrollmentsForm

/**
* @see \App\Http\Controllers\Api\SequenceController::analytics
* @see app/Http/Controllers/Api/SequenceController.php:275
* @route '/api/v1/sequences/{sequence}/analytics'
*/
export const analytics = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(args, options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/api/v1/sequences/{sequence}/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::analytics
* @see app/Http/Controllers/Api/SequenceController.php:275
* @route '/api/v1/sequences/{sequence}/analytics'
*/
analytics.url = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return analytics.definition.url
            .replace('{sequence}', parsedArgs.sequence.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::analytics
* @see app/Http/Controllers/Api/SequenceController.php:275
* @route '/api/v1/sequences/{sequence}/analytics'
*/
analytics.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::analytics
* @see app/Http/Controllers/Api/SequenceController.php:275
* @route '/api/v1/sequences/{sequence}/analytics'
*/
analytics.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::analytics
* @see app/Http/Controllers/Api/SequenceController.php:275
* @route '/api/v1/sequences/{sequence}/analytics'
*/
const analyticsForm = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::analytics
* @see app/Http/Controllers/Api/SequenceController.php:275
* @route '/api/v1/sequences/{sequence}/analytics'
*/
analyticsForm.get = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::analytics
* @see app/Http/Controllers/Api/SequenceController.php:275
* @route '/api/v1/sequences/{sequence}/analytics'
*/
analyticsForm.head = (args: { sequence: number | { id: number } } | [sequence: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

analytics.form = analyticsForm

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollContact
* @see app/Http/Controllers/Api/SequenceController.php:290
* @route '/api/v1/contacts/{contact}/enroll'
*/
export const enrollContact = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enrollContact.url(args, options),
    method: 'post',
})

enrollContact.definition = {
    methods: ["post"],
    url: '/api/v1/contacts/{contact}/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollContact
* @see app/Http/Controllers/Api/SequenceController.php:290
* @route '/api/v1/contacts/{contact}/enroll'
*/
enrollContact.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return enrollContact.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollContact
* @see app/Http/Controllers/Api/SequenceController.php:290
* @route '/api/v1/contacts/{contact}/enroll'
*/
enrollContact.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enrollContact.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollContact
* @see app/Http/Controllers/Api/SequenceController.php:290
* @route '/api/v1/contacts/{contact}/enroll'
*/
const enrollContactForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enrollContact.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::enrollContact
* @see app/Http/Controllers/Api/SequenceController.php:290
* @route '/api/v1/contacts/{contact}/enroll'
*/
enrollContactForm.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enrollContact.url(args, options),
    method: 'post',
})

enrollContact.form = enrollContactForm

/**
* @see \App\Http\Controllers\Api\SequenceController::pauseEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:337
* @route '/api/v1/enrollments/{enrollment}/pause'
*/
export const pauseEnrollment = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pauseEnrollment.url(args, options),
    method: 'post',
})

pauseEnrollment.definition = {
    methods: ["post"],
    url: '/api/v1/enrollments/{enrollment}/pause',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::pauseEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:337
* @route '/api/v1/enrollments/{enrollment}/pause'
*/
pauseEnrollment.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { enrollment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            enrollment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        enrollment: typeof args.enrollment === 'object'
        ? args.enrollment.id
        : args.enrollment,
    }

    return pauseEnrollment.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::pauseEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:337
* @route '/api/v1/enrollments/{enrollment}/pause'
*/
pauseEnrollment.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pauseEnrollment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::pauseEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:337
* @route '/api/v1/enrollments/{enrollment}/pause'
*/
const pauseEnrollmentForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pauseEnrollment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::pauseEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:337
* @route '/api/v1/enrollments/{enrollment}/pause'
*/
pauseEnrollmentForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pauseEnrollment.url(args, options),
    method: 'post',
})

pauseEnrollment.form = pauseEnrollmentForm

/**
* @see \App\Http\Controllers\Api\SequenceController::resumeEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:352
* @route '/api/v1/enrollments/{enrollment}/resume'
*/
export const resumeEnrollment = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resumeEnrollment.url(args, options),
    method: 'post',
})

resumeEnrollment.definition = {
    methods: ["post"],
    url: '/api/v1/enrollments/{enrollment}/resume',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::resumeEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:352
* @route '/api/v1/enrollments/{enrollment}/resume'
*/
resumeEnrollment.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { enrollment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            enrollment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        enrollment: typeof args.enrollment === 'object'
        ? args.enrollment.id
        : args.enrollment,
    }

    return resumeEnrollment.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::resumeEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:352
* @route '/api/v1/enrollments/{enrollment}/resume'
*/
resumeEnrollment.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resumeEnrollment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::resumeEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:352
* @route '/api/v1/enrollments/{enrollment}/resume'
*/
const resumeEnrollmentForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resumeEnrollment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::resumeEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:352
* @route '/api/v1/enrollments/{enrollment}/resume'
*/
resumeEnrollmentForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resumeEnrollment.url(args, options),
    method: 'post',
})

resumeEnrollment.form = resumeEnrollmentForm

/**
* @see \App\Http\Controllers\Api\SequenceController::stopEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:367
* @route '/api/v1/enrollments/{enrollment}/stop'
*/
export const stopEnrollment = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stopEnrollment.url(args, options),
    method: 'post',
})

stopEnrollment.definition = {
    methods: ["post"],
    url: '/api/v1/enrollments/{enrollment}/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SequenceController::stopEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:367
* @route '/api/v1/enrollments/{enrollment}/stop'
*/
stopEnrollment.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { enrollment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            enrollment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        enrollment: typeof args.enrollment === 'object'
        ? args.enrollment.id
        : args.enrollment,
    }

    return stopEnrollment.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SequenceController::stopEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:367
* @route '/api/v1/enrollments/{enrollment}/stop'
*/
stopEnrollment.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stopEnrollment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::stopEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:367
* @route '/api/v1/enrollments/{enrollment}/stop'
*/
const stopEnrollmentForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stopEnrollment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SequenceController::stopEnrollment
* @see app/Http/Controllers/Api/SequenceController.php:367
* @route '/api/v1/enrollments/{enrollment}/stop'
*/
stopEnrollmentForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stopEnrollment.url(args, options),
    method: 'post',
})

stopEnrollment.form = stopEnrollmentForm

const SequenceController = { index, store, show, update, destroy, activate, deactivate, enrollments, analytics, enrollContact, pauseEnrollment, resumeEnrollment, stopEnrollment }

export default SequenceController
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ContactController::index
* @see app/Http/Controllers/Api/V1/ContactController.php:35
* @route '/api/v1/contacts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/contacts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::index
* @see app/Http/Controllers/Api/V1/ContactController.php:35
* @route '/api/v1/contacts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::index
* @see app/Http/Controllers/Api/V1/ContactController.php:35
* @route '/api/v1/contacts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::index
* @see app/Http/Controllers/Api/V1/ContactController.php:35
* @route '/api/v1/contacts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::index
* @see app/Http/Controllers/Api/V1/ContactController.php:35
* @route '/api/v1/contacts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::index
* @see app/Http/Controllers/Api/V1/ContactController.php:35
* @route '/api/v1/contacts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::index
* @see app/Http/Controllers/Api/V1/ContactController.php:35
* @route '/api/v1/contacts'
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
* @see \App\Http\Controllers\Api\V1\ContactController::store
* @see app/Http/Controllers/Api/V1/ContactController.php:83
* @route '/api/v1/contacts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/contacts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::store
* @see app/Http/Controllers/Api/V1/ContactController.php:83
* @route '/api/v1/contacts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::store
* @see app/Http/Controllers/Api/V1/ContactController.php:83
* @route '/api/v1/contacts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::store
* @see app/Http/Controllers/Api/V1/ContactController.php:83
* @route '/api/v1/contacts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::store
* @see app/Http/Controllers/Api/V1/ContactController.php:83
* @route '/api/v1/contacts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\V1\ContactController::show
* @see app/Http/Controllers/Api/V1/ContactController.php:128
* @route '/api/v1/contacts/{contact}'
*/
export const show = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/contacts/{contact}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::show
* @see app/Http/Controllers/Api/V1/ContactController.php:128
* @route '/api/v1/contacts/{contact}'
*/
show.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::show
* @see app/Http/Controllers/Api/V1/ContactController.php:128
* @route '/api/v1/contacts/{contact}'
*/
show.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::show
* @see app/Http/Controllers/Api/V1/ContactController.php:128
* @route '/api/v1/contacts/{contact}'
*/
show.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::show
* @see app/Http/Controllers/Api/V1/ContactController.php:128
* @route '/api/v1/contacts/{contact}'
*/
const showForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::show
* @see app/Http/Controllers/Api/V1/ContactController.php:128
* @route '/api/v1/contacts/{contact}'
*/
showForm.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::show
* @see app/Http/Controllers/Api/V1/ContactController.php:128
* @route '/api/v1/contacts/{contact}'
*/
showForm.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\V1\ContactController::update
* @see app/Http/Controllers/Api/V1/ContactController.php:148
* @route '/api/v1/contacts/{contact}'
*/
export const update = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/contacts/{contact}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::update
* @see app/Http/Controllers/Api/V1/ContactController.php:148
* @route '/api/v1/contacts/{contact}'
*/
update.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::update
* @see app/Http/Controllers/Api/V1/ContactController.php:148
* @route '/api/v1/contacts/{contact}'
*/
update.put = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::update
* @see app/Http/Controllers/Api/V1/ContactController.php:148
* @route '/api/v1/contacts/{contact}'
*/
const updateForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::update
* @see app/Http/Controllers/Api/V1/ContactController.php:148
* @route '/api/v1/contacts/{contact}'
*/
updateForm.put = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\V1\ContactController::destroy
* @see app/Http/Controllers/Api/V1/ContactController.php:188
* @route '/api/v1/contacts/{contact}'
*/
export const destroy = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/contacts/{contact}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::destroy
* @see app/Http/Controllers/Api/V1/ContactController.php:188
* @route '/api/v1/contacts/{contact}'
*/
destroy.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::destroy
* @see app/Http/Controllers/Api/V1/ContactController.php:188
* @route '/api/v1/contacts/{contact}'
*/
destroy.delete = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::destroy
* @see app/Http/Controllers/Api/V1/ContactController.php:188
* @route '/api/v1/contacts/{contact}'
*/
const destroyForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::destroy
* @see app/Http/Controllers/Api/V1/ContactController.php:188
* @route '/api/v1/contacts/{contact}'
*/
destroyForm.delete = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\V1\ContactController::bulkCreate
* @see app/Http/Controllers/Api/V1/ContactController.php:218
* @route '/api/v1/contacts/bulk'
*/
export const bulkCreate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkCreate.url(options),
    method: 'post',
})

bulkCreate.definition = {
    methods: ["post"],
    url: '/api/v1/contacts/bulk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkCreate
* @see app/Http/Controllers/Api/V1/ContactController.php:218
* @route '/api/v1/contacts/bulk'
*/
bulkCreate.url = (options?: RouteQueryOptions) => {
    return bulkCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkCreate
* @see app/Http/Controllers/Api/V1/ContactController.php:218
* @route '/api/v1/contacts/bulk'
*/
bulkCreate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkCreate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkCreate
* @see app/Http/Controllers/Api/V1/ContactController.php:218
* @route '/api/v1/contacts/bulk'
*/
const bulkCreateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkCreate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkCreate
* @see app/Http/Controllers/Api/V1/ContactController.php:218
* @route '/api/v1/contacts/bulk'
*/
bulkCreateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkCreate.url(options),
    method: 'post',
})

bulkCreate.form = bulkCreateForm

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkUpdate
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
export const bulkUpdate = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: bulkUpdate.url(options),
    method: 'put',
})

bulkUpdate.definition = {
    methods: ["put"],
    url: '/api/v1/contacts/bulk',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkUpdate
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
bulkUpdate.url = (options?: RouteQueryOptions) => {
    return bulkUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkUpdate
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
bulkUpdate.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: bulkUpdate.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkUpdate
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
const bulkUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkUpdate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkUpdate
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
bulkUpdateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkUpdate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

bulkUpdate.form = bulkUpdateForm

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkDelete
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
export const bulkDelete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDelete.url(options),
    method: 'delete',
})

bulkDelete.definition = {
    methods: ["delete"],
    url: '/api/v1/contacts/bulk',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkDelete
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
bulkDelete.url = (options?: RouteQueryOptions) => {
    return bulkDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkDelete
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
bulkDelete.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDelete.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkDelete
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
const bulkDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDelete.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::bulkDelete
* @see app/Http/Controllers/Api/V1/ContactController.php:0
* @route '/api/v1/contacts/bulk'
*/
bulkDeleteForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDelete.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

bulkDelete.form = bulkDeleteForm

/**
* @see \App\Http\Controllers\Api\V1\ContactController::exportCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:274
* @route '/api/v1/contacts/export/csv'
*/
export const exportCsv = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCsv.url(options),
    method: 'get',
})

exportCsv.definition = {
    methods: ["get","head"],
    url: '/api/v1/contacts/export/csv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::exportCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:274
* @route '/api/v1/contacts/export/csv'
*/
exportCsv.url = (options?: RouteQueryOptions) => {
    return exportCsv.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::exportCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:274
* @route '/api/v1/contacts/export/csv'
*/
exportCsv.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCsv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::exportCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:274
* @route '/api/v1/contacts/export/csv'
*/
exportCsv.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCsv.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::exportCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:274
* @route '/api/v1/contacts/export/csv'
*/
const exportCsvForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCsv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::exportCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:274
* @route '/api/v1/contacts/export/csv'
*/
exportCsvForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCsv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::exportCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:274
* @route '/api/v1/contacts/export/csv'
*/
exportCsvForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCsv.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportCsv.form = exportCsvForm

/**
* @see \App\Http\Controllers\Api\V1\ContactController::importCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:316
* @route '/api/v1/contacts/import/csv'
*/
export const importCsv = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importCsv.url(options),
    method: 'post',
})

importCsv.definition = {
    methods: ["post"],
    url: '/api/v1/contacts/import/csv',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::importCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:316
* @route '/api/v1/contacts/import/csv'
*/
importCsv.url = (options?: RouteQueryOptions) => {
    return importCsv.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::importCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:316
* @route '/api/v1/contacts/import/csv'
*/
importCsv.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importCsv.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::importCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:316
* @route '/api/v1/contacts/import/csv'
*/
const importCsvForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importCsv.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ContactController::importCsv
* @see app/Http/Controllers/Api/V1/ContactController.php:316
* @route '/api/v1/contacts/import/csv'
*/
importCsvForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importCsv.url(options),
    method: 'post',
})

importCsv.form = importCsvForm

const ContactController = { index, store, show, update, destroy, bulkCreate, bulkUpdate, bulkDelete, exportCsv, importCsv }

export default ContactController
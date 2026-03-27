import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import importMethod7367d2 from './import'
import bulk from './bulk'
/**
* @see \App\Http\Controllers\ContactController::index
* @see app/Http/Controllers/ContactController.php:32
* @route '/contacts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/contacts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::index
* @see app/Http/Controllers/ContactController.php:32
* @route '/contacts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::index
* @see app/Http/Controllers/ContactController.php:32
* @route '/contacts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::index
* @see app/Http/Controllers/ContactController.php:32
* @route '/contacts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::index
* @see app/Http/Controllers/ContactController.php:32
* @route '/contacts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::index
* @see app/Http/Controllers/ContactController.php:32
* @route '/contacts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::index
* @see app/Http/Controllers/ContactController.php:32
* @route '/contacts'
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
* @see \App\Http\Controllers\ContactController::create
* @see app/Http/Controllers/ContactController.php:114
* @route '/contacts/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/contacts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::create
* @see app/Http/Controllers/ContactController.php:114
* @route '/contacts/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::create
* @see app/Http/Controllers/ContactController.php:114
* @route '/contacts/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::create
* @see app/Http/Controllers/ContactController.php:114
* @route '/contacts/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::create
* @see app/Http/Controllers/ContactController.php:114
* @route '/contacts/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::create
* @see app/Http/Controllers/ContactController.php:114
* @route '/contacts/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::create
* @see app/Http/Controllers/ContactController.php:114
* @route '/contacts/create'
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
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:132
* @route '/contacts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/contacts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:132
* @route '/contacts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:132
* @route '/contacts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:132
* @route '/contacts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:132
* @route '/contacts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:197
* @route '/contacts/{contact}'
*/
export const show = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/contacts/{contact}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:197
* @route '/contacts/{contact}'
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
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:197
* @route '/contacts/{contact}'
*/
show.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:197
* @route '/contacts/{contact}'
*/
show.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:197
* @route '/contacts/{contact}'
*/
const showForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:197
* @route '/contacts/{contact}'
*/
showForm.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:197
* @route '/contacts/{contact}'
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
* @see \App\Http\Controllers\ContactController::edit
* @see app/Http/Controllers/ContactController.php:253
* @route '/contacts/{contact}/edit'
*/
export const edit = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/contacts/{contact}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::edit
* @see app/Http/Controllers/ContactController.php:253
* @route '/contacts/{contact}/edit'
*/
edit.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::edit
* @see app/Http/Controllers/ContactController.php:253
* @route '/contacts/{contact}/edit'
*/
edit.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::edit
* @see app/Http/Controllers/ContactController.php:253
* @route '/contacts/{contact}/edit'
*/
edit.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::edit
* @see app/Http/Controllers/ContactController.php:253
* @route '/contacts/{contact}/edit'
*/
const editForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::edit
* @see app/Http/Controllers/ContactController.php:253
* @route '/contacts/{contact}/edit'
*/
editForm.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::edit
* @see app/Http/Controllers/ContactController.php:253
* @route '/contacts/{contact}/edit'
*/
editForm.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\ContactController::update
* @see app/Http/Controllers/ContactController.php:274
* @route '/contacts/{contact}'
*/
export const update = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/contacts/{contact}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ContactController::update
* @see app/Http/Controllers/ContactController.php:274
* @route '/contacts/{contact}'
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
* @see \App\Http\Controllers\ContactController::update
* @see app/Http/Controllers/ContactController.php:274
* @route '/contacts/{contact}'
*/
update.put = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ContactController::update
* @see app/Http/Controllers/ContactController.php:274
* @route '/contacts/{contact}'
*/
update.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ContactController::update
* @see app/Http/Controllers/ContactController.php:274
* @route '/contacts/{contact}'
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
* @see \App\Http\Controllers\ContactController::update
* @see app/Http/Controllers/ContactController.php:274
* @route '/contacts/{contact}'
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

/**
* @see \App\Http\Controllers\ContactController::update
* @see app/Http/Controllers/ContactController.php:274
* @route '/contacts/{contact}'
*/
updateForm.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\ContactController::destroy
* @see app/Http/Controllers/ContactController.php:343
* @route '/contacts/{contact}'
*/
export const destroy = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/contacts/{contact}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ContactController::destroy
* @see app/Http/Controllers/ContactController.php:343
* @route '/contacts/{contact}'
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
* @see \App\Http\Controllers\ContactController::destroy
* @see app/Http/Controllers/ContactController.php:343
* @route '/contacts/{contact}'
*/
destroy.delete = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ContactController::destroy
* @see app/Http/Controllers/ContactController.php:343
* @route '/contacts/{contact}'
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
* @see \App\Http\Controllers\ContactController::destroy
* @see app/Http/Controllers/ContactController.php:343
* @route '/contacts/{contact}'
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
* @see \App\Http\Controllers\ContactController::importMethod
* @see app/Http/Controllers/ContactController.php:360
* @route '/contacts-import'
*/
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: importMethod.url(options),
    method: 'get',
})

importMethod.definition = {
    methods: ["get","head"],
    url: '/contacts-import',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::importMethod
* @see app/Http/Controllers/ContactController.php:360
* @route '/contacts-import'
*/
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::importMethod
* @see app/Http/Controllers/ContactController.php:360
* @route '/contacts-import'
*/
importMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: importMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::importMethod
* @see app/Http/Controllers/ContactController.php:360
* @route '/contacts-import'
*/
importMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: importMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::importMethod
* @see app/Http/Controllers/ContactController.php:360
* @route '/contacts-import'
*/
const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: importMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::importMethod
* @see app/Http/Controllers/ContactController.php:360
* @route '/contacts-import'
*/
importMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: importMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::importMethod
* @see app/Http/Controllers/ContactController.php:360
* @route '/contacts-import'
*/
importMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: importMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

importMethod.form = importMethodForm

/**
* @see \App\Http\Controllers\ContactController::exportMethod
* @see app/Http/Controllers/ContactController.php:620
* @route '/contacts-export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/contacts-export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::exportMethod
* @see app/Http/Controllers/ContactController.php:620
* @route '/contacts-export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::exportMethod
* @see app/Http/Controllers/ContactController.php:620
* @route '/contacts-export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::exportMethod
* @see app/Http/Controllers/ContactController.php:620
* @route '/contacts-export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::exportMethod
* @see app/Http/Controllers/ContactController.php:620
* @route '/contacts-export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::exportMethod
* @see app/Http/Controllers/ContactController.php:620
* @route '/contacts-export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::exportMethod
* @see app/Http/Controllers/ContactController.php:620
* @route '/contacts-export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

/**
* @see \App\Http\Controllers\ContactController::validatePhoneNumbers
* @see app/Http/Controllers/ContactController.php:901
* @route '/contacts/validate-phone-numbers'
*/
export const validatePhoneNumbers = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validatePhoneNumbers.url(options),
    method: 'post',
})

validatePhoneNumbers.definition = {
    methods: ["post"],
    url: '/contacts/validate-phone-numbers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::validatePhoneNumbers
* @see app/Http/Controllers/ContactController.php:901
* @route '/contacts/validate-phone-numbers'
*/
validatePhoneNumbers.url = (options?: RouteQueryOptions) => {
    return validatePhoneNumbers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::validatePhoneNumbers
* @see app/Http/Controllers/ContactController.php:901
* @route '/contacts/validate-phone-numbers'
*/
validatePhoneNumbers.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validatePhoneNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::validatePhoneNumbers
* @see app/Http/Controllers/ContactController.php:901
* @route '/contacts/validate-phone-numbers'
*/
const validatePhoneNumbersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validatePhoneNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::validatePhoneNumbers
* @see app/Http/Controllers/ContactController.php:901
* @route '/contacts/validate-phone-numbers'
*/
validatePhoneNumbersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validatePhoneNumbers.url(options),
    method: 'post',
})

validatePhoneNumbers.form = validatePhoneNumbersForm

const contacts = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    import: Object.assign(importMethod, importMethod7367d2),
    export: Object.assign(exportMethod, exportMethod),
    bulk: Object.assign(bulk, bulk),
    validatePhoneNumbers: Object.assign(validatePhoneNumbers, validatePhoneNumbers),
}

export default contacts
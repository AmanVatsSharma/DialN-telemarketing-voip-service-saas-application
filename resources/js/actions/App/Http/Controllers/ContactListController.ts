import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ContactListController::index
* @see app/Http/Controllers/ContactListController.php:20
* @route '/contact-lists'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/contact-lists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactListController::index
* @see app/Http/Controllers/ContactListController.php:20
* @route '/contact-lists'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::index
* @see app/Http/Controllers/ContactListController.php:20
* @route '/contact-lists'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::index
* @see app/Http/Controllers/ContactListController.php:20
* @route '/contact-lists'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactListController::index
* @see app/Http/Controllers/ContactListController.php:20
* @route '/contact-lists'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::index
* @see app/Http/Controllers/ContactListController.php:20
* @route '/contact-lists'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::index
* @see app/Http/Controllers/ContactListController.php:20
* @route '/contact-lists'
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
* @see \App\Http\Controllers\ContactListController::create
* @see app/Http/Controllers/ContactListController.php:35
* @route '/contact-lists/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/contact-lists/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactListController::create
* @see app/Http/Controllers/ContactListController.php:35
* @route '/contact-lists/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::create
* @see app/Http/Controllers/ContactListController.php:35
* @route '/contact-lists/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::create
* @see app/Http/Controllers/ContactListController.php:35
* @route '/contact-lists/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactListController::create
* @see app/Http/Controllers/ContactListController.php:35
* @route '/contact-lists/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::create
* @see app/Http/Controllers/ContactListController.php:35
* @route '/contact-lists/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::create
* @see app/Http/Controllers/ContactListController.php:35
* @route '/contact-lists/create'
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
* @see \App\Http\Controllers\ContactListController::store
* @see app/Http/Controllers/ContactListController.php:43
* @route '/contact-lists'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/contact-lists',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactListController::store
* @see app/Http/Controllers/ContactListController.php:43
* @route '/contact-lists'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::store
* @see app/Http/Controllers/ContactListController.php:43
* @route '/contact-lists'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::store
* @see app/Http/Controllers/ContactListController.php:43
* @route '/contact-lists'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::store
* @see app/Http/Controllers/ContactListController.php:43
* @route '/contact-lists'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ContactListController::show
* @see app/Http/Controllers/ContactListController.php:69
* @route '/contact-lists/{contact_list}'
*/
export const show = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/contact-lists/{contact_list}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactListController::show
* @see app/Http/Controllers/ContactListController.php:69
* @route '/contact-lists/{contact_list}'
*/
show.url = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact_list: args }
    }

    if (Array.isArray(args)) {
        args = {
            contact_list: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact_list: args.contact_list,
    }

    return show.definition.url
            .replace('{contact_list}', parsedArgs.contact_list.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::show
* @see app/Http/Controllers/ContactListController.php:69
* @route '/contact-lists/{contact_list}'
*/
show.get = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::show
* @see app/Http/Controllers/ContactListController.php:69
* @route '/contact-lists/{contact_list}'
*/
show.head = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactListController::show
* @see app/Http/Controllers/ContactListController.php:69
* @route '/contact-lists/{contact_list}'
*/
const showForm = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::show
* @see app/Http/Controllers/ContactListController.php:69
* @route '/contact-lists/{contact_list}'
*/
showForm.get = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::show
* @see app/Http/Controllers/ContactListController.php:69
* @route '/contact-lists/{contact_list}'
*/
showForm.head = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ContactListController::edit
* @see app/Http/Controllers/ContactListController.php:120
* @route '/contact-lists/{contact_list}/edit'
*/
export const edit = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/contact-lists/{contact_list}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactListController::edit
* @see app/Http/Controllers/ContactListController.php:120
* @route '/contact-lists/{contact_list}/edit'
*/
edit.url = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact_list: args }
    }

    if (Array.isArray(args)) {
        args = {
            contact_list: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact_list: args.contact_list,
    }

    return edit.definition.url
            .replace('{contact_list}', parsedArgs.contact_list.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::edit
* @see app/Http/Controllers/ContactListController.php:120
* @route '/contact-lists/{contact_list}/edit'
*/
edit.get = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::edit
* @see app/Http/Controllers/ContactListController.php:120
* @route '/contact-lists/{contact_list}/edit'
*/
edit.head = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactListController::edit
* @see app/Http/Controllers/ContactListController.php:120
* @route '/contact-lists/{contact_list}/edit'
*/
const editForm = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::edit
* @see app/Http/Controllers/ContactListController.php:120
* @route '/contact-lists/{contact_list}/edit'
*/
editForm.get = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactListController::edit
* @see app/Http/Controllers/ContactListController.php:120
* @route '/contact-lists/{contact_list}/edit'
*/
editForm.head = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ContactListController::update
* @see app/Http/Controllers/ContactListController.php:133
* @route '/contact-lists/{contact_list}'
*/
export const update = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/contact-lists/{contact_list}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ContactListController::update
* @see app/Http/Controllers/ContactListController.php:133
* @route '/contact-lists/{contact_list}'
*/
update.url = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact_list: args }
    }

    if (Array.isArray(args)) {
        args = {
            contact_list: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact_list: args.contact_list,
    }

    return update.definition.url
            .replace('{contact_list}', parsedArgs.contact_list.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::update
* @see app/Http/Controllers/ContactListController.php:133
* @route '/contact-lists/{contact_list}'
*/
update.put = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ContactListController::update
* @see app/Http/Controllers/ContactListController.php:133
* @route '/contact-lists/{contact_list}'
*/
update.patch = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ContactListController::update
* @see app/Http/Controllers/ContactListController.php:133
* @route '/contact-lists/{contact_list}'
*/
const updateForm = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::update
* @see app/Http/Controllers/ContactListController.php:133
* @route '/contact-lists/{contact_list}'
*/
updateForm.put = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::update
* @see app/Http/Controllers/ContactListController.php:133
* @route '/contact-lists/{contact_list}'
*/
updateForm.patch = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ContactListController::destroy
* @see app/Http/Controllers/ContactListController.php:159
* @route '/contact-lists/{contact_list}'
*/
export const destroy = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/contact-lists/{contact_list}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ContactListController::destroy
* @see app/Http/Controllers/ContactListController.php:159
* @route '/contact-lists/{contact_list}'
*/
destroy.url = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact_list: args }
    }

    if (Array.isArray(args)) {
        args = {
            contact_list: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact_list: args.contact_list,
    }

    return destroy.definition.url
            .replace('{contact_list}', parsedArgs.contact_list.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::destroy
* @see app/Http/Controllers/ContactListController.php:159
* @route '/contact-lists/{contact_list}'
*/
destroy.delete = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ContactListController::destroy
* @see app/Http/Controllers/ContactListController.php:159
* @route '/contact-lists/{contact_list}'
*/
const destroyForm = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::destroy
* @see app/Http/Controllers/ContactListController.php:159
* @route '/contact-lists/{contact_list}'
*/
destroyForm.delete = (args: { contact_list: string | number } | [contact_list: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ContactListController::addContacts
* @see app/Http/Controllers/ContactListController.php:173
* @route '/contact-lists/{contactList}/add'
*/
export const addContacts = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addContacts.url(args, options),
    method: 'post',
})

addContacts.definition = {
    methods: ["post"],
    url: '/contact-lists/{contactList}/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactListController::addContacts
* @see app/Http/Controllers/ContactListController.php:173
* @route '/contact-lists/{contactList}/add'
*/
addContacts.url = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contactList: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contactList: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contactList: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contactList: typeof args.contactList === 'object'
        ? args.contactList.id
        : args.contactList,
    }

    return addContacts.definition.url
            .replace('{contactList}', parsedArgs.contactList.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::addContacts
* @see app/Http/Controllers/ContactListController.php:173
* @route '/contact-lists/{contactList}/add'
*/
addContacts.post = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addContacts.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::addContacts
* @see app/Http/Controllers/ContactListController.php:173
* @route '/contact-lists/{contactList}/add'
*/
const addContactsForm = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addContacts.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::addContacts
* @see app/Http/Controllers/ContactListController.php:173
* @route '/contact-lists/{contactList}/add'
*/
addContactsForm.post = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addContacts.url(args, options),
    method: 'post',
})

addContacts.form = addContactsForm

/**
* @see \App\Http\Controllers\ContactListController::removeContacts
* @see app/Http/Controllers/ContactListController.php:192
* @route '/contact-lists/{contactList}/remove'
*/
export const removeContacts = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeContacts.url(args, options),
    method: 'post',
})

removeContacts.definition = {
    methods: ["post"],
    url: '/contact-lists/{contactList}/remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactListController::removeContacts
* @see app/Http/Controllers/ContactListController.php:192
* @route '/contact-lists/{contactList}/remove'
*/
removeContacts.url = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contactList: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contactList: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contactList: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contactList: typeof args.contactList === 'object'
        ? args.contactList.id
        : args.contactList,
    }

    return removeContacts.definition.url
            .replace('{contactList}', parsedArgs.contactList.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactListController::removeContacts
* @see app/Http/Controllers/ContactListController.php:192
* @route '/contact-lists/{contactList}/remove'
*/
removeContacts.post = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeContacts.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::removeContacts
* @see app/Http/Controllers/ContactListController.php:192
* @route '/contact-lists/{contactList}/remove'
*/
const removeContactsForm = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeContacts.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactListController::removeContacts
* @see app/Http/Controllers/ContactListController.php:192
* @route '/contact-lists/{contactList}/remove'
*/
removeContactsForm.post = (args: { contactList: number | { id: number } } | [contactList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeContacts.url(args, options),
    method: 'post',
})

removeContacts.form = removeContactsForm

const ContactListController = { index, create, store, show, edit, update, destroy, addContacts, removeContacts }

export default ContactListController
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\KycReviewController::index
* @see app/Http/Controllers/Admin/KycReviewController.php:27
* @route '/admin/kyc'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/kyc',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KycReviewController::index
* @see app/Http/Controllers/Admin/KycReviewController.php:27
* @route '/admin/kyc'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KycReviewController::index
* @see app/Http/Controllers/Admin/KycReviewController.php:27
* @route '/admin/kyc'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::index
* @see app/Http/Controllers/Admin/KycReviewController.php:27
* @route '/admin/kyc'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::index
* @see app/Http/Controllers/Admin/KycReviewController.php:27
* @route '/admin/kyc'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::index
* @see app/Http/Controllers/Admin/KycReviewController.php:27
* @route '/admin/kyc'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::index
* @see app/Http/Controllers/Admin/KycReviewController.php:27
* @route '/admin/kyc'
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
* @see \App\Http\Controllers\Admin\KycReviewController::approveUser
* @see app/Http/Controllers/Admin/KycReviewController.php:174
* @route '/admin/kyc/approve-user'
*/
export const approveUser = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveUser.url(options),
    method: 'post',
})

approveUser.definition = {
    methods: ["post"],
    url: '/admin/kyc/approve-user',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\KycReviewController::approveUser
* @see app/Http/Controllers/Admin/KycReviewController.php:174
* @route '/admin/kyc/approve-user'
*/
approveUser.url = (options?: RouteQueryOptions) => {
    return approveUser.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KycReviewController::approveUser
* @see app/Http/Controllers/Admin/KycReviewController.php:174
* @route '/admin/kyc/approve-user'
*/
approveUser.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveUser.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::approveUser
* @see app/Http/Controllers/Admin/KycReviewController.php:174
* @route '/admin/kyc/approve-user'
*/
const approveUserForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveUser.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::approveUser
* @see app/Http/Controllers/Admin/KycReviewController.php:174
* @route '/admin/kyc/approve-user'
*/
approveUserForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveUser.url(options),
    method: 'post',
})

approveUser.form = approveUserForm

/**
* @see \App\Http\Controllers\Admin\KycReviewController::show
* @see app/Http/Controllers/Admin/KycReviewController.php:84
* @route '/admin/kyc/{kyc}'
*/
export const show = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/kyc/{kyc}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KycReviewController::show
* @see app/Http/Controllers/Admin/KycReviewController.php:84
* @route '/admin/kyc/{kyc}'
*/
show.url = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kyc: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kyc: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kyc: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kyc: typeof args.kyc === 'object'
        ? args.kyc.id
        : args.kyc,
    }

    return show.definition.url
            .replace('{kyc}', parsedArgs.kyc.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KycReviewController::show
* @see app/Http/Controllers/Admin/KycReviewController.php:84
* @route '/admin/kyc/{kyc}'
*/
show.get = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::show
* @see app/Http/Controllers/Admin/KycReviewController.php:84
* @route '/admin/kyc/{kyc}'
*/
show.head = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::show
* @see app/Http/Controllers/Admin/KycReviewController.php:84
* @route '/admin/kyc/{kyc}'
*/
const showForm = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::show
* @see app/Http/Controllers/Admin/KycReviewController.php:84
* @route '/admin/kyc/{kyc}'
*/
showForm.get = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::show
* @see app/Http/Controllers/Admin/KycReviewController.php:84
* @route '/admin/kyc/{kyc}'
*/
showForm.head = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\KycReviewController::approve
* @see app/Http/Controllers/Admin/KycReviewController.php:141
* @route '/admin/kyc/{kyc}/approve'
*/
export const approve = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/kyc/{kyc}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\KycReviewController::approve
* @see app/Http/Controllers/Admin/KycReviewController.php:141
* @route '/admin/kyc/{kyc}/approve'
*/
approve.url = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kyc: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kyc: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kyc: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kyc: typeof args.kyc === 'object'
        ? args.kyc.id
        : args.kyc,
    }

    return approve.definition.url
            .replace('{kyc}', parsedArgs.kyc.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KycReviewController::approve
* @see app/Http/Controllers/Admin/KycReviewController.php:141
* @route '/admin/kyc/{kyc}/approve'
*/
approve.post = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::approve
* @see app/Http/Controllers/Admin/KycReviewController.php:141
* @route '/admin/kyc/{kyc}/approve'
*/
const approveForm = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::approve
* @see app/Http/Controllers/Admin/KycReviewController.php:141
* @route '/admin/kyc/{kyc}/approve'
*/
approveForm.post = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\Admin\KycReviewController::reject
* @see app/Http/Controllers/Admin/KycReviewController.php:217
* @route '/admin/kyc/{kyc}/reject'
*/
export const reject = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/kyc/{kyc}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\KycReviewController::reject
* @see app/Http/Controllers/Admin/KycReviewController.php:217
* @route '/admin/kyc/{kyc}/reject'
*/
reject.url = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kyc: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kyc: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kyc: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kyc: typeof args.kyc === 'object'
        ? args.kyc.id
        : args.kyc,
    }

    return reject.definition.url
            .replace('{kyc}', parsedArgs.kyc.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KycReviewController::reject
* @see app/Http/Controllers/Admin/KycReviewController.php:217
* @route '/admin/kyc/{kyc}/reject'
*/
reject.post = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::reject
* @see app/Http/Controllers/Admin/KycReviewController.php:217
* @route '/admin/kyc/{kyc}/reject'
*/
const rejectForm = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::reject
* @see app/Http/Controllers/Admin/KycReviewController.php:217
* @route '/admin/kyc/{kyc}/reject'
*/
rejectForm.post = (args: { kyc: number | { id: number } } | [kyc: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

/**
* @see \App\Http\Controllers\Admin\KycReviewController::downloadDocument
* @see app/Http/Controllers/Admin/KycReviewController.php:268
* @route '/admin/kyc/{kyc}/document/{type}'
*/
export const downloadDocument = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadDocument.url(args, options),
    method: 'get',
})

downloadDocument.definition = {
    methods: ["get","head"],
    url: '/admin/kyc/{kyc}/document/{type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KycReviewController::downloadDocument
* @see app/Http/Controllers/Admin/KycReviewController.php:268
* @route '/admin/kyc/{kyc}/document/{type}'
*/
downloadDocument.url = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions) => {
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

    return downloadDocument.definition.url
            .replace('{kyc}', parsedArgs.kyc.toString())
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KycReviewController::downloadDocument
* @see app/Http/Controllers/Admin/KycReviewController.php:268
* @route '/admin/kyc/{kyc}/document/{type}'
*/
downloadDocument.get = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadDocument.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::downloadDocument
* @see app/Http/Controllers/Admin/KycReviewController.php:268
* @route '/admin/kyc/{kyc}/document/{type}'
*/
downloadDocument.head = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadDocument.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::downloadDocument
* @see app/Http/Controllers/Admin/KycReviewController.php:268
* @route '/admin/kyc/{kyc}/document/{type}'
*/
const downloadDocumentForm = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadDocument.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::downloadDocument
* @see app/Http/Controllers/Admin/KycReviewController.php:268
* @route '/admin/kyc/{kyc}/document/{type}'
*/
downloadDocumentForm.get = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadDocument.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::downloadDocument
* @see app/Http/Controllers/Admin/KycReviewController.php:268
* @route '/admin/kyc/{kyc}/document/{type}'
*/
downloadDocumentForm.head = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadDocument.form = downloadDocumentForm

/**
* @see \App\Http\Controllers\Admin\KycReviewController::updateDocumentStatus
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
export const updateDocumentStatus = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateDocumentStatus.url(args, options),
    method: 'patch',
})

updateDocumentStatus.definition = {
    methods: ["patch"],
    url: '/admin/kyc/{kyc}/document/{type}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\KycReviewController::updateDocumentStatus
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
updateDocumentStatus.url = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions) => {
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

    return updateDocumentStatus.definition.url
            .replace('{kyc}', parsedArgs.kyc.toString())
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KycReviewController::updateDocumentStatus
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
updateDocumentStatus.patch = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateDocumentStatus.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::updateDocumentStatus
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
const updateDocumentStatusForm = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateDocumentStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\KycReviewController::updateDocumentStatus
* @see app/Http/Controllers/Admin/KycReviewController.php:287
* @route '/admin/kyc/{kyc}/document/{type}/status'
*/
updateDocumentStatusForm.patch = (args: { kyc: number | { id: number }, type: string | number } | [kyc: number | { id: number }, type: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateDocumentStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateDocumentStatus.form = updateDocumentStatusForm

const KycReviewController = { index, approveUser, show, approve, reject, downloadDocument, updateDocumentStatus }

export default KycReviewController
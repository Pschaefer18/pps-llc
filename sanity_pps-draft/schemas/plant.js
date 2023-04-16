export default {
    name: 'plant',
    title: 'Plants',
    type: 'document',
    fields: [ 
        {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{type: 'image' }],
        options: {
            hotspot: true
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'scientific_name',
            title: 'Scientific Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'pricing_options',
            title: 'Pricing Options',
            type: 'array',
            initialValue: [
                {option: 'Single', price: 4},
                {option: '4-pack', price: 6},
                {option: '8-pack', price: 10}
            ],
            of: [{name: 'price', Title: 'Price', type: 'object', fields: [{name: 'option', Title: 'Option', type: 'string'}, {name: 'price', title: 'Price', type: 'number'}]}]
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
        {
            name: 'details',
            title: 'Details',
            type: 'specs',
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{type: 'image'}],

        },
        {
            name: 'id',
            title: 'ID',
            type: 'string',
        }
    ]
}
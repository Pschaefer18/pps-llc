export default {
    name: 'plant',
    title: 'Plants',
    type: 'document',
    fields: [
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                { title: 'Native', value: 'native' },
                { title: 'Vegetable', value: 'vegetable' },
              ],
              layout: 'radio' // This sets the layout to use radio buttons
            }
          }, 
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
            name: 'variety',
            title: 'Variety',
            type: 'string'
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
            name: 'availability_window',
            title: 'Availability Window',
            type: 'array',
            initialValue: [
                "2023-05-05",
                "2023-06-30"
            ],
            of: [{name: 'date', title: 'Date', type: 'date'}]
        },
        {
            name: 'pricing_options',
            title: 'Pricing Options',
            type: 'array',
            initialValue: [
                {option: 'Single', price: 4},
                {option: 'Four pack', price: 6},
                {option: 'Eight pack', price: 10}
            ],
            of: [{name: 'price', title: 'Price', type: 'object', fields: [{name: 'option', Title: 'Option', type: 'string'}, {name: 'price', title: 'Price', type: 'number'}]}]
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
        }
    ]
}
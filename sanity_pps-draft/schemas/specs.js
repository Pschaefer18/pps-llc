export default {
    name: 'specs',
    title: 'Specs',
    type: 'document',
    fields: [
        {
            name: 'sun_exposure',
            title: 'Tolerable Sun Exposure Levels',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: [
                    {title: 'Full', value: 'full'}, {title: 'Partial', value: 'partial'}, {title: 'Shade', value: 'shade'}
                ]
            }
        },
        {
            name: 'soil_moisture',
            title: 'Tolerable Soil Moisture Conditions',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: [
                    {title: 'Wet', value: 'wet'},
                    {title: 'Medium Wet', value: 'medium_wet'},
                    {title: 'Medium', value: 'medium'},
                    {title: 'Medium Dry', value: 'medium_dry'},
                    {title: 'Dry', value: 'dry'}
                ]
            }
        },
        {
            name: 'height',
            title: 'Height',
            type: 'string',
        },
        {
            name: 'bloom',
            title: 'Bloom',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: [
                    {title: 'April', value: 'april'},
                    {title: 'May', value: 'may'},
                    {title: 'June', value: 'june'},
                    {title: 'July', value: 'july'},
                    {title: 'August', value: 'august'},
                    {title: 'September', value: 'september'},
                    {title: 'October', value: 'october'},
                ]
            }
        },
        {
            name: 'spacing',
            title: 'Spacing',
            type: 'string',
        },
    ]
}
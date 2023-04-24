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
                    {title: 'Medium Wet', value: 'medium-wet'},
                    {title: 'Medium', value: 'medium'},
                    {title: 'Medium Dry', value: 'medium-dry'},
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
                    {title: 'April', value: 'April'},
                    {title: 'May', value: 'May'},
                    {title: 'June', value: 'June'},
                    {title: 'July', value: 'July'},
                    {title: 'August', value: 'August'},
                    {title: 'September', value: 'September'},
                    {title: 'October', value: 'October'},
                ]
            }
        },
        {
            name: 'days_to_maturity',
            title: 'days to maturity',
            type: 'number'
        },
        {
            name: 'spacing',
            title: 'Spacing',
            type: 'string',
        },
    ]
}
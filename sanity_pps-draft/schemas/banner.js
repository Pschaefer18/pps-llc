export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
        name: 'crawl_items',
        title: 'Crawl Items',
        type: 'array',
        of: [{type: 'string'}]
    }
  ],
};
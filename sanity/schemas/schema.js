// vendors
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// objects
import blockquote from './objects/blockquote'
import figure from './objects/figure'
import meta from './objects/meta'
import richText from './objects/richText'

// documents

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    richText,
    blockquote,
    figure,
    meta,
  ])
})

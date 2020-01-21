// vendors
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// objects
import blockquote from './objects/blockquote'
import figure from './objects/figure'
import meta from './objects/meta'
import richText from './objects/richText'
import featureImage from './objects/featureImage'

// documents
import boardMember from './documents/boardMember'
import project from './documents/project'

export default createSchema({
  name: "ZIA",
  types: schemaTypes.concat([
    blockquote,
    boardMember,
    project,
    figure,
    meta,
    richText,
    featureImage,
  ])
});

import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import styles from '!css-loader!sass-loader!../layouts/layout.scss'


import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewStyle("https://fonts.googleapis.com/css?family=Oswald:400,500,700|Rubik+Mono+One&display=swap");
// CMS.registerPreviewStyle(`
// h1, h2, h3, .MuiTypography-h1, .MuiTypography-h2, .MuiTypography-h3 {
//   font-family: 'Rubik Mono One', sans-serif;
// }`, { raw: true })

CMS.registerPreviewStyle(styles.toString(), { raw: true })

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

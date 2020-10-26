import { useEffect } from 'react'

const MetaTags = ({
  title = 'Official site',
  description = title,
  imgUrl = '',
}) => {
  useEffect(() => {
    if (imgUrl === '') {
      // auto generate share img
      imgUrl = window.location.origin + '/assets/avatar.jpg'
    }
  }, [])

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />

      {/* Google / Search Engine Tags */}
      <meta itemProp='name' content={title} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={imgUrl} />

      {/* Facebook Meta Tags */}
      <meta property='og:url' content={window.location.origin} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imgUrl} />

      {/* Twitter Meta Tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imgUrl} />
    </>
  )
}

export default MetaTags

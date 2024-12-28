addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const fileExtension = url.pathname.split('.').pop().toLowerCase()

  // 获取原始响应
  const response = await fetch(request)

  // 如果获取的响应无效，则直接返回
  if (!response.ok) {
    return new Response('Failed to fetch the resource.', { status: 500 });
  }

  // 创建新的响应，保留原始响应体
  const modifiedResponse = new Response(response.body, response)

  // 获取原始 Content-Type
  let contentType = response.headers.get('Content-Type')

  // 根据文件扩展名设置 Content-Type（支持 SVG 和其他图片格式）
  if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
    contentType = 'image/jpeg'
  } else if (fileExtension === 'png') {
    contentType = 'image/png'
  } else if (fileExtension === 'webp') {
    contentType = 'image/webp'
  } else if (fileExtension === 'svg') {
    contentType = 'image/svg+xml'
  } else if (fileExtension === 'webm') {
    contentType = 'video/webm'
  }

  // 修改 Content-Type 和 Content-Disposition
  if (contentType) {
    modifiedResponse.headers.set('Content-Type', contentType)
    modifiedResponse.headers.set('Content-Disposition', 'inline')
  }

  return modifiedResponse
}

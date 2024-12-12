addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    const fileExtension = url.pathname.split('.').pop().toLowerCase()

    // 获取原始响应
    const response = await fetch(request)

    // 创建新的响应，保留原始 Content-Type
    const modifiedResponse = new Response(response.body, response)

    // 根据文件扩展名设置 Content-Type（如果是已知图像类型）
    let contentType = response.headers.get('Content-Type')
    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
        contentType = 'image/jpeg'
    } else if (fileExtension === 'png') {
        contentType = 'image/png'
    } else if (fileExtension === 'webp') {
        contentType = 'image/webp'
    }

    // 修改 Content-Type 和 Content-Disposition
    modifiedResponse.headers.set('Content-Type', contentType)
    modifiedResponse.headers.set('Content-Disposition', 'inline')

    return modifiedResponse
}

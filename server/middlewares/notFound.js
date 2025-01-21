function notFound(_, res) {
    res.status(404).json({
        message: 'Page not found!',
        error: 'Not found'
    })
}
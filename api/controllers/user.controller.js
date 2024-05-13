export const test = (req, res) => {
    res.json({
        status: 200,
        route: 'API Working',
        message: 'Welcome my friend',
        sender: 'test@example.com',
    })
}
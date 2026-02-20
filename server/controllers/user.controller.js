
export const getCurrentUser = async (req, res) => {
    console.log('Protected route works, ---getCurrentUser---');
    res.json({
        message: "Protected route works",
        userId: req.auth.userId,
    });
};
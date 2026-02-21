
export const getCurrentUser = async (req, res) => {
    console.log('Protected route works, ---getCurrentUser---');
    const auth = req.auth();
    console.log("---getCurrentUser---  req.auth==", auth);

    res.json({
        message: "Protected route works",
    });
    //changes made
};
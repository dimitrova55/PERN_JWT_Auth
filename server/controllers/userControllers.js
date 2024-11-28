import db from "../db.js";


/** GET dashboard */
export const dashboard = async(req, res) => {
    // console.log(req.user.id);
    
    try {
        const user  = await db.query({
            text: `SELECT id, name, email FROM users WHERE id = $1`,
            values: [req.user.id]
        })
        
        // console.log(user.rows[0])
        res.status(200).json({user: user.rows[0]})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Server error."})
    }
}


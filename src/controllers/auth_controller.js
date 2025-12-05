async function handleSignup(req,res) {
    try {


        res.status(400).json("Account created Successfully")
    } catch (error) {
        res.status(400).json(error)
    }
    
}

async function handleLogin(req,res) {
    try {

        
        res.status(400).json("Account created Successfully")
    } catch (error) {
        res.status(400).json(error)
    }
    
}

module.exports={handleLogin,handleSignup}
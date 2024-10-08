class PUBLIC_DATA{

    static port = process.env.PORT || 4000 
    static mongo_uri = process.env.MONGO_URI || `mongodb+srv://user1:user1@cluster0.op0mt.mongodb.net/inventory_management` 
    static jwt_auth = process.env.JWT_AUTH || "@#$%^&*(@#$%^&*($%^))#$%^&"

}

module.exports = {
    PUBLIC_DATA
}
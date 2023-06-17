module.exports = {
    viewLogin: async(req, res) => {
        try{  
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };

            res.render("login", {
                alert,
                title: "Login",
            });
        }catch(error){
            res.redirect("/");
        }
    },

    identifyUser: async(req, res) => {
        console.log("halouser");
        try{
            const {username, password} = req.body;
            console.log(username);
            console.log(password);
            if(username == "admin" && password == "123"){
                req.session.loggedIn = true;
                req.session.username = username;
                res.redirect("/obat");
            }else{
                req.flash("alertMessage", "Login Gagal!");
                req.flash("alertStatus", "danger");
                res.redirect("/");
            }
        }catch(error){
            req.flash("alertMessage", "Username tidak ditemukan");
            req.flash("alertStatus", "danger");
            res.redirect("/");
        }
    }
}
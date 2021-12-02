const Users = require('../models/user.model.js');
const emotps = require('../models/emotp.model.js');
const validfn = require('../misc/validators.js');
const e = require('express');
var crypto = require('crypto'); 
var nodemailer = require('nodemailer');



exports.usignup = (req, res) => {
    
	if( !req.body.uname || !req.body.pwd || !req.body.email||!req.body.otpnum ) {
        return res.status(400).send({
            message: "mandatory field missing"
        });
        
    }
	
	// email validation
	const [resb, rest] = validfn.emailvalidation(req.body.email)

    if(!Boolean(resb))
    {
        return res.status(400).send({message: "Email " + rest}); 
    }
	
	// email verify in user table
	Users.find({ $or: [{"uname": req.body.uname}, {"email": req.body.email}]})
	.then(data => {
		if(data.length > 0) {
			res.status(400).send({message: "User already exists"});
		}
        else{
            
            emotps.find({"email": req.body.email})
            .then(data => {
                if(data.length > 0){
                    vFlag = 0;
                    for(i=0; i<data.length; i++) {
                        var dbsalt = data[i].otpsalt;
                        var dbhash = data[i].otphash;
                        var rHash = crypto.pbkdf2Sync(req.body.otpnum, dbsalt,100, 16, `sha512`).toString(`hex`);
                        if(dbhash == rHash && data[i].status == "non-verified") {
                            
                            this.salt = crypto.randomBytes(8).toString('hex')
                            this.hash = crypto.pbkdf2Sync(req.body.pwd, this.salt,1000, 64, `sha512`).toString(`hex`); 
                    
                            const user = new Users({
                            uname: req.body.uname,
                            psalt: this.salt,
                            phash: this.hash,
                            email: req.body.email,
                            });
                    
                            user.save()
                            .then(data => {
                             res.status(200).send("User signed up successfully");
                            })
                            .catch(err => {
                                res.status(500).send({
                                message: err.message || "User signup failed!"
                                });
                            });	
                        }
                    }
                    
                  
                }
                else {
                    return res.status(400).send({
                        message: "Invalid OTP or OTP expired"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occurred while accessing DB"
                });
            });
        }
   
	})
	.catch(err => {
		res.status(500).send({message: "Error occured while accessing DB"});
	});
	
}

exports.uiLogin = (req, res) => {
    
	if(!req.body.uname || !req.body.pwd){
        return res.status(400).send({
            message: "mandatory field missing"
        });
    }
	
	var username = {"uname" : req.body.uname};
    var pwd = {"pwd" : req.body.pwd};
	
	Users.findOne(username)
    .then(function(data) {
		if(data ){
			var dbsalt = data.psalt
            var dbhash = data.phash
            
			
			this.hash = crypto.pbkdf2Sync(req.body.pwd, dbsalt,1000, 64, `sha512`).toString(`hex`);
			
			if(this.hash == dbhash) {
				res.status(200).send({
                    message: "User login successfully"

                });
                
			}
			else {
				res.status(400).send({
                    message: "Invalid username/password"
                });
			}
		}
		else{
			res.status(404).send({
                message: "User not exists"
            });
		}
	})
	.catch(err => {
		res.status(500).send({
            message: err.message || "Error occurred while accessing DB."
        });
	});
}
exports.sendOtp = async(req, res) => {
    console.log("muthu")
	if(!req.body.email || !req.body.uname) {
        return res.status(400).send({
            message: "Email Id and Username are required"
        });
    }
	
	const [resb, rest] = validfn.emailvalidation(req.body.email)

    if(!Boolean(resb))
    {
        return res.status(400).send({message: "Email " + rest}); 
    }
	
	var currentDate = new Date();
	
	var otpNum = generateRandom();
	var sOtp = String(otpNum);
	this.salt = crypto.randomBytes(8).toString('hex')
    this.hash = crypto.pbkdf2Sync(sOtp, this.salt,100, 16, `sha512`).toString(`hex`); 

    const emotp = new emotps({
        uname: req.body.uname,
        email: req.body.email,
        otpsalt: this.salt,
        otphash: this.hash,
        functionMode: req.body.mode,
        status: "non-verified",
        tvalid: currentDate
    });
	
	await sendEmail(otpNum, req, res);
	
	emotp.save()
    .then(data => {
        res.status(200).send({
            message: "OTP Sent Successfully!"
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "OTP Process failed!"
        });
    });
}

function generateRandom()
{
   var a = Math.floor((Math.random() * 999999) + 99999);
   a = String(a);
   return a = a.substring(0, 6);
}
function sendEmail(otpNum, req, res)
{
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
        auth: {
          user: 'xxxx@gmail,com',
          pass: 'xxxxxxxxxxxxx'
        }
    });

    var mailOptions = {
        from: 'muthupandip1998@gmail.com',
        to: req.body.email,
        subject: 'Test mail ',
        text: 'Your OTP  '+ otpNum
    };
    
	try{
		transporter.sendMail(mailOptions, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + data.response);
			}
        });
		return true;
	}
	catch(err) {
		return res.status(400).send({message: "Send OTP failed"}); 
	}
	
}

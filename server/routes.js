const express = require("express");
const router = express();
const path = require("path");
const bcrypt = require("bcrypt");
const usersSchema = require("./models/Users");
const tagSchema = require("./models/Tags");
const ProfileSchema = require("./models/ProfileImages");
const multer = require("multer");
const questionModel = require("./models/Questions");
const answerModel = require("./models/Answer");
const nodemailer = require("nodemailer");
const addUser = require("./models/Users");
const jwt = require("jsonWebToken");
const { json } = require("express");
const { exists } = require("./models/Users");

// multer middleware
// Question Images
const storedQuestionImage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./QuestionImages");
  },

  filename: (req, file, callBack) => {
    callBack(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadQuestionImage = multer({ storage: storedQuestionImage });

const storedProfileImage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./ProfileImages");
  },

  filename: (req, file, callBack) => {
    callBack(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProfileImage = multer({ storage: storedProfileImage });

//add question
router.post(
  "/api/newQuestion",
  uploadQuestionImage.single("image"),
  (req, res) => {
    let data = JSON.parse(req.body.information);

    const newQuestion = new questionModel({
      userId: data.userId,
      username: data.username,
      questionTitle: data.questionTitle,
      questionDescription: data.questionDescription,
      codeSnippet: data.codeSnippet,
      language: data.language,
      image: req.file.filename,
      upvotes: 1,
      downvotes: 1,
      score: 0,
      tags: data.tags,
      reported: false,
      userProfileImg: data.userProfileImg,
    });

    newQuestion
      .save()
      .then((item) => {
        res.json(item);
        console.log(item);
      })
      .catch((err) => {
        res.status(400).json({ msg: "There is an Error:", err });
        console.log(err.response);
        console.log(err.request);
        console.log(err.message);
      });
  }
);

// get all questions
router.get("/api/allQuestions", async (req, res) => {
  const allQuestions = await questionModel.find();
  res.json(allQuestions);
});

// get one question
router.get("/api/oneQuestion/:id", async (req, res) => {
  const findQuestion = await questionModel.findById(req.params.id);
  res.json(findQuestion);
});

// delete question
router.delete("/api/deleteQuestion/:id", async (req, res) => {
  const findQuestion = await questionModel.remove({ _id: req.params.id });
  res.json(findQuestion);
});

// update a question
router.patch("/api/updateQuestion/:id", async (req, res) => {
  const findQuestion = await questionModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        questionTitle: req.body.questionTitle,
        questionDescription: req.body.questionDescription,
        language: req.body.language,
        codeSnippet: req.body.codeSnippet,
      },
    }
  );

  res.json(findQuestion);
});

// get all profile
router.get("/api/allProfiles/", async (req, res) => {
  const findQuestion = await ProfileSchema.find();
  res.json(findQuestion);
});

//update profile
router.patch("/api/updateUser/:id", async (req, res) => {
  const findUser = await usersSchema.updateOne(
    { _id: req.params.id },
    {
      $set: {
        username: req.body.username,
      },
    }
  );
  res.json(findUser);
  console.log(findUser);
});

//delete profile
// router.delete('/api/deleteProfile/:id', async (req, res) => {
//   const findUser
// })

router.patch("/api/newAnswer/:id", async (req, res) => {
  const addAnswer = await questionModel.updateOne(
    { id: req.params.id },
    {
      $push: {
        userId: data.userId,
        username: data.username,
        answerDescription: data.answer,
        codeSnippet: data.codeSnippet,
      },
    }
  );

  try {
    res.json(addAnswer);
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    console.log(err.message);
  }
});

// add answer
router.post(
  "/api/newAnswer",
  uploadQuestionImage.single("image"),
  (req, res) => {
    let data = JSON.parse(req.body.information).Answers;
    console.log(data);

    const newAnswer = new answerModel({
      userId: data.userId,
      ParentQuestionId: data.ParentQuestionId,
      username: data.username,
      answerDescription: data.answerDescription,
      codeSnippet: data.codeSnippet,
      image: req.file.filename,
      language: data.language,
      upvotes: 0,
      downvotes: 0,
      score: 0,
    });

    newAnswer
      .save()
      .then((item) => {
        res.json(item);
        console.log("Nothing");
      })
      .catch((err) => {
        res.status(400).json({ msg: "There is an Error:", err });
        console.log(err.response);
        console.log(err.request);
        console.log(err.message);
      });
  }
);

router.get("/api/allAnswers", async (req, res) => {
  const allAnswers = await answerModel.find();
  res.json(allAnswers);
});

//add Profile Images
router.post(
  "/api/addProfileImg",
  uploadProfileImage.single("pfp"),
  (req, res) => {
    let data = JSON.parse(req.body.imgData);

    const newProfile = new ProfileSchema({
      imageLocation: req.file.filename,
      imageName: data.imageName,
    });

    console.log(newProfile);

    newProfile
      .save()
      .then((item) => {
        res.json({
          Message: "Added",
          user: item,
        });
      })
      .catch((err) => {
        res.status(400).json({ Message: "Not Added", err });
        console.log(err.response);
        console.log(err.request);
        console.log(err.message);
      });
  }
);

router.post("/register", (req, res) => {
  let data = req.body;

  const newUser = new usersSchema({
    email: req.body.email,
    username: req.body.username,
    accStatus: false,
    password: req.body.password,
    profile: req.body.profile,
    score: 50,
    admin: false,
    totalUpvotes: 1,
    totalDownvotes: -1,
  });

  newUser
    .save()
    .then(async (item) => {
      res.json(item);

      const findUser = await usersSchema.findOne({
        // email: req.body.email,
        username: req.body.username,
      });

      // const findUser = await addUser.findOne({
      //   username: req.body.username,
      // });

      let userIdLink = "http://localhost:3000/auth?id=" + findUser._id;

      // Send confirmation email has moved here to only run on successful add user to the database.
      const mailerOutput = `
    <h1>Welcome ${data.username} to Windows-Encoded</h1>
    <p>Before you can login, please verify your account using the link below</p>
    <a style="width: 200px; height: 50px; background-color: #5067EB;
      border-radius: 20px; Color: White;" href=${userIdLink}>Click to Verify </a>
      <img src="https://drive.google.com/file/d/1XLTvZ9Nn1W39nGBc0CO7cMBRzrbxlhyW/view?usp=sharing"></img>
   
`;
      // style a buttong instead of an Href - inline styling
      // use src with http link for image

      const transporter = nodemailer.createTransport({
        host: "mail.encoded-noreply.co.za",
        port: 465,
        secure: true,
        secureConnection: true,
        auth: {
          user: "windows@encoded-noreply.co.za",
          pass: "_#y#,)rb8,k^",
        },
      });

      const mailOptions = {
        from: '"Windows-Encoded" <windows@encoded-noreply.co.za>',
        to: data.email,
        subject: "New User Registration",
        html: mailerOutput,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message Sent:", info.messageId);
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: "There is an error", err });
    });
});

router.post("/api/login/", async (req, res) => {
  const findUser = await usersSchema.findOne({
    email: req.body.email,
  });

  if (findUser) {
    console.log("user found!");
    if (await bcrypt.compare(req.body.password, findUser.password)) {
      if (findUser.accStatus) {
        res.json({
          valid: true,
          msg: "Pass matches",
          userData: findUser,
        });
      } else {
        res.json({
          valid: false,
          msg: "Account not verified. Please check your email.",
        });
      }
      console.log("Is a match");
    } else {
      res.json({
        valid: false,
        msg: "Password does not match with your email address.",
      });
    }
  } else {
    console.log("user not found!");
    res.json({
      valid: false,
      msg: "Account does not exist",
    });
  }
});

router.patch("/api/validate/:id", async (req, res) => {
  let userId = req.params.id;

  const findUser = await addUser.findOne({
    _id: userId,
  });

  if (findUser) {
    try {
      const tokenDecrypt = jwt.verify(
        findUser.token,
        process.env.ACCESS_TOKEN_SECRET
      );
      const authUser = await addUser.findOne({
        _id: userId,
        username: tokenDecrypt.username,
        email: tokenDecrypt.email,
      });

      if (authUser) {
        const updateAccountStatus = await addUser.updateOne(
          { _id: req.params.id },
          { $set: { accStatus: true } }
        );

        res.json({
          user: authUser.username,
          success: true,
          data: findUser,
          msg: "Profile Verified",
        });
      } else {
        res.json({ success: false, msg: "Profile not verified" });
      }
    } catch {
      res.json({ success: false, msg: "Invalid Token" });
    }
  } else {
    res.json({
      success: false,
      msg: "Verification failed: Contact System Admin",
    });
  }
});

router.post("/api/resetpass", async (req, res) => {
  console.log(req.body.email);
  const findUser = await addUser.findOne({
    email: req.body.email,
  });

  if (findUser) {
    let usersIdLink = "http://localhost:3000/updatepassword?id=" + findUser._id;

    const mailerOutput = `
    <h1>Welcome ${findUser.username} to Windows-Encoded</h1>
    <p>Please click on the link below to update your password</p>
    <a style="width: 200px; height: 50px; background-color: #5067EB;
      border-radius: 20px; Color: White;" href=${usersIdLink}>Click to Verify </a>
      <img src="https://drive.google.com/file/d/1XLTvZ9Nn1W39nGBc0CO7cMBRzrbxlhyW/view?usp=sharing"></img>
   
`;
    const transporter = nodemailer.createTransport({
      host: "mail.encoded-noreply.co.za",
      port: 465,
      secure: true,
      secureConnection: true,
      auth: {
        user: "windows@encoded-noreply.co.za",
        pass: "_#y#,)rb8,k^",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: '"Windows-Encoded" <windows@encoded-noreply.co.za>',
      to: req.body.email,
      subject: "New User Registration",
      html: mailerOutput,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message Sent:", info.messageId);
    });
  } else {
    res.json({ success: false, msg: "Could not locate user on Database" });
  }
});

router.patch("/api/updatepass/:id", async (req, res) => {
  let userId = req.params.id;

  const findUser = await addUser.findOne({
    _id: userId,
  });

  if (findUser) {
    try {
      const tokenDecrypt = jwt.verify(
        findUser.token,
        process.env.ACCESS_TOKEN_SECRET
      );

      const authUser = await addUser.findOne({
        _id: userId,
        username: tokenDecrypt.username,
        email: tokenDecrypt.email,
      });

      const salt = await bcrypt.genSalt(12);
      const hashPass = await bcrypt.hash(req.body.password, salt);

      if (authUser) {
        const updatePassword = await addUser.updateOne(
          { _id: req.params.id },
          { $set: { password: hashpass } }
        );
      } else {
        res.json({ success: false, msg: "Invalid User on Database" });
      }
    } catch (error) {
      res.json({ success: false, msg: "Invalid Token" });
    }
  } else {
    res.json({
      success: false,
      msg: "Verification Failed, please contact system admin",
    });
  }
});

router.get("/api/all-tags", async (req, res) => {
  try {
    const findTags = await tagSchema.find();
    const availableTags = findTags.filter((tag) => {
      return tag.tombstone === false;
    });
    res.json(availableTags);
  } catch (err) {
    res.json(500).json({ msg: err.message });
  }
});

router.post("/api/add-tag", async (req, res) => {
  const { tagName } = req.body;

  const tagDuplicate = await tagSchema.findOne({ tagName: tagName }).exec();

  if (tagDuplicate) {
    console.log("dup detacted");
    return res.sendStatus(409);
  }
  const newTag = new tagSchema({
    tagName: tagName,
  });
  try {
    const response = await newTag.save();
    res.status(201).json({ success: `new tag: ${tagName} created!` });
  } catch (err) {
    res.json(500).json({ msg: err.message });
  }
});

router.patch("/delete-tag", async (req, res) => {
  const { tagId } = req.body;

  const update = await tagSchema
    .findByIdAndUpdate(tagId, { tombstone: true })
    .exec();
  res.json("tag has been removed");
});

router.patch("/api/updateVotes/:id", async (req, res) => {
  let data = req.body;

  try {
    const upVote = await questionModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          upvotes: data.upvotes,
          downvotes: data.downvotes,
          score: data.score,
        },
        $push: {
          upvoted: data.userId,
        },
      }
    );
    res.json(`upvotes: ${data.upvotes} downvotes: ${data.downvotes}`);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/api/report/:id", async (req, res) => {
  console.log("maybe");
  try {
    const upVote = await questionModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          reported: true,
        },
      }
    );
    res.json("it has been set");
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/singleUser/:id", async (req, res) => {
  let userId = req.params.id;
  console.log(userId);

  try {
    const findUser = await usersSchema.findById(userId);

    res.json(findUser);
  } catch (error) {
    res.json("err: " + error);
  }
});

router.get("/api/singleQuestion/:id", async (req, res) => {
  let userId = req.params.id;
  console.log(userId);

  try {
    const findUser = await questionModel.findById(userId);

    res.json(findUser);
  } catch (error) {
    res.json("err: " + error);
  }
});

router.patch("/api/updateUserScore/:id", async (req, res) => {
  let data = req.body;
  let userId = req.params.id;

  try {
    const upVote = await usersSchema.updateOne(
      { _id: userId },
      {
        $set: {
          score: data.upvotes - data.downvotes,
          totalUpvotes: data.upvotes,
          totalDownvotes: data.downvotes,
        },
      }
    );
    console.log("Updated");
    res.json(upVote);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/api/admin/:id", async (req, res) => {
  let data = req.body;
  let userId = req.params.id;

  try {
    const upVote = await usersSchema.updateOne(
      { _id: userId },
      {
        $set: {
          admin: data.admin,
        },
      }
    );
    console.log("Updated");
    res.json(upVote);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

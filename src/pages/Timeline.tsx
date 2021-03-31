import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Container,
  CardContent,
  Collapse,
  Typography,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { firestore, storage } from "../firebase";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link, useRouteMatch } from "react-router-dom";
import { Comments, Resume } from "../models";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";

const Timeline = () => {
  const [profileCards, setProfileCards] = useState([]);

  const loadResumes = () => {
    firestore
      .collection("resumes")
      .orderBy("time", "desc")
      .get()
      .then((userCol) => {
        let usc = userCol.docs.map((userDoc) => {
          let data = userDoc.data() as Resume;
          return {
            id: userDoc.id,
            ...data,
          };
        });
        setProfileCards(usc);
      });
  };
  useEffect(() => {
    loadResumes();
  }, []);

  const [open, setopen] = useState(false);
  const handleClose = () => {
    setopen(false);
  };
  const [file, setfile] = useState<File>(undefined);

  const [authorName, _setauthorName] = useState(
    window.localStorage.getItem("authorName") || ""
  );

  const setAuthorName = (name: string) => {
    window.localStorage.setItem("authorName", name);
    _setauthorName(name);
  };
  const [url, seturl] = useState("");

  const uploadFileAndSubmit = async () => {
    let fileName = file.name;
    console.log(fileName);
    const uploadTask = storage.ref(`/images-v1/${fileName}`).put(file);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.error(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images-v1")
          .child(fileName)
          .getDownloadURL()
          .then(async (fireBaseUrl) => {
            seturl(fireBaseUrl);

            await firestore.collection("resumes").add({
              cvUrl: fireBaseUrl || "",
              objectType: file.type || "",
              owner: authorName || "",
              time: new Date().valueOf(),
            });
            loadResumes();

            handleClose();
          });
      }
    );
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{
          marginBottom: "5rem",
        }}
      >
        {profileCards.map((i, index) => (
          <CVCard i={i} key={index} />
        ))}
      </Grid>
      <Fab
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        variant="extended"
        onClick={() => {
          setopen(true);
        }}
      >
        <NavigationIcon />
        CV Yükle
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">CV Yükle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="İsminiz"
            fullWidth
            value={authorName}
            onChange={(e) => {
              setAuthorName(e.target.value);
            }}
          />
          <DialogContentText>CV nizi yükleyiniz</DialogContentText>

          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              let f = e.target.files[0];
              console.log(f);
              setfile(f);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!file}
            onClick={() => {
              uploadFileAndSubmit();
            }}
            color="primary"
          >
            Yükle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Timeline;

const CVCard = ({ i }: { i: Resume }) => {
  let match = useRouteMatch();

  const [expanded, setexpanded] = useState(false);

  const [comments, setcomments] = useState<Comments[]>(undefined);

  const [authorName, _setauthorName] = useState(
    window.localStorage.getItem("authorName") || ""
  );

  const setAuthorName = (name: string) => {
    window.localStorage.setItem("authorName", name);
    _setauthorName(name);
  };

  const [comment, setcomment] = useState("");
  const [point, setpoint] = useState(0);
  const [submitting, setsubmitting] = useState(false);
  const loadComments = () => {
    firestore
      .collection("resumes")
      .doc(i.id)
      .collection("comments")
      .orderBy("time", "desc")
      .get()
      .then((commentCol) => {
        let cms = commentCol.docs.map((commentDoc) => {
          let data = commentDoc.data();
          return {
            id: commentDoc.id,
            content: data.content,
            from: data.from,
            point: data.point,
            time: data.time,
          };
        });
        console.log("cms", cms);

        setcomments(cms);
      });
  };

  return (
    <Grid item xs={12} lg={6}>
      <Card style={{ height: "100%" }}>
        {i.objectType === "application/pdf" && (
          <object
            data={i.cvUrl}
            type="application/pdf"
            width="100%"
            height="700px"
          >
            <p>
              Alternative text - include a link{" "}
              <a href={i.cvUrl}>to the PDF!</a>
            </p>
          </object>
        )}

        {i.objectType.includes("image") && (
          <img
            style={{
              width: "100%",
              height: "auto",
            }}
            src={i.cvUrl}
            //   title="Paella dish"
          />
        )}

        <CardActions disableSpacing>
          <Typography style={{}} aria-label="share">
            {i.owner}
          </Typography>
          <IconButton
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              marginLeft: "auto",
            }}
            onClick={() => {
              if (!comments) {
                loadComments();
              }

              setexpanded(!expanded);
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Cv hakkında yorum giriniz</Typography>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="İsminiz ve Çalıştığınız Yer"
              //   type="email"
              value={authorName}
              onChange={(e) => {
                setAuthorName(e.target.value);
              }}
              fullWidth
            />
            <TextField
              id="standard-number"
              label="Puan"
              type="number"
              value={point}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (0 <= val && val <= 10) setpoint(val);
              }}
            />
            <TextField
              multiline
              rows={2}
              autoFocus
              margin="dense"
              id="name"
              label="Yorumunuz"
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              disabled={!comment.trim() || submitting}
              onClick={async () => {
                setsubmitting(true);
                await firestore
                  .collection("resumes")
                  .doc(i.id)
                  .collection("comments")
                  .add({
                    content: comment || "",

                    from: authorName || "",
                    time: new Date().valueOf(),
                    point: Math.floor(point) || 0,
                  });
                loadComments();
                setcomment("");
                setsubmitting(false);
              }}
            >
              {submitting ? "Gönderiliyor.." : "Gönder"}
            </Button>
            <Typography paragraph>Yorumlar</Typography>
            {!comments && "Loading"}
            {comments?.map((comment) => (
              <Paper key={comment?.id} elevation={3}>
                <Typography paragraph>
                  {" "}
                  {new Array(comment.point || 0).fill(0).map((e, j) => (
                    <span key={j}>⭐</span>
                  ))}
                  {new Array(10 - comment.point).fill(0).map((e, j) => (
                    <span key={j}>❌</span>
                  ))}
                  - {new Date(comment.time).toLocaleString()} -{" "}
                  <b>{comment.from}</b>
                </Typography>

                <Typography paragraph>{comment.content}</Typography>
              </Paper>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

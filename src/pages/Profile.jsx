import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Form,
  ListGroup,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { firestore, storage } from "../firebase";

const Profile = () => {
  const [file, setfile] = useState(undefined);

  const [url, _seturl] = useState("");

  const seturl = (newurl) => {
    window.localStorage.setItem("url", newurl);
    _seturl(newurl);
  };
  const uploadFile = async () => {
    let fileName = name;
    console.log(fileName);
    const uploadTask = storage.ref(`/images/${fileName}`).put(file);
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
          .ref("images")
          .child(fileName)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            seturl(fireBaseUrl);
          });
      }
    );
  };

  const [name, setname] = useState("");
  useEffect(() => {
    setname(window.localStorage.getItem("name") ?? "");
    seturl(window.localStorage.getItem("url") ?? "");
  }, []);

  const updateName = (newName) => {
    setname(newName);
    window.localStorage.setItem("name", newName);
  };

  const [comments, setcomments] = useState([]);
  useEffect(() => {
    firestore
      .collection("comments")
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
        setcomments(cms);
      });
  }, []);

  const submit = () => {
    firestore.collection("users").doc(name).set({
      cvUrl: url,
    });
  };

  const [show, setShow] = useState(false);
  const [text, setText] = useState(" ");
  const openAlertik = () => {
    setShow(true);
    setText("İK uzmanıyla Mülakat Simülasyonu");
  };
  const openAlertpro = () => {
    setShow(true);
    setText("Alanında Uzmanlarla Teknik Mülakat Simülasyonu");
  };

  return (
    <div>
      <h1> Profil</h1>

      <Form>
        <Form.Group>
          <Form.Label>İsim</Form.Label>

          <Form.Control
            type="text"
            placeholder="isminiz"
            value={name}
            onChange={(e) => {
              updateName(e.target.value);
            }}
          />
          <Card style={{ marginBottom: "20px", marginTop: "20px" }}>
            <Card.Header>Career Wallet</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Card.Text>Career Coin: 1000</Card.Text>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button variant="success">Buy Career Coin</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Form.Label>Career Coin: 1000</Form.Label>
        </Form.Group>
      </Form>

      {url && <img src={url} width="100%" />}
      <Form>
        <Form.Group>
          <Form.File
            style={{ marginBottom: "20px" }}
            id="exampleFormControlFile1"
            label="CV Yükle"
            onChange={(e) => {
              let f = e.target.files[0];
              console.log(f);
              setfile(f);
            }}
          />
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              uploadFile();
            }}
          >
            Yükle
          </Button>
        </Form.Group>
      </Form>
      <ButtonGroup aria-label="Basic example" style={{ marginBottom: "20px" }}>
        <ListGroup variant="flush" style={{ marginBottom: "20px" }}>
          <ListGroup.Item>
            <Button
              variant="warning"
              onClick={submit}
              style={{ marginRight: "20px", marginBottom: "20px" }}
            >
              Herkesle paylaş
            </Button>
            <Button
              variant="success"
              onClick={submit}
              style={{ marginRight: "20px", marginBottom: "20px" }}
            >
              Profesyonellerle paylaş
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              variant="danger"
              onClick={openAlertik}
              style={{ marginRight: "20px", marginBottom: "20px" }}
            >
              İK'dan Mülakat Simülasyonu Talep Et
            </Button>
            <Button
              variant="danger"
              onClick={openAlertpro}
              style={{ marginRight: "20px", marginBottom: "20px" }}
            >
              Profesyonellerden Teknik Mülakat Simülasyonu Talep Et
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <Alert show={show} variant="success">
              <Alert.Heading>{text}</Alert.Heading>
              <p>
                En yakın zamanda uygun bir uzman tarafından mülakat simülasyonu
                için size ulaşılacaktır
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setShow(false)}
                  variant="outline-success"
                  style={{ marginRight: "20px" }}
                >
                  Onayla
                </Button>
                <Button onClick={() => setShow(false)} variant="outline-danger">
                  Reddet
                </Button>
              </div>
            </Alert>
          </ListGroup.Item>
        </ListGroup>
      </ButtonGroup>
      <h1 style={{ marginBottom: "20px" }}>ALDIĞIM YORUMLAR</h1>
      {comments.map((i) => (
        <Card style={{ marginBottom: "50px" }}>
          <Card.Header>
            {new Array(i.point).fill(0).map((e, j) => (
              <span key={j}>⭐</span>
            ))}
            {new Array(10 - i.point).fill(0).map((e, j) => (
              <span key={j}>❌</span>
            ))}
            / {i.time}
          </Card.Header>
          <Card.Body>{i.content}</Card.Body>
          <Card.Footer>{i.from}</Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default Profile;

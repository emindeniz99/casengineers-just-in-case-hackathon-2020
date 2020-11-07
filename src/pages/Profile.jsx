import { Button, ButtonGroup, Form } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { firestore, storage } from "../firebase"

const Profile = () => {
	const [file, setfile] = useState(undefined)

	const [url, _seturl] = useState("")

	const seturl = (newurl) => {
		window.localStorage.setItem("url", newurl)
		_seturl(newurl)
	}
	const uploadFile = async () => {
		let fileName = name
		console.log(fileName)
		const uploadTask = storage.ref(`/images/${fileName}`).put(file)
		//initiates the firebase side uploading
		uploadTask.on(
			"state_changed",
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot)
			},
			(err) => {
				//catches the errors
				console.error(err)
			},
			() => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storage
					.ref("images")
					.child(fileName)
					.getDownloadURL()
					.then((fireBaseUrl) => {
						seturl(fireBaseUrl)
					})
			}
		)
	}

	const [name, setname] = useState("")
	useEffect(() => {
		setname(window.localStorage.getItem("name") ?? "")
		seturl(window.localStorage.getItem("url") ?? "")
	}, [])

	const updateName = (newName) => {
		setname(newName)
		window.localStorage.setItem("name", newName)
	}

	const [comments, setcomments] = useState([])
	useEffect(() => {
		firestore
			.collection("comments")
			.get()
			.then((commentCol) => {
				let cms = commentCol.docs.map((commentDoc) => {
					let data = commentDoc.data()
					return {
						id: commentDoc.id,
						content: data.content,
						from: data.from,
						point: data.point,
						time: data.time,
					}
				})
				setcomments(cms)
			})
	}, [])

	const submit = () => {
		firestore.collection("users").doc(name).set({
			cvUrl: url,
		})
	}

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
							updateName(e.target.value)
						}}
					/>
				</Form.Group>
			</Form>

			{url && <img src={url} width="100%" />}
			<Form>
				<Form.Group>
					<Form.File
						id="exampleFormControlFile1"
						label="CV Yükle"
						onChange={(e) => {
							let f = e.target.files[0]
							console.log(f)
							setfile(f)
						}}
					/>
					<Button
						type="submit"
						onClick={(e) => {
							e.preventDefault()
							uploadFile()
						}}
					>
						Yükle
					</Button>
				</Form.Group>
			</Form>
			<ButtonGroup aria-label="Basic example">
				<Button variant="primary" onClick={submit}>
					Herkesle paylaş
				</Button>
				<Button variant="danger" onClick={submit}>
					İK ile paylaş
				</Button>
			</ButtonGroup>

			<h1>ALDIĞIM YORUMLAR</h1>
			{comments.map((i) => (
				<p key={i.id}> {i.content} /  {i.from}</p>
			))}
		</div>
	)
}

export default Profile

import { Button, ButtonGroup, Form, Card, CardDeck,Row, ListGroup } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { firestore, storage } from "../firebase"




const Timeline = () => {

	const [profileCards, setProfileCards] = useState([])
	useEffect(() => {
		firestore
			.collection("users")
			.get()
			.then((userCol) => {
				let usc = userCol.docs.map((userDoc) => {
					let data = userDoc.data()
					return {
						id: userDoc.id,
						cvUrl: data.cvUrl,
					}
				})
				setProfileCards(usc)
			})
	}, [])


	return <div>
		<CardDeck   style={{ width: '1000px'}} >
			{profileCards.map((i) => (
				 <Row>
					<Card style={{ width: '450px', height: '1000px', marginBottom: '50px', marginRight: '50px' }}>
					<Card.Img variant="top" src={i.cvUrl} style={{ height: '750px'}} />
					<Card.Body>
						<Card.Title>{i.id}</Card.Title>
						<ListGroup variant="flush">
							<ListGroup.Item>
									 <Card.Text>
										Cv hakkında yorum giriniz
									</Card.Text>
							</ListGroup.Item>

							<ListGroup.Item>	
								<input  style={{ width: '350px'}} />
							</ListGroup.Item>

							<ListGroup.Item>
								<Button variant="primary">Yorumu Gönder</Button>
								</ListGroup.Item>
						</ListGroup>
					
					
						
					</Card.Body>
					</Card>
				</Row>
				))}
		</CardDeck>
	</div>
}

export default Timeline

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function disableButton() {
    if (name.length > 0 && password.length > 0)
      return false;
    else return true
  }

  function handleSubmit(event) {
    if (name === "1" && password === "1")
      navigate('/searchbike')
    else alertify.error("Geçersiz Kullanıcı adı veya Şifre")
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Kullanıcı Adı</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Şifre</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="button" block="true" size="lg" type="submit" disabled={disableButton()}>
          Giriş
        </Button>
      </Form>
    </div>
  );
}
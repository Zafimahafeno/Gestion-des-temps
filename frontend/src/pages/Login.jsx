import React, { useState } from "react";
import { LogIn } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Connexion réussie 🎉 Bienvenue ${form.email}`);
    console.log(form);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-4">
          <LogIn size={40} className="text-success" />
          <h2 className="fw-bold mt-2">Connexion</h2>
          <p className="text-muted">Accédez à votre espace personnel</p>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Adresse email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-success w-100">
            Se connecter
          </button>
        </form>

        <p className="text-center mt-3">
          Pas encore inscrit ? <a href="/register" className="link-success">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

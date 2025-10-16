import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    alert("Inscription réussie 🚀");
    console.log(form);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-4">
          <UserPlus size={40} className="text-primary" />
          <h2 className="fw-bold mt-2">Créer un compte</h2>
          <p className="text-muted">Rejoignez notre plateforme en quelques secondes</p>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nom complet"
            value={form.name}
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirmer le mot de passe"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary w-100">
            S'inscrire
          </button>
        </form>

        <p className="text-center mt-3">
          Déjà un compte ? <a href="/login" className="link-primary">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
